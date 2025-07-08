import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { FileText, AlertTriangle, TrendingDown } from 'lucide-react';

const ReferenceTable = () => {
  const hrmm2024Data = [
    {
      factor: "del(17p)",
      summary: "Occurs in 5%-10% of patients with NDMM (CCF ≥20%)",
      supporting: "Del(17p) is an independent prognostic factor associated with shorter PFS and OS. Can be acquired at later stages. Prevalence higher in patients with RRMM."
    },
    {
      factor: "TP53 mutations",
      summary: "Occurs in 8%-10% of patients with NDMM. Can be acquired at later stages",
      supporting: "Biallelic TP53 mutation is an independent prognostic factor associated with shorter PFS and OS. Strong correlation with del(17p)."
    },
    {
      factor: "t(4;14)",
      summary: "Occurs in 10%-15% of patients with NDMM. High-risk feature in R-ISS",
      supporting: "t(4;14) is strongly associated with other CAs and adverse risk features, such as hyper-APOBEC signature. Prognostic impact may be treatment-dependent."
    },
    {
      factor: "t(14;16)",
      summary: "Occurs in 2%-5% of patients with NDMM. Consistently poor prognosis",
      supporting: "t(14;16) has prognostic impact of worse outcomes (worse PFS and/or OS) specifically when co-occurring with +1q or del(1p32)."
    },
    {
      factor: "t(14;20)",
      summary: "Occurs in 2% of patients with NDMM. Co-occurs with other CAs",
      supporting: "t(14;20) co-occurs with other CAs, including gain(1q) or del(1p32). Associated with poor outcomes."
    },
    {
      factor: "+1q",
      summary: "Occurs in 35%-40% of patients with NDMM. Most significant prognostic impact",
      supporting: "+1q has the most significant prognostic impact on PFS and/or OS when co-occurring with t(14;16), t(4;14), or t(14;20). Makes worse prognosis in terms of PFS and OS."
    },
    {
      factor: "del(1p32)",
      summary: "Occurs in 11% of patients with NDMM. Co-occurring with +1q makes worse prognosis",
      supporting: "Monoallelic del(1p32) co-occurring with +1q, t(4;14), t(14;16), or t(14;20) marks worse prognosis in terms of PFS and OS. Biallelic del(1p32) is an independent prognostic factor for shorter PFS and OS."
    },
    {
      factor: "High β2M",
      summary: "β2M ≥5.5 mg/L with normal creatinine (&lt;1.2 mg/dL)",
      supporting: "Poor prognosis in patients with high β2M with normal renal function, even without any of the above-described high-risk features. Mixed data for independent prognostic impact of isolated high β2M with abnormal renal function."
    }
  ];

  const currentPotentialFactors = [
    { factor: "TP53", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "del(17p)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "t(4;14)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "t(14;16)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "t(14;20)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "1q+", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "del(1p32)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "del(1p32) co-occurring", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "Biallelic del(1p32)", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "High β2M", status: "Current", "high-risk": "✓", "potential": "" },
    { factor: "CKS1B gain", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "CKS1B-APOBEC signature", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "TP53 pathway (Mutation and/or del)", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "Immune profile", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "Proliferation index", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "Response to induction Δ (10%)", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "Response to induction Δ (20%)", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "Response to induction Δ (40%)", status: "Potential", "high-risk": "", "potential": "✓" },
    { factor: "cfDNA", status: "Potential", "high-risk": "", "potential": "✓" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Reference Tables
        </h2>
        <p className="text-lg text-gray-600">
          IMWG 2014 HRMM Definition and Supporting Evidence
        </p>
      </div>

      {/* Survival Outcomes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Impact of del(17p) CCF on Survival Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CCF Cutoff</TableHead>
                  <TableHead>Patients (%)</TableHead>
                  <TableHead>Median PFS (months)</TableHead>
                  <TableHead>HR for PFS</TableHead>
                  <TableHead>Median OS (months)</TableHead>
                  <TableHead>HR for OS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">≥10%</TableCell>
                  <TableCell>134 (11.8%)</TableCell>
                  <TableCell>27.3</TableCell>
                  <TableCell>1.5 (1.2-1.9)</TableCell>
                  <TableCell>54.2</TableCell>
                  <TableCell>2.1 (1.6-2.7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥20%</TableCell>
                  <TableCell>89 (7.7%)</TableCell>
                  <TableCell>23.9</TableCell>
                  <TableCell>1.9 (1.5-2.4)</TableCell>
                  <TableCell>37.0</TableCell>
                  <TableCell>2.5 (1.9-3.3)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥30%</TableCell>
                  <TableCell>70 (6.2%)</TableCell>
                  <TableCell>22.0</TableCell>
                  <TableCell>1.9 (1.4-2.5)</TableCell>
                  <TableCell>38.1</TableCell>
                  <TableCell>2.5 (1.8-3.3)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥40%</TableCell>
                  <TableCell>60 (5.3%)</TableCell>
                  <TableCell>21.0</TableCell>
                  <TableCell>2.0 (1.5-2.7)</TableCell>
                  <TableCell>32.5</TableCell>
                  <TableCell>2.6 (1.9-3.6)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥50%</TableCell>
                  <TableCell>54 (4.8%)</TableCell>
                  <TableCell>20.2</TableCell>
                  <TableCell>2.0 (1.5-2.7)</TableCell>
                  <TableCell>32.5</TableCell>
                  <TableCell>2.6 (1.8-3.6)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥60%</TableCell>
                  <TableCell>41 (3.6%)</TableCell>
                  <TableCell>21.0</TableCell>
                  <TableCell>2.0 (1.4-2.9)</TableCell>
                  <TableCell>38.1</TableCell>
                  <TableCell>2.3 (1.5-3.4)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥70%</TableCell>
                  <TableCell>34 (3.0%)</TableCell>
                  <TableCell>18.8</TableCell>
                  <TableCell>2.0 (1.4-2.9)</TableCell>
                  <TableCell>38.1</TableCell>
                  <TableCell>2.3 (1.5-3.5)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥80%</TableCell>
                  <TableCell>23 (1.9%)</TableCell>
                  <TableCell>13.8</TableCell>
                  <TableCell>2.3 (1.5-3.7)</TableCell>
                  <TableCell>45.6</TableCell>
                  <TableCell>2.2 (1.3-3.7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">≥90%</TableCell>
                  <TableCell>13 (1.1%)</TableCell>
                  <TableCell>8.4</TableCell>
                  <TableCell>3.6 (2.1-6.7)</TableCell>
                  <TableCell>31.2</TableCell>
                  <TableCell>2.8 (1.5-5.4)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Note:</strong> Data from Spanish Myeloma Studies (GEM Dataset) showing dose-response 
              relationship between del(17p) cancer clonal fraction and survival outcomes. Higher CCF correlates 
              with worse prognosis for both PFS and OS.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* HRMM 2014 Definition Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            IMWG 2024 HRMM Definition and Supporting Rationale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Factor</TableHead>
                  <TableHead className="w-80">Summary of key characteristics</TableHead>
                  <TableHead>Supporting evidence/rationale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hrmm2024Data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="text-xs">
                        {item.factor}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.summary}</TableCell>
                    <TableCell className="text-sm text-gray-600">{item.supporting}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Current and Potential Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Current and Potential High-Risk Factors for NDMM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">High-Risk</TableHead>
                  <TableHead className="text-center">Ultra-High-Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPotentialFactors.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Badge variant="secondary" className="text-xs">
                        {item.factor}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {item["high-risk"] && (
                        <Badge variant="destructive" className="text-xs">✓</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item["ultra-high"] && (
                        <Badge variant="destructive" className="text-xs">✓</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <Card className="bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">Clinical Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-amber-900 mb-2">Assessment Requirements:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• NGS-based analysis for mutations</li>
                  <li>• FISH analysis for cytogenetic abnormalities</li>
                  <li>• CD138-positive cell enrichment</li>
                  <li>• CCF ≥20% threshold for significance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-amber-900 mb-2">Laboratory Considerations:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• β2M measurement with concurrent creatinine</li>
                  <li>• Proper sample handling and processing</li>
                  <li>• Quality control for molecular testing</li>
                  <li>• Timely result reporting for clinical decisions</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-amber-100 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> This calculator is based on the International Myeloma Working Group 
                consensus recommendations. Clinical decisions should always incorporate additional patient factors, 
                treatment history, and current clinical guidelines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferenceTable;