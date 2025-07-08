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
              {/* Actual Kaplan-Meier Style Curve */}
              <div className="bg-white rounded-lg border p-6 h-80 relative">
                {/* Y-axis */}
                <div className="absolute left-2 top-4 bottom-16 w-8 flex flex-col justify-between text-xs text-gray-600">
                  <span>1.0</span>
                  <span>0.8</span>
                  <span>0.6</span>
                  <span>0.4</span>
                  <span>0.2</span>
                  <span>0.0</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-10 mr-4 mt-4 mb-16 h-full relative bg-gray-50 border">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {[0, 20, 40, 60, 80].map(pct => (
                      <div key={pct} className="absolute border-b border-gray-200" 
                           style={{bottom: `${pct}%`, width: '100%'}}></div>
                    ))}
                    {[0, 25, 50, 75, 100].map(pct => (
                      <div key={pct} className="absolute border-r border-gray-200 h-full" 
                           style={{left: `${pct}%`}}></div>
                    ))}
                  </div>
                  
                  {/* Standard Risk Curve (Higher, better survival) */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 0 10 L 50 15 L 100 20 L 150 25 L 200 30 L 250 35 L 300 45"
                      stroke="#10b981"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                  </svg>
                  
                  {/* High Risk Curve (Lower, worse survival) */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 0 10 L 30 25 L 60 45 L 100 65 L 150 85 L 200 105 L 250 125 L 300 145"
                      stroke="#ef4444"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white/90 border rounded p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-green-500"></div>
                      <span>Standard Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-red-500"></div>
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>
                
                {/* X-axis */}
                <div className="absolute bottom-2 left-10 right-4 h-8 flex justify-between items-end text-xs text-gray-600">
                  <span>0</span>
                  <span>24</span>
                  <span>48</span>
                  <span>72</span>
                  <span>96</span>
                </div>
                
                {/* Axis labels */}
                <div className="absolute left-1 top-1/2 -rotate-90 text-xs text-gray-700 font-medium">
                  Survival Probability
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 font-medium">
                  Time (Months)
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <div className="font-medium text-green-900">Standard Risk</div>
                  <div className="text-green-800">5-year OS: ~85%</div>
                  <div className="text-green-800">Median: Not reached</div>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                  <div className="font-medium text-red-900">High Risk</div>
                  <div className="text-red-800">5-year OS: ~45%</div>
                  <div className="text-red-800">Median: 48 months</div>
                </div>
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
              {/* Actual Kaplan-Meier Style PFS Curve */}
              <div className="bg-white rounded-lg border p-6 h-80 relative">
                {/* Y-axis */}
                <div className="absolute left-2 top-4 bottom-16 w-8 flex flex-col justify-between text-xs text-gray-600">
                  <span>1.0</span>
                  <span>0.8</span>
                  <span>0.6</span>
                  <span>0.4</span>
                  <span>0.2</span>
                  <span>0.0</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-10 mr-4 mt-4 mb-16 h-full relative bg-gray-50 border">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {[0, 20, 40, 60, 80].map(pct => (
                      <div key={pct} className="absolute border-b border-gray-200" 
                           style={{bottom: `${pct}%`, width: '100%'}}></div>
                    ))}
                    {[0, 25, 50, 75, 100].map(pct => (
                      <div key={pct} className="absolute border-r border-gray-200 h-full" 
                           style={{left: `${pct}%`}}></div>
                    ))}
                  </div>
                  
                  {/* Standard Risk PFS Curve */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 0 10 L 40 20 L 80 35 L 120 50 L 160 70 L 200 90 L 240 110 L 280 130"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                  </svg>
                  
                  {/* High Risk PFS Curve (Steeper decline) */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 0 10 L 20 30 L 40 55 L 80 85 L 120 115 L 160 140 L 200 160 L 240 175"
                      stroke="#f97316"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white/90 border rounded p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-0.5 bg-blue-500"></div>
                      <span>Standard Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-orange-500"></div>
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>
                
                {/* X-axis */}
                <div className="absolute bottom-2 left-10 right-4 h-8 flex justify-between items-end text-xs text-gray-600">
                  <span>0</span>
                  <span>12</span>
                  <span>24</span>
                  <span>36</span>
                  <span>48</span>
                </div>
                
                {/* Axis labels */}
                <div className="absolute left-1 top-1/2 -rotate-90 text-xs text-gray-700 font-medium">
                  PFS Probability
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 font-medium">
                  Time (Months)
                </div>
              </div>
              
              {/* PFS Statistics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <div className="font-medium text-blue-900">Standard Risk</div>
                  <div className="text-blue-800">Median PFS: 42 months</div>
                  <div className="text-blue-800">Better outcomes</div>
                </div>
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                  <div className="font-medium text-orange-900">High Risk</div>
                  <div className="text-orange-800">Median PFS: 24 months</div>
                  <div className="text-orange-800">Requires intensive therapy</div>
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