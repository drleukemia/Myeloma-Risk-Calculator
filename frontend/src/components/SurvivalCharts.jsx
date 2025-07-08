import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingDown, BarChart3, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const SurvivalCharts = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Survival Analysis & Clinical Data
        </h2>
        <p className="text-lg text-gray-600">
          Kaplan-Meier Survival Outcomes by Risk Classification
        </p>
      </div>

      {/* del(17p) CCF Impact on Survival */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Impact of del(17p) CCF on Survival Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-red-900 mb-2">Spanish Myeloma Studies (GEM Dataset)</h3>
            <p className="text-sm text-red-800">
              Analysis showing dose-response relationship between del(17p) cancer clonal fraction and survival outcomes. 
              Higher CCF correlates with worse prognosis for both PFS and OS.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-3 font-semibold">CCF Cutoff</th>
                  <th className="text-left p-3 font-semibold">Patients (%)</th>
                  <th className="text-left p-3 font-semibold">Median PFS (months)</th>
                  <th className="text-left p-3 font-semibold">HR for PFS (95% CI)</th>
                  <th className="text-left p-3 font-semibold">Median OS (months)</th>
                  <th className="text-left p-3 font-semibold">HR for OS (95% CI)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥10%</td>
                  <td className="p-3">134 (11.8%)</td>
                  <td className="p-3">27.3</td>
                  <td className="p-3">1.5 (1.2-1.9)</td>
                  <td className="p-3">54.2</td>
                  <td className="p-3">2.1 (1.6-2.7)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 bg-yellow-50">
                  <td className="p-3 font-medium">≥20%</td>
                  <td className="p-3">89 (7.7%)</td>
                  <td className="p-3">23.9</td>
                  <td className="p-3">1.9 (1.5-2.4)</td>
                  <td className="p-3">37.0</td>
                  <td className="p-3">2.5 (1.9-3.3)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥30%</td>
                  <td className="p-3">70 (6.2%)</td>
                  <td className="p-3">22.0</td>
                  <td className="p-3">1.9 (1.4-2.5)</td>
                  <td className="p-3">38.1</td>
                  <td className="p-3">2.5 (1.8-3.3)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥40%</td>
                  <td className="p-3">60 (5.3%)</td>
                  <td className="p-3">21.0</td>
                  <td className="p-3">2.0 (1.5-2.7)</td>
                  <td className="p-3">32.5</td>
                  <td className="p-3">2.6 (1.9-3.6)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥50%</td>
                  <td className="p-3">54 (4.8%)</td>
                  <td className="p-3">20.2</td>
                  <td className="p-3">2.0 (1.5-2.7)</td>
                  <td className="p-3">32.5</td>
                  <td className="p-3">2.6 (1.8-3.6)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥60%</td>
                  <td className="p-3">41 (3.6%)</td>
                  <td className="p-3">21.0</td>
                  <td className="p-3">2.0 (1.4-2.9)</td>
                  <td className="p-3">38.1</td>
                  <td className="p-3">2.3 (1.5-3.4)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥70%</td>
                  <td className="p-3">34 (3.0%)</td>
                  <td className="p-3">18.8</td>
                  <td className="p-3">2.0 (1.4-2.9)</td>
                  <td className="p-3">38.1</td>
                  <td className="p-3">2.3 (1.5-3.5)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium">≥80%</td>
                  <td className="p-3">23 (1.9%)</td>
                  <td className="p-3">13.8</td>
                  <td className="p-3">2.3 (1.5-3.7)</td>
                  <td className="p-3">45.6</td>
                  <td className="p-3">2.2 (1.3-3.7)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 bg-red-50">
                  <td className="p-3 font-medium">≥90%</td>
                  <td className="p-3">13 (1.1%)</td>
                  <td className="p-3">8.4</td>
                  <td className="p-3 font-bold text-red-600">3.6 (2.1-6.7)</td>
                  <td className="p-3">31.2</td>
                  <td className="p-3 font-bold text-red-600">2.8 (1.5-5.4)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Clinical Note:</strong> ≥20% CCF threshold is used in IMWG criteria. Higher CCF levels show progressively worse outcomes, 
              with ≥90% CCF showing the worst prognosis (HR 3.6 for PFS, 2.8 for OS).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Survival Outcomes by Risk Group */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Survival */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Overall Survival by Risk Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simulated Survival Curve Visual */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 h-64 flex flex-col justify-between">
                <div className="text-xs text-gray-600 mb-2">Survival Probability</div>
                <div className="flex-1 relative">
                  {/* Standard Risk Curve */}
                  <div className="absolute top-2 left-0 w-full h-1">
                    <div className="w-full h-full bg-gradient-to-r from-green-500 via-green-400 to-green-300 rounded"></div>
                  </div>
                  <div className="absolute top-1 left-0 text-xs text-green-700 font-medium">Standard Risk</div>
                  
                  {/* High Risk Curve */}
                  <div className="absolute top-20 left-0 w-3/4 h-1">
                    <div className="w-full h-full bg-gradient-to-r from-red-500 via-red-400 to-red-300 rounded"></div>
                  </div>
                  <div className="absolute top-19 left-0 text-xs text-red-700 font-medium">High Risk</div>
                  
                  {/* Survival Stats */}
                  <div className="absolute bottom-8 left-0 right-0 grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white/80 p-2 rounded border">
                      <div className="font-medium text-green-700">Standard Risk</div>
                      <div>5-year OS: ~85%</div>
                      <div>Median: Not reached</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded border">
                      <div className="font-medium text-red-700">High Risk</div>
                      <div>5-year OS: ~45%</div>
                      <div>Median: 48 months</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">Time (Months)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progression-Free Survival */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Progression-Free Survival
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simulated PFS Curve Visual */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 h-64 flex flex-col justify-between">
                <div className="text-xs text-gray-600 mb-2">Progression-Free Probability</div>
                <div className="flex-1 relative">
                  {/* Standard Risk PFS Curve */}
                  <div className="absolute top-2 left-0 w-5/6 h-1">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded"></div>
                  </div>
                  <div className="absolute top-1 left-0 text-xs text-blue-700 font-medium">Standard Risk</div>
                  
                  {/* High Risk PFS Curve */}
                  <div className="absolute top-16 left-0 w-1/2 h-1">
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 rounded"></div>
                  </div>
                  <div className="absolute top-15 left-0 text-xs text-orange-700 font-medium">High Risk</div>
                  
                  {/* PFS Stats */}
                  <div className="absolute bottom-8 left-0 right-0 grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white/80 p-2 rounded border">
                      <div className="font-medium text-blue-700">Standard Risk</div>
                      <div>Median PFS: 42 months</div>
                      <div>Better outcomes</div>
                    </div>
                    <div className="bg-white/80 p-2 rounded border">
                      <div className="font-medium text-orange-700">High Risk</div>
                      <div>Median PFS: 24 months</div>
                      <div>Requires intensive therapy</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">Time (Months)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Studies Evidence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600" />
            Key Clinical Studies Supporting IMWG Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Major Clinical Trials:</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-medium text-blue-900">HORIZON (CoMMpass)</h5>
                  <p className="text-sm text-gray-600">Comprehensive genomic analysis of newly diagnosed multiple myeloma</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-medium text-green-900">ENDURANCE</h5>
                  <p className="text-sm text-gray-600">Long-term follow-up of transplant-eligible patients</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-medium text-purple-900">FORTE</h5>
                  <p className="text-sm text-gray-600">Phase 3 trial comparing induction regimens</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="font-medium text-orange-900">DETERMINATION</h5>
                  <p className="text-sm text-gray-600">Autologous transplant vs continuous therapy</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Key Findings:</h4>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h5 className="font-medium text-red-900">del(17p) Impact</h5>
                  <ul className="text-sm text-red-800 space-y-1 mt-2">
                    <li>• Occurs in 5-10% of NDMM patients</li>
                    <li>• Dose-response relationship with CCF</li>
                    <li>• Associated with therapy resistance</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h5 className="font-medium text-orange-900">High-Risk Translocations</h5>
                  <ul className="text-sm text-orange-800 space-y-1 mt-2">
                    <li>• t(4;14): 10-15% prevalence</li>
                    <li>• t(14;16): 2-5% prevalence</li>
                    <li>• Enhanced risk with +1q co-occurrence</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900">Treatment Implications</h5>
                  <ul className="text-sm text-blue-800 space-y-1 mt-2">
                    <li>• High-risk patients need intensive therapy</li>
                    <li>• Consider novel agent combinations</li>
                    <li>• Enhanced monitoring required</li>
                  </ul>
                </div>
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
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Technical Standards:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• NGS-based mutation analysis</li>
                  <li>• FISH for cytogenetic assessment</li>
                  <li>• CD138-positive cell enrichment</li>
                  <li>• CCF ≥20% significance threshold</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Clinical Application:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Risk-adapted treatment selection</li>
                  <li>• Monitoring frequency determination</li>
                  <li>• Prognosis counseling</li>
                  <li>• Clinical trial stratification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Laboratory Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Fresh bone marrow samples</li>
                  <li>• Plasma cell percentage &gt;10%</li>
                  <li>• Quality control measures</li>
                  <li>• Standardized reporting</li>
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