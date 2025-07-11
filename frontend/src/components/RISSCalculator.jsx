import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '../hooks/use-toast';

const RISSCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patient_name: '',
    b2m_value: '',
    albumin_value: '',
    ldh_status: '',
    fish_risk: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateRISS = () => {
    setLoading(true);
    
    try {
      const b2m = parseFloat(formData.b2m_value);
      const albumin = parseFloat(formData.albumin_value);
      
      if (isNaN(b2m) || isNaN(albumin)) {
        toast({
          title: "Error",
          description: "Please enter valid β2M and albumin values",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Determine ISS Stage first
      let issStage;
      if (b2m < 3.5 && albumin >= 3.5) {
        issStage = "I";
      } else if (b2m >= 5.5) {
        issStage = "III";
      } else {
        issStage = "II";
      }
      
      // Determine R-ISS Stage
      let rissStage;
      let stageName;
      let prognosis;
      let medianOS;
      
      if (issStage === "I" && formData.fish_risk === "standard" && formData.ldh_status === "normal") {
        rissStage = "I";
        stageName = "Low Risk";
        prognosis = "Excellent";
        medianOS = "Not reached";
      } else if (issStage === "III" || formData.fish_risk === "high" || formData.ldh_status === "elevated") {
        rissStage = "III";
        stageName = "High Risk";
        prognosis = "Poor";
        medianOS = "43 months";
      } else {
        rissStage = "II";
        stageName = "Intermediate Risk";
        prognosis = "Intermediate";
        medianOS = "83 months";
      }
      
      // Generate detailed interpretation
      const interpretation = generateInterpretation(issStage, rissStage, stageName, formData);
      
      setResult({
        issStage,
        rissStage,
        stageName,
        prognosis,
        medianOS,
        interpretation,
        labValues: {
          b2m,
          albumin,
          ldh_status: formData.ldh_status,
          fish_risk: formData.fish_risk
        }
      });
      
      toast({
        title: "R-ISS Calculated",
        description: `Patient classified as R-ISS Stage ${rissStage} (${stageName})`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate R-ISS staging",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateInterpretation = (issStage, rissStage, stageName, data) => {
    let interpretation = `Patient is classified as R-ISS Stage ${rissStage} (${stageName}) based on:\n\n`;
    
    interpretation += `ISS Stage: ${issStage}\n`;
    interpretation += `- β2-microglobulin: ${data.b2m_value} mg/L\n`;
    interpretation += `- Albumin: ${data.albumin_value} g/dL\n\n`;
    
    interpretation += `Risk Factors:\n`;
    interpretation += `- FISH: ${data.fish_risk === "high" ? "High-risk abnormalities present" : "Standard risk"}\n`;
    interpretation += `- LDH: ${data.ldh_status === "elevated" ? "Elevated" : "Normal"}\n\n`;
    
    if (rissStage === "I") {
      interpretation += "This represents the best prognosis group with longest overall survival. Standard treatment approaches are typically appropriate.";
    } else if (rissStage === "II") {
      interpretation += "This represents intermediate prognosis. Treatment decisions should consider individual patient factors and may benefit from more intensive approaches.";
    } else {
      interpretation += "This represents high-risk disease requiring intensive treatment strategies, close monitoring, and consideration for clinical trials.";
    }
    
    return interpretation;
  };

  const resetCalculator = () => {
    setFormData({
      patient_name: '',
      b2m_value: '',
      albumin_value: '',
      ldh_status: '',
      fish_risk: ''
    });
    setResult(null);
  };

  const isFormValid = () => {
    return formData.b2m_value && formData.albumin_value && formData.ldh_status && formData.fish_risk;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          R-ISS Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Revised Multiple Myeloma International Staging System
        </p>
        <p className="text-sm text-gray-500">
          Prognostication tool based on genetics and routine lab values
        </p>
      </div>

      {/* Educational Note */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Use only in patients recently diagnosed with multiple myeloma.</strong> Do not use in patients with relapsed myeloma, smoldering myeloma or MGUS.
        </AlertDescription>
      </Alert>

      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-green-600" />
            R-ISS Assessment Form
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

          {/* Lab Values */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="b2m">Serum β2-microglobulin (mg/L)</Label>
              <Input
                id="b2m"
                type="number"
                step="0.1"
                placeholder="Enter β2M value"
                value={formData.b2m_value}
                onChange={(e) => handleInputChange('b2m_value', e.target.value)}
              />
              <div className="text-xs text-gray-500">
                <strong>Reference:</strong> &lt;3.5 (Stage I), 3.5-5.4 (Stage II), ≥5.5 (Stage III)
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="albumin">Serum Albumin (g/dL)</Label>
              <Input
                id="albumin"
                type="number"
                step="0.1"
                placeholder="Enter albumin value"
                value={formData.albumin_value}
                onChange={(e) => handleInputChange('albumin_value', e.target.value)}
              />
              <div className="text-xs text-gray-500">
                <strong>Reference:</strong> ≥3.5 (better prognosis), &lt;3.5 (worse prognosis)
              </div>
            </div>
          </div>

          <Separator />

          {/* FISH Analysis */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Chromosomal Abnormalities by iFISH
            </Label>
            <p className="text-sm text-gray-600">
              High risk defined as: presence of del(17p) and/or translocation t(4;14) and/or translocation t(14;16)
            </p>
            <RadioGroup 
              value={formData.fish_risk} 
              onValueChange={(value) => handleInputChange('fish_risk', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="fish-standard" />
                <Label htmlFor="fish-standard">Standard risk</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="fish-high" />
                <Label htmlFor="fish-high">High risk (del(17p), t(4;14), t(14;16))</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* LDH */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Lactate Dehydrogenase (LDH)
            </Label>
            <p className="text-sm text-gray-600">
              Compare to upper limit of normal for your laboratory
            </p>
            <RadioGroup 
              value={formData.ldh_status} 
              onValueChange={(value) => handleInputChange('ldh_status', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="ldh-normal" />
                <Label htmlFor="ldh-normal">Normal (≤ upper limit of normal)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="elevated" id="ldh-elevated" />
                <Label htmlFor="ldh-elevated">High (&gt; upper limit of normal)</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={calculateRISS}
              disabled={!isFormValid() || loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate R-ISS"
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

      {/* Results */}
      {result && (
        <Card className={`transition-all duration-300 ${result.rissStage === "III" ? 'border-red-200 bg-red-50' : result.rissStage === "I" ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.rissStage === "III" ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : result.rissStage === "I" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Info className="w-5 h-5 text-yellow-600" />
              )}
              R-ISS Staging Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Badge 
                variant={result.rissStage === "III" ? "destructive" : result.rissStage === "I" ? "secondary" : "default"}
                className={`text-lg px-4 py-2 ${result.rissStage === "III" ? 'bg-red-600' : result.rissStage === "I" ? 'bg-green-600' : 'bg-yellow-600'}`}
              >
                R-ISS Stage {result.rissStage}
              </Badge>
              <div className="text-xl font-semibold">{result.stageName}</div>
              <div className="text-sm text-gray-600">Median OS: {result.medianOS}</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Laboratory Values:</h4>
                <div className="space-y-1 text-sm">
                  <div>β2-microglobulin: {result.labValues.b2m} mg/L</div>
                  <div>Albumin: {result.labValues.albumin} g/dL</div>
                  <div>LDH: {result.labValues.ldh_status === "elevated" ? "Elevated" : "Normal"}</div>
                  <div>FISH: {result.labValues.fish_risk === "high" ? "High-risk abnormalities" : "Standard risk"}</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Prognosis:</h4>
                <div className="space-y-1 text-sm">
                  <div>Overall: {result.prognosis}</div>
                  <div>ISS Stage: {result.issStage}</div>
                  <div>R-ISS Stage: {result.rissStage}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Clinical Interpretation:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">{result.interpretation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* R-ISS Staging Reference */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">R-ISS Staging Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Stage I (Low Risk)</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• ISS Stage I</li>
                <li>• Standard risk FISH</li>
                <li>• Normal LDH</li>
                <li>• Median OS: Not reached</li>
              </ul>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Stage II (Intermediate)</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Not Stage I or III</li>
                <li>• Intermediate prognosis</li>
                <li>• Median OS: ~83 months</li>
              </ul>
            </div>
            
            <div className="bg-red-100 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Stage III (High Risk)</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• ISS Stage III, OR</li>
                <li>• High-risk FISH, OR</li>
                <li>• Elevated LDH</li>
                <li>• Median OS: ~43 months</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RISSCalculator;