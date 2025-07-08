import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingDown, BarChart3 } from 'lucide-react';

const SurvivalCharts = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Survival Analysis Reference
        </h2>
        <p className="text-lg text-gray-600">
          Kaplan-Meier Survival Curves by Risk Classification
        </p>
      </div>

      {/* Survival Curves Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* First Set of Curves */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-blue-600" />
              Overall Survival by Risk Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Kaplan-Meier Curve A</p>
                  <p className="text-xs">Overall Survival Analysis</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Standard Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High Risk</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Set of Curves */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-purple-600" />
              Progression-Free Survival
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Kaplan-Meier Curve B</p>
                  <p className="text-xs">Progression-Free Survival</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Standard Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">High Risk</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistical Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Statistical Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Badge variant="outline" className="text-xs">Overall Survival</Badge>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard Risk</span>
                  <span className="text-sm font-medium">Better prognosis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">High Risk</span>
                  <span className="text-sm font-medium">Poorer prognosis</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Badge variant="outline" className="text-xs">Progression-Free Survival</Badge>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard Risk</span>
                  <span className="text-sm font-medium">Longer PFS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">High Risk</span>
                  <span className="text-sm font-medium">Shorter PFS</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Badge variant="outline" className="text-xs">Clinical Significance</Badge>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Risk stratification guides treatment intensity and monitoring frequency
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reference Information */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Reference Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-blue-800">
              <strong>Source:</strong> International Myeloma Society/International Myeloma Working Group 
              Consensus Recommendations on the Definition of High-Risk Multiple Myeloma
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Abbreviations:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 1q+: gain (≥3 copies) or amplification (≥4 copies)</li>
                  <li>• β2M: β2-microglobulin</li>
                  <li>• CCF: cancer clonal fraction</li>
                  <li>• HRMM: high-risk multiple myeloma</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Technical Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• CCF ≥20% on CD138-positive cells</li>
                  <li>• NGS-based method assessment</li>
                  <li>• Normal creatinine: &lt;1.2 mg/dL</li>
                  <li>• High β2M threshold: ≥5.5 mg/L</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurvivalCharts;