from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class RiskResult(str, Enum):
    HIGH_RISK = "HIGH_RISK"
    STANDARD_RISK = "STANDARD_RISK"

class AssessmentStatus(str, Enum):
    COMPLETED = "COMPLETED"
    DRAFT = "DRAFT"

class PatientAssessmentCreate(BaseModel):
    patient_id: Optional[str] = None
    patient_name: Optional[str] = None
    del17p_tp53: str = Field(..., description="del(17p) and/or TP53 mutation status")
    translocation_combo: str = Field(..., description="High-risk translocation status")
    del1p32_1q: str = Field(..., description="del(1p32) patterns status")
    b2m_value: Optional[float] = Field(None, description="β2-microglobulin value in mg/L")
    creatinine_value: Optional[float] = Field(None, description="Creatinine value in mg/dL")
    clinical_notes: Optional[str] = None
    physician_name: Optional[str] = None
    institution: Optional[str] = None

class PatientAssessmentUpdate(BaseModel):
    patient_name: Optional[str] = None
    del17p_tp53: Optional[str] = None
    translocation_combo: Optional[str] = None
    del1p32_1q: Optional[str] = None
    b2m_value: Optional[float] = None
    creatinine_value: Optional[float] = None
    clinical_notes: Optional[str] = None
    physician_name: Optional[str] = None
    institution: Optional[str] = None

class RiskFactor(BaseModel):
    criterion: str
    description: str
    is_positive: bool

class PatientAssessment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_id: Optional[str] = None
    patient_name: Optional[str] = None
    del17p_tp53: str
    translocation_combo: str
    del1p32_1q: str
    b2m_value: Optional[float] = None
    creatinine_value: Optional[float] = None
    clinical_notes: Optional[str] = None
    physician_name: Optional[str] = None
    institution: Optional[str] = None
    
    # Calculated fields
    risk_result: Optional[RiskResult] = None
    risk_factors: List[RiskFactor] = Field(default_factory=list)
    total_risk_factors: int = 0
    
    # Metadata
    status: AssessmentStatus = AssessmentStatus.DRAFT
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    version: int = 1

class PatientAssessmentResponse(PatientAssessment):
    pass

class RiskCalculationResult(BaseModel):
    assessment_id: str
    risk_result: RiskResult
    risk_factors: List[RiskFactor]
    total_risk_factors: int
    clinical_interpretation: str
    recommendations: List[str]
    calculated_at: datetime = Field(default_factory=datetime.utcnow)

class AssessmentHistory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    assessment_id: str
    patient_id: Optional[str] = None
    action: str  # "created", "updated", "calculated", "deleted"
    changes: dict = Field(default_factory=dict)
    performed_by: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None