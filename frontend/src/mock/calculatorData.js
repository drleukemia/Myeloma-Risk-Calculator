// Mock data for IMWG Risk Calculator
// This file contains sample data and constants used in the calculator

export const riskCriteria = {
  criterion1: {
    name: "del(17p) and/or TP53 mutation",
    description: "Assessed using NGS-based method with CCF ≥20% on CD138-positive cells",
    technicalNote: "Cancer clonal fraction ≥20% analyzed on CD138-positive/purified cells"
  },
  criterion2: {
    name: "High-risk translocation with 1q+ and/or del(1p32)",
    description: "t(4;14) OR t(14;16) OR t(14;20) co-occurring with 1q+ and/or del(1p32)",
    technicalNote: "1q+ = gain (≥3 copies) or amplification (≥4 copies) of chromosome 1q"
  },
  criterion3: {
    name: "del(1p32) patterns",
    description: "Monoallelic del(1p32) with 1q+ OR biallelic del(1p32)",
    technicalNote: "Deletion of 1p32 region with or without 1q abnormalities"
  },
  criterion4: {
    name: "β2-microglobulin and Creatinine levels",
    description: "High β2M (≥5.5 mg/L) with normal creatinine (<1.2 mg/dL)",
    technicalNote: "Elevated β2-microglobulin without renal dysfunction"
  }
};

export const abbreviations = {
  "1q+": "gain (≥3 copies) or amplification (≥4 copies) of chromosome 1q",
  "β2M": "β2-microglobulin",
  "CCF": "cancer clonal fraction",
  "HRMM": "high-risk multiple myeloma",
  "NGS": "next-generation sequencing",
  "FISH": "fluorescence in situ hybridization",
  "OS": "overall survival",
  "PFS": "progression-free survival"
};

export const normalRanges = {
  b2m: {
    normal: "< 2.5 mg/L",
    elevated: "2.5-5.5 mg/L",
    high: "≥ 5.5 mg/L"
  },
  creatinine: {
    normal: "< 1.2 mg/dL",
    elevated: "≥ 1.2 mg/dL"
  }
};

export const survivalData = {
  overallSurvival: {
    standardRisk: {
      median: "Not reached",
      fiveYear: "85%",
      description: "Significantly better overall survival"
    },
    highRisk: {
      median: "48 months",
      fiveYear: "45%",
      description: "Poorer overall survival requiring intensive treatment"
    }
  },
  progressionFreeSurvival: {
    standardRisk: {
      median: "42 months",
      description: "Longer progression-free survival"
    },
    highRisk: {
      median: "24 months",
      description: "Shorter progression-free survival"
    }
  }
};

export const clinicalGuidance = {
  standardRisk: {
    monitoring: "Standard monitoring intervals",
    treatment: "Standard treatment protocols",
    prognosis: "Generally favorable prognosis"
  },
  highRisk: {
    monitoring: "More frequent monitoring required",
    treatment: "Consider intensive treatment strategies",
    prognosis: "Requires aggressive management and closer surveillance"
  }
};

export const samplePatients = [
  {
    id: 1,
    name: "Patient A",
    del17p_tp53: "negative",
    translocation_combo: "negative",
    del1p32_1q: "negative",
    b2m_value: "3.2",
    creatinine_value: "1.0",
    expectedResult: "STANDARD RISK"
  },
  {
    id: 2,
    name: "Patient B",
    del17p_tp53: "positive",
    translocation_combo: "negative",
    del1p32_1q: "negative",
    b2m_value: "4.1",
    creatinine_value: "1.1",
    expectedResult: "HIGH RISK"
  },
  {
    id: 3,
    name: "Patient C",
    del17p_tp53: "negative",
    translocation_combo: "negative",
    del1p32_1q: "negative",
    b2m_value: "6.2",
    creatinine_value: "1.0",
    expectedResult: "HIGH RISK"
  }
];

export default {
  riskCriteria,
  abbreviations,
  normalRanges,
  survivalData,
  clinicalGuidance,
  samplePatients
};