import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { FileText, AlertTriangle } from 'lucide-react';

const ReferenceTable = () => {
  const hrmm2014Data = [
    {
      factor: "del(17p)",
      summary: "≥20% (if > 20% present)",
      supporting: "Del(17p) is a significant poor prognostic factor associated with shorter PFS and OS"
    },
    {
      factor: "TP53",
      summary: "≥20% (if > 20% present)",
      supporting: "TP53 mutations are associated with poor prognosis, resistance to therapy, and shorter overall survival"
    },
    {
      factor: "t(4;14)",
      summary: "Prognostic impact of translocation may depend on treatment",
      supporting: "t(4;14) is associated with intermediate to poor prognosis, but impact may be treatment-dependent"
    },
    {
      factor: "t(14;16)",
      summary: "Negative prognostic impact consistently reported",
      supporting: "t(14;16) is consistently associated with poor prognosis across multiple studies"
    },
    {
      factor: "t(14;20)",
      summary: "Negative prognostic impact consistently reported",
      supporting: "t(14;20) is associated with poor prognosis, though less common than other translocations"
    },
    {
      factor: "1q+",
      summary: "Prognostic impact depends on method of assessment",
      supporting: "1q+ (gain or amplification) shows prognostic impact, with amplification being more significant"
    },
    {
      factor: "del(1p32)",
      summary: "Prognostic impact when present with other abnormalities",
      supporting: "del(1p32) shows prognostic significance, particularly when co-occurring with other abnormalities"
    },
    {
      factor: "High β2M",
      summary: "≥5.5 mg/L with normal creatinine",
      supporting: "High β2M (≥5.5 mg/L) with normal creatinine is associated with poor prognosis"
    }
  ];

  const currentPotentialFactors = [
    { factor: "TP53", status: "Current", "high-risk": "✓", "ultra-high": "✓" },
    { factor: "del(17p)", status: "Current", "high-risk": "✓", "ultra-high": "✓" },
    { factor: "t(4;14)", status: "Current", "high-risk": "✓", "ultra-high": "" },
    { factor: "t(14;16)", status: "Current", "high-risk": "✓", "ultra-high": "✓" },
    { factor: "t(14;20)", status: "Current", "high-risk": "✓", "ultra-high": "✓" },
    { factor: "1q+", status: "Current", "high-risk": "✓", "ultra-high": "" },
    { factor: "del(1p32)", status: "Current", "high-risk": "✓", "ultra-high": "" },
    { factor: "del(1p32) co-occurring", status: "Current", "high-risk": "✓", "ultra-high": "" },
    { factor: "Biallelic del(1p32)", status: "Current", "high-risk": "✓", "ultra-high": "" },
    { factor: "High β2M", status: "Current", "high-risk": "✓", "ultra-high": "" }
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

      {/* HRMM 2014 Definition Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            IMWG 2014 HRMM Definition and Supporting Rationale
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
                {hrmm2014Data.map((item, index) => (
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