const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'imwg_calculator';

let db;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
    
    // Create indexes
    await createIndexes();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Create database indexes
async function createIndexes() {
  try {
    await db.collection('assessments').createIndex({ id: 1 }, { unique: true });
    await db.collection('assessments').createIndex({ patient_id: 1 });
    await db.collection('assessments').createIndex({ physician_name: 1 });
    await db.collection('assessments').createIndex({ created_at: 1 });
    await db.collection('assessments').createIndex({ risk_result: 1 });
    
    await db.collection('calculations').createIndex({ assessment_id: 1 });
    await db.collection('calculations').createIndex({ calculated_at: 1 });
    
    await db.collection('assessment_history').createIndex({ assessment_id: 1 });
    await db.collection('assessment_history').createIndex({ timestamp: 1 });
    
    console.log('Database indexes created');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

// Validation schemas
const assessmentSchema = Joi.object({
  patient_id: Joi.string().optional(),
  patient_name: Joi.string().optional(),
  del17p_tp53: Joi.string().valid('positive', 'negative').required(),
  translocation_combo: Joi.string().valid('positive', 'negative').required(),
  del1p32_1q: Joi.string().valid('positive', 'negative').required(),
  b2m_value: Joi.number().min(0).max(50).optional(),
  creatinine_value: Joi.number().min(0).max(20).optional(),
  clinical_notes: Joi.string().optional(),
  physician_name: Joi.string().optional(),
  institution: Joi.string().optional()
});

const updateSchema = Joi.object({
  patient_name: Joi.string().optional(),
  del17p_tp53: Joi.string().valid('positive', 'negative').optional(),
  translocation_combo: Joi.string().valid('positive', 'negative').optional(),
  del1p32_1q: Joi.string().valid('positive', 'negative').optional(),
  b2m_value: Joi.number().min(0).max(50).optional(),
  creatinine_value: Joi.number().min(0).max(20).optional(),
  clinical_notes: Joi.string().optional(),
  physician_name: Joi.string().optional(),
  institution: Joi.string().optional()
});

// IMWG Risk Calculator
class IMWGRiskCalculator {
  static calculateRisk(assessment) {
    const riskFactors = [];
    
    // Criterion 1: del(17p) and/or TP53 mutation
    if (assessment.del17p_tp53 === 'positive') {
      riskFactors.push({
        criterion: "del(17p) and/or TP53 mutation",
        description: "Assessed using NGS-based method with CCF ≥20% on CD138-positive cells",
        is_positive: true
      });
    }
    
    // Criterion 2: High-risk translocation with +1q and/or del(1p)
    if (assessment.translocation_combo === 'positive') {
      riskFactors.push({
        criterion: "High-risk translocation",
        description: "One of these translocations—t(4;14) or t(14;16) or t(14;20)—co-occurring with +1q and/or del(1p)",
        is_positive: true
      });
    }
    
    // Criterion 3: del(1p32) patterns
    if (assessment.del1p32_1q === 'positive') {
      riskFactors.push({
        criterion: "del(1p32) patterns",
        description: "Monoallelic del(1p32) with +1q OR biallelic del(1p32)",
        is_positive: true
      });
    }
    
    // Criterion 4: High β2M with normal creatinine
    if (assessment.b2m_value !== undefined && assessment.creatinine_value !== undefined) {
      if (assessment.b2m_value >= 5.5 && assessment.creatinine_value < 1.2) {
        riskFactors.push({
          criterion: "High β2-microglobulin with normal creatinine",
          description: `β2M: ${assessment.b2m_value} mg/L (≥5.5) with creatinine: ${assessment.creatinine_value} mg/dL (<1.2)`,
          is_positive: true
        });
      }
    }
    
    // Determine risk result
    const isHighRisk = riskFactors.length > 0;
    const riskResult = isHighRisk ? 'HIGH_RISK' : 'STANDARD_RISK';
    
    // Generate clinical interpretation
    const clinicalInterpretation = this.generateClinicalInterpretation(riskResult, riskFactors, assessment);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(riskResult, riskFactors);
    
    return {
      assessment_id: assessment.id,
      risk_result: riskResult,
      risk_factors: riskFactors,
      total_risk_factors: riskFactors.length,
      clinical_interpretation: clinicalInterpretation,
      recommendations: recommendations,
      calculated_at: new Date()
    };
  }
  
  static generateClinicalInterpretation(riskResult, riskFactors, assessment) {
    if (riskResult === 'HIGH_RISK') {
      let interpretation = `Patient meets criteria for High-Risk Multiple Myeloma based on ${riskFactors.length} positive risk factor(s):\n\n`;
      
      riskFactors.forEach((factor, index) => {
        interpretation += `${index + 1}. ${factor.criterion}: ${factor.description}\n`;
      });
      
      interpretation += "\nThis classification indicates a poorer prognosis and requires more intensive treatment strategies and closer monitoring.";
      
      // Add specific interpretations based on risk factors
      if (riskFactors.some(factor => factor.criterion.includes("del(17p)"))) {
        interpretation += "\n\nNote: del(17p) and/or TP53 mutations are associated with resistance to standard therapies and significantly shorter overall survival.";
      }
      
      if (riskFactors.some(factor => factor.criterion.includes("translocation"))) {
        interpretation += "\n\nNote: High-risk translocations, especially when co-occurring with +1q and/or del(1p), significantly impact both progression-free and overall survival.";
      }
      
      if (riskFactors.some(factor => factor.criterion.includes("β2-microglobulin"))) {
        interpretation += "\n\nNote: Elevated β2-microglobulin with normal renal function indicates high tumor burden and poor prognosis.";
      }
    } else {
      interpretation = "Patient does not meet criteria for High-Risk Multiple Myeloma based on current assessment. ";
      interpretation += "Standard risk classification allows for conventional treatment approaches with standard monitoring intervals.";
      
      // Add notes about borderline values
      if (assessment.b2m_value !== undefined && assessment.b2m_value >= 4.0) {
        interpretation += `\n\nNote: β2-microglobulin level of ${assessment.b2m_value} mg/L is elevated but does not meet high-risk criteria.`;
      }
    }
    
    return interpretation;
  }
  
  static generateRecommendations(riskResult, riskFactors) {
    const recommendations = [];
    
    if (riskResult === 'HIGH_RISK') {
      recommendations.push(
        "Consider intensive induction therapy with novel agents",
        "Evaluate for autologous stem cell transplantation eligibility",
        "Implement more frequent monitoring schedule",
        "Consider maintenance therapy post-transplant",
        "Discuss prognosis and treatment options with patient and family",
        "Consider enrollment in clinical trials for high-risk patients"
      );
      
      // Specific recommendations based on risk factors
      if (riskFactors.some(factor => factor.criterion.includes("del(17p)"))) {
        recommendations.push(
          "Avoid alkylating agents due to del(17p)/TP53 mutations",
          "Consider immunomodulatory drugs and proteasome inhibitors"
        );
      }
      
      if (riskFactors.some(factor => factor.criterion.includes("translocation"))) {
        recommendations.push(
          "Consider bortezomib-based regimens for t(4;14) patients",
          "Enhanced monitoring for early progression"
        );
      }
    } else {
      recommendations.push(
        "Standard treatment protocols are appropriate",
        "Regular monitoring with standard intervals",
        "Consider patient comorbidities in treatment planning",
        "Reassess risk factors during treatment course",
        "Monitor for development of high-risk features over time"
      );
    }
    
    return recommendations;
  }
  
  static validateAssessmentData(assessment) {
    const errors = [];
    
    // Check required fields
    if (!assessment.del17p_tp53) {
      errors.push("del(17p) and/or TP53 mutation status is required");
    } else if (!['positive', 'negative'].includes(assessment.del17p_tp53)) {
      errors.push("del(17p) and/or TP53 mutation status must be 'positive' or 'negative'");
    }
    
    if (!assessment.translocation_combo) {
      errors.push("High-risk translocation status is required");
    } else if (!['positive', 'negative'].includes(assessment.translocation_combo)) {
      errors.push("High-risk translocation status must be 'positive' or 'negative'");
    }
    
    if (!assessment.del1p32_1q) {
      errors.push("del(1p32) patterns status is required");
    } else if (!['positive', 'negative'].includes(assessment.del1p32_1q)) {
      errors.push("del(1p32) patterns status must be 'positive' or 'negative'");
    }
    
    // Validate β2M and creatinine if provided
    if (assessment.b2m_value !== undefined) {
      if (assessment.b2m_value < 0 || assessment.b2m_value > 50) {
        errors.push("β2-microglobulin value must be between 0 and 50 mg/L");
      }
      
      if (assessment.creatinine_value === undefined) {
        errors.push("Creatinine value is required when β2-microglobulin is provided");
      }
    }
    
    if (assessment.creatinine_value !== undefined) {
      if (assessment.creatinine_value < 0 || assessment.creatinine_value > 20) {
        errors.push("Creatinine value must be between 0 and 20 mg/dL");
      }
      
      if (assessment.b2m_value === undefined) {
        errors.push("β2-microglobulin value is required when creatinine is provided");
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }
}

// Helper function to log assessment actions
async function logAssessmentAction(assessmentId, action, details, performedBy = null) {
  try {
    const historyRecord = {
      id: uuidv4(),
      assessment_id: assessmentId,
      action: action,
      changes: details,
      performed_by: performedBy,
      timestamp: new Date(),
      notes: null
    };
    
    await db.collection('assessment_history').insertOne(historyRecord);
  } catch (error) {
    console.error('Error logging assessment action:', error);
  }
}

// Routes

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await db.admin().ping();
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date()
    });
  }
});

// Root endpoint
app.get('/api/', (req, res) => {
  res.json({
    message: 'IMWG Risk Calculator API',
    version: '1.0.0'
  });
});

// Create assessment
app.post('/api/assessments/', async (req, res) => {
  try {
    // Validate input
    const { error, value } = assessmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    // Create assessment object
    const assessment = {
      id: uuidv4(),
      ...value,
      status: 'DRAFT',
      created_at: new Date(),
      updated_at: new Date(),
      version: 1
    };
    
    // Validate assessment data
    const validation = IMWGRiskCalculator.validateAssessmentData(assessment);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Assessment validation failed',
        details: validation.errors
      });
    }
    
    // Save to database
    await db.collection('assessments').insertOne(assessment);
    
    // Log creation in history
    await logAssessmentAction(
      assessment.id,
      'created',
      { created_by: assessment.physician_name || 'Unknown' }
    );
    
    res.json(assessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get assessment
app.get('/api/assessments/:id', async (req, res) => {
  try {
    const assessment = await db.collection('assessments').findOne({ id: req.params.id });
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (error) {
    console.error('Error getting assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update assessment
app.put('/api/assessments/:id', async (req, res) => {
  try {
    // Validate input
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    // Check if assessment exists
    const existing = await db.collection('assessments').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    // Update assessment
    const updateData = {
      ...value,
      updated_at: new Date()
    };
    
    await db.collection('assessments').updateOne(
      { id: req.params.id },
      { $set: updateData }
    );
    
    // Get updated assessment
    const updatedAssessment = await db.collection('assessments').findOne({ id: req.params.id });
    
    // Log update in history
    await logAssessmentAction(
      req.params.id,
      'updated',
      { changes: updateData, updated_by: value.physician_name || 'Unknown' }
    );
    
    res.json(updatedAssessment);
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Calculate risk
app.post('/api/assessments/:id/calculate', async (req, res) => {
  try {
    // Get assessment
    const assessment = await db.collection('assessments').findOne({ id: req.params.id });
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    // Calculate risk
    const result = IMWGRiskCalculator.calculateRisk(assessment);
    
    // Update assessment with calculated results
    const updateData = {
      risk_result: result.risk_result,
      risk_factors: result.risk_factors,
      total_risk_factors: result.total_risk_factors,
      status: 'COMPLETED',
      updated_at: new Date()
    };
    
    await db.collection('assessments').updateOne(
      { id: req.params.id },
      { $set: updateData }
    );
    
    // Save calculation result
    await db.collection('calculations').insertOne(result);
    
    // Log calculation in history
    await logAssessmentAction(
      req.params.id,
      'calculated',
      { risk_result: result.risk_result, total_risk_factors: result.total_risk_factors }
    );
    
    res.json(result);
  } catch (error) {
    console.error('Error calculating risk:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// List assessments
app.get('/api/assessments/', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 100, 1000);
    
    // Build filter query
    const filterQuery = {};
    
    if (req.query.patient_id) {
      filterQuery.patient_id = req.query.patient_id;
    }
    
    if (req.query.physician_name) {
      filterQuery.physician_name = { $regex: req.query.physician_name, $options: 'i' };
    }
    
    if (req.query.risk_result) {
      filterQuery.risk_result = req.query.risk_result;
    }
    
    if (req.query.status) {
      filterQuery.status = req.query.status;
    }
    
    // Query database
    const assessments = await db.collection('assessments')
      .find(filterQuery)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    res.json(assessments);
  } catch (error) {
    console.error('Error listing assessments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete assessment
app.delete('/api/assessments/:id', async (req, res) => {
  try {
    // Check if assessment exists
    const existing = await db.collection('assessments').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    // Delete assessment
    await db.collection('assessments').deleteOne({ id: req.params.id });
    
    // Delete related calculations
    await db.collection('calculations').deleteMany({ assessment_id: req.params.id });
    
    // Log deletion in history
    await logAssessmentAction(
      req.params.id,
      'deleted',
      { patient_name: existing.patient_name || 'Unknown' }
    );
    
    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get assessment history
app.get('/api/assessments/:id/history', async (req, res) => {
  try {
    // Check if assessment exists
    const existing = await db.collection('assessments').findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    // Get history
    const history = await db.collection('assessment_history')
      .find({ assessment_id: req.params.id })
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(history);
  } catch (error) {
    console.error('Error getting assessment history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
async function startServer() {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`IMWG Risk Calculator API server running on port ${PORT}`);
  });
}

startServer().catch(console.error);