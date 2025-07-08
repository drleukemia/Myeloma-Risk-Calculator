from typing import List, Tuple
from backend.models.patient_assessment import PatientAssessment, RiskResult, RiskFactor, RiskCalculationResult
from datetime import datetime

class IMWGRiskCalculator:
    """
    IMWG Risk Calculator Service
    Implements the 4-criteria High-Risk Multiple Myeloma classification
    """
    
    @staticmethod
    def calculate_risk(assessment: PatientAssessment) -> RiskCalculationResult:
        """
        Calculate risk based on IMWG criteria
        Returns risk result and detailed analysis
        """
        risk_factors = []
        
        # Criterion 1: del(17p) and/or TP53 mutation
        if assessment.del17p_tp53 == 'positive':
            risk_factors.append(RiskFactor(
                criterion="del(17p) and/or TP53 mutation",
                description="Assessed using NGS-based method with CCF ≥20% on CD138-positive cells",
                is_positive=True
            ))
        
        # Criterion 2: High-risk translocation with +1q and/or del(1p)
        if assessment.translocation_combo == 'positive':
            risk_factors.append(RiskFactor(
                criterion="High-risk translocation",
                description="One of these translocations—t(4;14) or t(14;16) or t(14;20)—co-occurring with +1q and/or del(1p)",
                is_positive=True
            ))
        
        # Criterion 3: del(1p32) patterns
        if assessment.del1p32_1q == 'positive':
            risk_factors.append(RiskFactor(
                criterion="del(1p32) patterns",
                description="Monoallelic del(1p32) with +1q OR biallelic del(1p32)",
                is_positive=True
            ))
        
        # Criterion 4: High β2M with normal creatinine
        b2m_criterion_met = False
        if assessment.b2m_value is not None and assessment.creatinine_value is not None:
            if assessment.b2m_value >= 5.5 and assessment.creatinine_value < 1.2:
                b2m_criterion_met = True
                risk_factors.append(RiskFactor(
                    criterion="High β2-microglobulin with normal creatinine",
                    description=f"β2M: {assessment.b2m_value} mg/L (≥5.5) with creatinine: {assessment.creatinine_value} mg/dL (<1.2)",
                    is_positive=True
                ))
        
        # Determine risk result
        is_high_risk = len(risk_factors) > 0
        risk_result = RiskResult.HIGH_RISK if is_high_risk else RiskResult.STANDARD_RISK
        
        # Generate clinical interpretation
        clinical_interpretation = IMWGRiskCalculator._generate_clinical_interpretation(
            risk_result, risk_factors, assessment
        )
        
        # Generate recommendations
        recommendations = IMWGRiskCalculator._generate_recommendations(
            risk_result, risk_factors
        )
        
        return RiskCalculationResult(
            assessment_id=assessment.id,
            risk_result=risk_result,
            risk_factors=risk_factors,
            total_risk_factors=len(risk_factors),
            clinical_interpretation=clinical_interpretation,
            recommendations=recommendations
        )
    
    @staticmethod
    def _generate_clinical_interpretation(
        risk_result: RiskResult, 
        risk_factors: List[RiskFactor], 
        assessment: PatientAssessment
    ) -> str:
        """Generate clinical interpretation based on results"""
        
        if risk_result == RiskResult.HIGH_RISK:
            interpretation = f"Patient meets criteria for High-Risk Multiple Myeloma based on {len(risk_factors)} positive risk factor(s):\n\n"
            
            for i, factor in enumerate(risk_factors, 1):
                interpretation += f"{i}. {factor.criterion}: {factor.description}\n"
            
            interpretation += "\nThis classification indicates a poorer prognosis and requires more intensive treatment strategies and closer monitoring."
            
            # Add specific interpretations based on risk factors
            if any("del(17p)" in factor.criterion for factor in risk_factors):
                interpretation += "\n\nNote: del(17p) and/or TP53 mutations are associated with resistance to standard therapies and significantly shorter overall survival."
            
            if any("translocation" in factor.criterion for factor in risk_factors):
                interpretation += "\n\nNote: High-risk translocations, especially when co-occurring with +1q and/or del(1p), significantly impact both progression-free and overall survival."
            
            if any("β2-microglobulin" in factor.criterion for factor in risk_factors):
                interpretation += "\n\nNote: Elevated β2-microglobulin with normal renal function indicates high tumor burden and poor prognosis."
                
        else:
            interpretation = "Patient does not meet criteria for High-Risk Multiple Myeloma based on current assessment. "
            interpretation += "Standard risk classification allows for conventional treatment approaches with standard monitoring intervals."
            
            # Add notes about borderline values
            if assessment.b2m_value is not None and assessment.b2m_value >= 4.0:
                interpretation += f"\n\nNote: β2-microglobulin level of {assessment.b2m_value} mg/L is elevated but does not meet high-risk criteria."
            
        return interpretation
    
    @staticmethod
    def _generate_recommendations(risk_result: RiskResult, risk_factors: List[RiskFactor]) -> List[str]:
        """Generate clinical recommendations based on risk result"""
        
        recommendations = []
        
        if risk_result == RiskResult.HIGH_RISK:
            recommendations.extend([
                "Consider intensive induction therapy with novel agents",
                "Evaluate for autologous stem cell transplantation eligibility",
                "Implement more frequent monitoring schedule",
                "Consider maintenance therapy post-transplant",
                "Discuss prognosis and treatment options with patient and family",
                "Consider enrollment in clinical trials for high-risk patients"
            ])
            
            # Specific recommendations based on risk factors
            if any("del(17p)" in factor.criterion for factor in risk_factors):
                recommendations.append("Avoid alkylating agents due to del(17p)/TP53 mutations")
                recommendations.append("Consider immunomodulatory drugs and proteasome inhibitors")
            
            if any("translocation" in factor.criterion for factor in risk_factors):
                recommendations.append("Consider bortezomib-based regimens for t(4;14) patients")
                recommendations.append("Enhanced monitoring for early progression")
            
        else:
            recommendations.extend([
                "Standard treatment protocols are appropriate",
                "Regular monitoring with standard intervals",
                "Consider patient comorbidities in treatment planning",
                "Reassess risk factors during treatment course",
                "Monitor for development of high-risk features over time"
            ])
        
        return recommendations
    
    @staticmethod
    def validate_assessment_data(assessment: PatientAssessment) -> Tuple[bool, List[str]]:
        """Validate assessment data for completeness and accuracy"""
        
        errors = []
        
        # Check required fields
        if not assessment.del17p_tp53:
            errors.append("del(17p) and/or TP53 mutation status is required")
        elif assessment.del17p_tp53 not in ['positive', 'negative']:
            errors.append("del(17p) and/or TP53 mutation status must be 'positive' or 'negative'")
        
        if not assessment.translocation_combo:
            errors.append("High-risk translocation status is required")
        elif assessment.translocation_combo not in ['positive', 'negative']:
            errors.append("High-risk translocation status must be 'positive' or 'negative'")
        
        if not assessment.del1p32_1q:
            errors.append("del(1p32) patterns status is required")
        elif assessment.del1p32_1q not in ['positive', 'negative']:
            errors.append("del(1p32) patterns status must be 'positive' or 'negative'")
        
        # Validate β2M and creatinine if provided
        if assessment.b2m_value is not None:
            if assessment.b2m_value < 0 or assessment.b2m_value > 50:
                errors.append("β2-microglobulin value must be between 0 and 50 mg/L")
            
            if assessment.creatinine_value is None:
                errors.append("Creatinine value is required when β2-microglobulin is provided")
        
        if assessment.creatinine_value is not None:
            if assessment.creatinine_value < 0 or assessment.creatinine_value > 20:
                errors.append("Creatinine value must be between 0 and 20 mg/dL")
            
            if assessment.b2m_value is None:
                errors.append("β2-microglobulin value is required when creatinine is provided")
        
        return len(errors) == 0, errors