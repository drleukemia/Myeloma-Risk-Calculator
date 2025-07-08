import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const Calculator = () => {
  const [formData, setFormData] = useState({
    del17p_tp53: '',
    translocation_combo: '',
    del1p32_1q: '',
    b2m_value: '',
    creatinine_value: ''
  });

  const [result, setResult] = useState(null);
  const [showEducation, setShowEducation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRisk = () => {
    let riskFactors = [];
    
    // Criterion 1: del(17p) and/or TP53 mutation
    if (formData.del17p_tp53 === 'positive') {
      riskFactors.push('del(17p) and/or TP53 mutation');
    }
    
    // Criterion 2: Translocation with 1q+ and/or del(1p32)
    if (formData.translocation_combo === 'positive') {
      riskFactors.push('High-risk translocation with 1q+ and/or del(1p32)');
    }
    
    // Criterion 3: del(1p32) patterns
    if (formData.del1p32_1q === 'positive') {
      riskFactors.push('del(1p32) with 1q+ or biallelic del(1p32)');
    }
    
    // Criterion 4: High β2M with normal creatinine
    const b2m = parseFloat(formData.b2m_value);
    const creatinine = parseFloat(formData.creatinine_value);
    
    if (b2m >= 5.5 && creatinine < 1.2) {
      riskFactors.push('High β2-microglobulin (≥5.5 mg/L) with normal creatinine');
    }
    
    const isHighRisk = riskFactors.length > 0;
    
    setResult({
      risk: isHighRisk ? 'HIGH RISK' : 'STANDARD RISK',
      riskFactors: riskFactors,
      isHighRisk: isHighRisk
    });
  };

  const resetCalculator = () => {
    setFormData({
      del17p_tp53: '',
      translocation_combo: '',
      del1p32_1q: '',
      b2m_value: '',
      creatinine_value: ''
    });
    setResult(null);
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
                based on cytogenetic abnormalities and biomarker levels. This stratification helps guide treatment 
                decisions and prognosis assessment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Risk Criteria:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>del(17p) and/or TP53 mutation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>t(4;14), t(14;16), or t(14;20) with 1q+ and/or del(1p32)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Monoallelic del(1p32) with 1q+ or biallelic del(1p32)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>High β2M (≥5.5 mg/L) with normal creatinine (&lt;1.2 mg/dL)</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Key Points:</h4>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• CCF ≥20% analyzed on CD138-positive cells</li>
                  <li>• NGS-based method for mutations</li>
                  <li>• 1q+ = gain (≥3 copies) or amplification (≥4 copies)</li>
                  <li>• Any single criterion = High Risk classification</li>
                </ul>
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
              2. High-risk translocation with 1q+ and/or del(1p32)
            </Label>
            <p className="text-sm text-gray-600">
              t(4;14) OR t(14;16) OR t(14;20) co-occurring with 1q+ and/or del(1p32)
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
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Calculate Risk
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Calculator;