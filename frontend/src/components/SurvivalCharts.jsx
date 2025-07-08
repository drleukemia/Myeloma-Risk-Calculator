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

      {/* Survival Data Summary - No Curves */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Survival Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Overall Survival Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                  <div className="font-medium text-green-900">Standard Risk</div>
                  <div className="text-green-800 text-sm mt-2">5-year OS: ~85%</div>
                  <div className="text-green-800 text-sm">Median: Not reached</div>
                  <div className="text-green-700 text-xs mt-1">Better prognosis</div>
                </div>
                <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                  <div className="font-medium text-red-900">High Risk</div>
                  <div className="text-red-800 text-sm mt-2">5-year OS: ~45%</div>
                  <div className="text-red-800 text-sm">Median: 48 months</div>
                  <div className="text-red-700 text-xs mt-1">Requires intensive treatment</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progression-Free Survival Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Progression-Free Survival Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <div className="font-medium text-blue-900">Standard Risk</div>
                  <div className="text-blue-800 text-sm mt-2">Median PFS: 42 months</div>
                  <div className="text-blue-700 text-xs mt-1">Longer progression-free survival</div>
                </div>
                <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
                  <div className="font-medium text-orange-900">High Risk</div>
                  <div className="text-orange-800 text-sm mt-2">Median PFS: 24 months</div>
                  <div className="text-orange-700 text-xs mt-1">Shorter progression-free survival</div>
                </div>
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
              <h4 className="font-medium text-gray-900">Key Findings from IMS-IMWG 2024:</h4>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-medium text-red-900 mb-2">del(17p) and/or TP53 mutation</h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Occurs in 5%-10% of patients with NDMM</li>
                    <li>• Can be acquired at later stages</li>
                    <li>• Prevalence higher in patients with RRMM</li>
                    <li>• del(17p) is an independent prognostic factor associated with shorter PFS and OS</li>
                    <li>• Biallelic TP53 mutation is an independent prognostic factor associated with shorter PFS and OS</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-orange-900 mb-2">High-risk translocations</h5>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• <strong>t(4;14):</strong> Occurs in 10%-15% of patients with NDMM. Considered a high-risk feature in R-ISS</li>
                    <li>• <strong>t(14;16):</strong> Occurs in 2%-5% of patients with NDMM. Consistently poor prognosis</li>
                    <li>• <strong>t(14;20):</strong> Occurs in 2% of patients with NDMM. Co-occurs with other CAs</li>
                    <li>• t(14;16), t(14;20), and t(4;14) are prognostic of worse outcomes when co-occurring with +1q or del(1p32)</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-900 mb-2">+1q and del(1p32)</h5>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>+1q:</strong> Occurs in 35%-40% of patients with NDMM. Most significant prognostic impact on PFS and/or OS when co-occurring with t(14;16), t(4;14), or t(14;20)</li>
                    <li>• <strong>del(1p32):</strong> Occurs in 11% of patients with NDMM. Monoallelic del(1p32) co-occurring with +1q, t(4;14), t(14;16), or t(14;20) marks worse prognosis</li>
                    <li>• Biallelic del(1p32) is an independent prognostic factor for shorter PFS and OS</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">High β2M with normal creatinine</h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• High β2M defined as ≥5.5 mg/dL and normal creatinine (&lt;1.2 mg/dL)</li>
                    <li>• Poor prognosis in patients with high β2M with normal renal function, even without any of the above-described high-risk features</li>
                    <li>• Mixed data for independent prognostic impact of isolated high β2M with abnormal renal function</li>
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