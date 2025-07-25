import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const Calculator = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    del17p_tp53: '',
    translocation_combo: '',
    del1p32_1q: '',
    b2m_value: '',
    creatinine_value: ''
  });

  const [result, setResult] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRisk = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First create an assessment
      const assessmentData = {
        patient_name: formData.patient_name || 'Anonymous Patient',
        del17p_tp53: formData.del17p_tp53,
        translocation_combo: formData.translocation_combo,
        del1p32_1q: formData.del1p32_1q,
        b2m_value: formData.b2m_value ? parseFloat(formData.b2m_value) : null,
        creatinine_value: formData.creatinine_value ? parseFloat(formData.creatinine_value) : null,
        physician_name: 'IMWG Calculator User',
        institution: 'Web Application'
      };
      
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Create assessment
      const createResponse = await axios.post(`${backendUrl}/api/assessments/`, assessmentData);
      const assessmentId = createResponse.data.id;
      
      // Calculate risk
      const riskResponse = await axios.post(`${backendUrl}/api/assessments/${assessmentId}/calculate`);
      const riskResult = riskResponse.data;
      
      setResult({
        risk: riskResult.risk_result === 'HIGH_RISK' ? 'HIGH RISK' : 'STANDARD RISK',
        riskFactors: riskResult.risk_factors.map(factor => factor.criterion),
        isHighRisk: riskResult.risk_result === 'HIGH_RISK',
        clinicalInterpretation: riskResult.clinical_interpretation,
        recommendations: riskResult.recommendations
      });
      
    } catch (err) {
      console.error('Error calculating risk:', err);
      setError('Failed to calculate risk. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetCalculator = () => {
    setFormData({
      patient_name: '',
      del17p_tp53: '',
      translocation_combo: '',
      del1p32_1q: '',
      b2m_value: '',
      creatinine_value: ''
    });
    setResult(null);
    setError(null);
  };

  const isFormValid = () => {
    return formData.del17p_tp53 && formData.translocation_combo && formData.del1p32_1q;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          IMWG Risk Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Multiple Myeloma High-Risk Assessment Tool
        </p>
        <p className="text-sm text-gray-500">
          Based on International Myeloma Working Group Consensus Recommendations
        </p>
      </div>

      {/* Educational Toggle */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => setShowEducation(!showEducation)}
          className="mb-6"
        >
          <Info className="w-4 h-4 mr-2" />
          {showEducation ? 'Hide' : 'Show'} Educational Content
        </Button>
      </div>

      {/* Educational Content */}
      {showEducation && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Clinical Background
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">HRMM Definition</h3>
              <p className="text-sm text-blue-800">
                High-Risk Multiple Myeloma (HRMM) is defined by the presence of at least one of four key criteria 
                based on cytogenetic abnormalities and biomarker levels. This stratification is based on the 
                International Myeloma Society consensus recommendations and helps guide treatment decisions and prognosis assessment.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Detailed Risk Criteria:</h4>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h5 className="font-medium text-red-900 mb-2">1. del(17p) and/or TP53 mutation</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Occurs in 5%-10% of patients with NDMM</li>
                      <li>• CCF ≥20% threshold on CD138-positive cells</li>
                      <li>• Independent prognostic factor for shorter PFS and OS</li>
                      <li>• Can be acquired at later stages</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h5 className="font-medium text-orange-900 mb-2">2. High-risk translocations</h5>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• <strong>t(4;14):</strong> 10%-15% of patients, high-risk feature</li>
                      <li>• <strong>t(14;16):</strong> 2%-5% of patients, worse outcomes</li>
                      <li>• <strong>t(14;20):</strong> 2% of patients, co-occurs with other CAs</li>
                      <li>• Must co-occur with +1q and/or del(1p)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Additional Criteria:</h4>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-2">3. del(1p32) patterns</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Monoallelic del(1p32) with +1q co-occurrence</li>
                      <li>• Biallelic del(1p32) as independent factor</li>
                      <li>• Occurs in 11% of patients with NDMM</li>
                      <li>• Significant prognostic impact on PFS and OS</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2">4. High β2M with normal creatinine</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• β2M ≥5.5 mg/L with creatinine &lt;1.2 mg/dL</li>
                      <li>• Poor prognosis even without other risk features</li>
                      <li>• Mixed data on independent prognostic impact</li>
                      <li>• Must exclude renal dysfunction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Clinical Studies Evidence:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-amber-900 mb-2">Key Datasets:</h5>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• HORIZON (CoMMpass), ENDURANCE</li>
                    <li>• FORTE, DETERMINATION studies</li>
                    <li>• Spanish Myeloma Studies (GEM Dataset)</li>
                    <li>• Mayo Clinic Cohort analysis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-amber-900 mb-2">del(17p) Impact by CCF:</h5>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• ≥10%: HR 1.5 (PFS), 2.1 (OS)</li>
                    <li>• ≥20%: HR 1.9 (PFS), 2.5 (OS)</li>
                    <li>• ≥40%: HR 2.0 (PFS), 2.6 (OS)</li>
                    <li>• Higher CCF = worse prognosis</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Risk Assessment Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-2">
            <Label htmlFor="patient_name">Patient Name (Optional)</Label>
            <Input
              id="patient_name"
              placeholder="Enter patient name"
              value={formData.patient_name}
              onChange={(e) => handleInputChange('patient_name', e.target.value)}
            />
          </div>

          <Separator />

          {/* Criterion 1 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              1. del(17p) and/or TP53 mutation
            </Label>
            <p className="text-sm text-gray-600">
              Assessed using NGS-based method with CCF ≥20% on CD138-positive cells
            </p>
            <RadioGroup 
              value={formData.del17p_tp53} 
              onValueChange={(value) => handleInputChange('del17p_tp53', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="del17p-pos" />
                <Label htmlFor="del17p-pos">Positive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id="del17p-neg" />
                <Label htmlFor="del17p-neg">Negative</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Criterion 2 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              2. High risk translocation
            </Label>
            <p className="text-sm text-gray-600">
              One of these translocations—t(4;14) or t(14;16) or t(14;20)—co-occurring with +1q and/or del(1p)
            </p>
            <RadioGroup 
              value={formData.translocation_combo} 
              onValueChange={(value) => handleInputChange('translocation_combo', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="trans-pos" />
                <Label htmlFor="trans-pos">Positive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id="trans-neg" />
                <Label htmlFor="trans-neg">Negative</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Criterion 3 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              3. del(1p32) patterns
            </Label>
            <p className="text-sm text-gray-600">
              Monoallelic del(1p32) with 1q+ OR biallelic del(1p32)
            </p>
            <RadioGroup 
              value={formData.del1p32_1q} 
              onValueChange={(value) => handleInputChange('del1p32_1q', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="del1p32-pos" />
                <Label htmlFor="del1p32-pos">Positive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id="del1p32-neg" />
                <Label htmlFor="del1p32-neg">Negative</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Criterion 4 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              4. β2-microglobulin and Creatinine levels
            </Label>
            <p className="text-sm text-gray-600">
              High β2M (≥5.5 mg/L) with normal creatinine (&lt;1.2 mg/dL)
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="b2m">β2-microglobulin (mg/L)</Label>
                <Input
                  id="b2m"
                  type="number"
                  step="0.1"
                  placeholder="Enter β2M value"
                  value={formData.b2m_value}
                  onChange={(e) => handleInputChange('b2m_value', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creatinine">Creatinine (mg/dL)</Label>
                <Input
                  id="creatinine"
                  type="number"
                  step="0.1"
                  placeholder="Enter creatinine value"
                  value={formData.creatinine_value}
                  onChange={(e) => handleInputChange('creatinine_value', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={calculateRisk}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate Risk"
              )}
            </Button>
            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Card className={`transition-all duration-300 ${result.isHighRisk ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.isHighRisk ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              Risk Assessment Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge 
                variant={result.isHighRisk ? "destructive" : "secondary"}
                className={`text-lg px-4 py-2 ${result.isHighRisk ? 'bg-red-600' : 'bg-green-600'}`}
              >
                {result.risk}
              </Badge>
            </div>
            
            {result.riskFactors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Positive Risk Factors:</h4>
                <ul className="space-y-1">
                  {result.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span className="text-sm">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {result.isHighRisk 
                  ? "Patient meets criteria for High-Risk Multiple Myeloma. Consider appropriate treatment strategies and closer monitoring."
                  : "Patient does not meet criteria for High-Risk Multiple Myeloma based on current assessment."
                }
              </AlertDescription>
            </Alert>
            
            {result.clinicalInterpretation && (
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Clinical Interpretation:</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{result.clinicalInterpretation}</p>
              </div>
            )}
            
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Clinical Recommendations:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Calculator;