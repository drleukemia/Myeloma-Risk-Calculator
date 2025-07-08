from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from datetime import datetime
import os

from models.patient_assessment import (
    PatientAssessment,
    PatientAssessmentCreate,
    PatientAssessmentUpdate,
    PatientAssessmentResponse,
    RiskCalculationResult,
    AssessmentHistory,
    AssessmentStatus
)
from services.risk_calculator import IMWGRiskCalculator
from database import get_database

router = APIRouter(prefix="/assessments", tags=["assessments"])

@router.post("/", response_model=PatientAssessmentResponse)
async def create_assessment(
    assessment_data: PatientAssessmentCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new patient assessment"""
    
    # Create assessment object
    assessment = PatientAssessment(**assessment_data.dict())
    
    # Validate assessment data
    is_valid, errors = IMWGRiskCalculator.validate_assessment_data(assessment)
    if not is_valid:
        raise HTTPException(status_code=400, detail={"errors": errors})
    
    # Save to database
    assessment_dict = assessment.dict()
    assessment_dict["created_at"] = datetime.utcnow()
    assessment_dict["updated_at"] = datetime.utcnow()
    
    result = await db.assessments.insert_one(assessment_dict)
    assessment_dict["_id"] = str(result.inserted_id)
    
    # Log creation in history
    await _log_assessment_action(
        db, assessment.id, "created", 
        {"created_by": assessment_data.physician_name or "Unknown"}
    )
    
    return PatientAssessmentResponse(**assessment_dict)

@router.get("/{assessment_id}", response_model=PatientAssessmentResponse)
async def get_assessment(
    assessment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get a specific assessment by ID"""
    
    assessment = await db.assessments.find_one({"id": assessment_id})
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return PatientAssessmentResponse(**assessment)

@router.put("/{assessment_id}", response_model=PatientAssessmentResponse)
async def update_assessment(
    assessment_id: str,
    update_data: PatientAssessmentUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update an existing assessment"""
    
    # Get existing assessment
    existing = await db.assessments.find_one({"id": assessment_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Update only provided fields
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    # Update in database
    await db.assessments.update_one(
        {"id": assessment_id},
        {"$set": update_dict}
    )
    
    # Get updated assessment
    updated_assessment = await db.assessments.find_one({"id": assessment_id})
    
    # Log update in history
    await _log_assessment_action(
        db, assessment_id, "updated", 
        {"changes": update_dict, "updated_by": update_data.physician_name or "Unknown"}
    )
    
    return PatientAssessmentResponse(**updated_assessment)

@router.post("/{assessment_id}/calculate", response_model=RiskCalculationResult)
async def calculate_risk(
    assessment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Calculate risk for a specific assessment"""
    
    # Get assessment
    assessment_data = await db.assessments.find_one({"id": assessment_id})
    if not assessment_data:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    assessment = PatientAssessment(**assessment_data)
    
    # Calculate risk
    try:
        result = IMWGRiskCalculator.calculate_risk(assessment)
        
        # Update assessment with calculated results
        update_dict = {
            "risk_result": result.risk_result.value,
            "risk_factors": [factor.dict() for factor in result.risk_factors],
            "total_risk_factors": result.total_risk_factors,
            "status": AssessmentStatus.COMPLETED.value,
            "updated_at": datetime.utcnow()
        }
        
        await db.assessments.update_one(
            {"id": assessment_id},
            {"$set": update_dict}
        )
        
        # Save calculation result
        result_dict = result.dict()
        await db.calculations.insert_one(result_dict)
        
        # Log calculation in history
        await _log_assessment_action(
            db, assessment_id, "calculated", 
            {"risk_result": result.risk_result.value, "total_risk_factors": result.total_risk_factors}
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating risk: {str(e)}")

@router.get("/", response_model=List[PatientAssessmentResponse])
async def list_assessments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    patient_id: Optional[str] = Query(None),
    physician_name: Optional[str] = Query(None),
    risk_result: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """List assessments with optional filtering"""
    
    # Build filter query
    filter_query = {}
    
    if patient_id:
        filter_query["patient_id"] = patient_id
    
    if physician_name:
        filter_query["physician_name"] = {"$regex": physician_name, "$options": "i"}
    
    if risk_result:
        filter_query["risk_result"] = risk_result
    
    if status:
        filter_query["status"] = status
    
    # Query database
    cursor = db.assessments.find(filter_query).skip(skip).limit(limit).sort("created_at", -1)
    assessments = await cursor.to_list(length=limit)
    
    return [PatientAssessmentResponse(**assessment) for assessment in assessments]

@router.delete("/{assessment_id}")
async def delete_assessment(
    assessment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete an assessment"""
    
    # Check if assessment exists
    existing = await db.assessments.find_one({"id": assessment_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Delete assessment
    await db.assessments.delete_one({"id": assessment_id})
    
    # Delete related calculations
    await db.calculations.delete_many({"assessment_id": assessment_id})
    
    # Log deletion in history
    await _log_assessment_action(
        db, assessment_id, "deleted", 
        {"patient_name": existing.get("patient_name", "Unknown")}
    )
    
    return {"message": "Assessment deleted successfully"}

@router.get("/{assessment_id}/history", response_model=List[AssessmentHistory])
async def get_assessment_history(
    assessment_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get history of an assessment"""
    
    # Check if assessment exists
    existing = await db.assessments.find_one({"id": assessment_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    # Get history
    cursor = db.assessment_history.find({"assessment_id": assessment_id}).sort("timestamp", -1)
    history = await cursor.to_list(length=None)
    
    return [AssessmentHistory(**record) for record in history]

async def _log_assessment_action(
    db: AsyncIOMotorDatabase,
    assessment_id: str,
    action: str,
    details: dict,
    performed_by: Optional[str] = None
):
    """Log an assessment action to history"""
    
    history_record = AssessmentHistory(
        assessment_id=assessment_id,
        action=action,
        changes=details,
        performed_by=performed_by,
        timestamp=datetime.utcnow()
    )
    
    await db.assessment_history.insert_one(history_record.dict())