import { demoMatch } from "../../match-helpers";

const MAIN_ONLY =
  "Main-study enrollment is complete, so she would be screened for the sub-study only; this main-study-only criterion does not apply to her.";

export default demoMatch(
  "NCT05646862",
  "Excluded: requires a PIK3CA mutation, and none was detected on her Sep 2026 ctDNA",
  "She fits most of the profile: HR+/HER2-negative, progression after one metastatic line (letrozole + ribociclib, 9/2026), evaluable bone disease accepted, no prior PI3K/AKT/mTOR inhibitor, and diet-controlled diabetes. The blocker is the mandatory PIK3CA mutation. Guardant360 (16 Sep 2026) found none, in a sample that did show ESR1 and CDH1 variants at about 2% VAF, so a missed clonal PIK3CA mutation is unlikely. Main-study enrollment is closed, leaving only the sub-study. A qualifying PIK3CA mutation on tissue NGS would be the only way in, and her HbA1c of 6.4% would then need attention.",
  [
    {
      id: "NCT05646862-inc-1",
      status: "not-applicable",
      rationale: "LHRH-agonist requirement covers pre/perimenopausal women and men; she is a 67-year-old postmenopausal woman.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-inc-2",
      status: "pass",
      rationale:
        "Metastatic lobular breast carcinoma was confirmed on the May 2024 left iliac biopsy. Multifocal bone metastases are not amenable to curative surgery or radiotherapy.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.", source: "Pathology 2024-05-29" },
        { quote: "May 2024 hip/back pain -> bone scan + CT: multiple bone mets", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05646862-inc-3",
      status: "pass",
      rationale: "ER 90% and PR 5% with HER2 IHC 0 on the 2024 bone metastasis: HR-positive, HER2-negative by ASCO/CAP.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Pathology 2024-05-29" },
        { quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" },
      ],
    },
    {
      id: "NCT05646862-inc-4",
      status: "fail",
      rationale:
        "No PIK3CA mutation was detected on Guardant360 ctDNA (16 Sep 2026), although the same sample showed ESR1 and CDH1 variants at about 2% VAF. Tissue NGS has never been done because the bone core was decalcified.",
      evidence: [
        { quote: "PIK3CA, AKT1, PTEN: not detected", source: "Guardant360 2026-09-23" },
        { quote: "PIK3CA/AKT1/PTEN neg on ctDNA only; bone bx decalcified, no tissue NGS.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05646862-inc-5",
      status: "pass",
      rationale:
        "Progressed on first-line letrozole + ribociclib after about 27 months. That is one prior metastatic line, within the ≤ 2 allowed.",
      evidence: [
        {
          quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia) + zoledronic acid, best response SD.",
          source: "Clinic note 2026-09-25",
        },
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05646862-inc-6",
      status: "pass",
      rationale: "Bone-only disease is evaluable but not measurable by RECIST 1.1, and evaluable disease is accepted here.",
      evidence: [{ quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-inc-7",
      status: "pass",
      rationale:
        "Bone-only disease with no visceral involvement, and the oncologist plans endocrine-based options only; chemotherapy is not proposed.",
      evidence: [
        {
          quote:
            "Options: elacestrant (ESR1m, >12 mo on prior CDK4/6i) vs fulvestrant-based combination vs clinical trial of next-gen oral SERD.",
          source: "Clinic note 2026-09-25",
        },
      ],
    },
    {
      id: "NCT05646862-inc-8",
      status: "pass",
      rationale: "ECOG 1 on 25 Sep 2026.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-inc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Not stated explicitly, but bone-only disease, ECOG 1 and preserved organ function make a life expectancy beyond 6 months a reasonable inference.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT05646862-inc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 22 Sep 2026: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST 24/ALT 19, eGFR 52 (Cockcroft-Gault CrCl ≈ 52 mL/min). PI3Kα-inhibitor protocols also cap glucose and HbA1c, and hers is 6.4% (Aug 2026).",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" },
        { quote: "HbA1c 6.4% (08/2026)", source: "Labs" },
      ],
      actionNeeded: "Check the protocol's fasting glucose and HbA1c limits (hers 6.4%) and renal threshold (CrCl ≈ 52 mL/min)",
    },
    {
      id: "NCT05646862-exc-1",
      status: "pass",
      rationale: "Classic invasive lobular carcinoma (E-cadherin negative), not metaplastic.",
      evidence: [{ quote: "IHC: GATA3+, CK7+, E-cadherin negative.", source: "Pathology 2024-05-29" }],
    },
    {
      id: "NCT05646862-exc-2",
      status: "pass",
      rationale: "No prior PI3K, AKT or mTOR inhibitor.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05646862-exc-3",
      status: "pass",
      rationale:
        "She never had adjuvant CDK4/6i (adjuvant anastrozole alone) and has been treated for metastatic disease, so this exclusion does not describe her.",
      evidence: [{ quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-exc-4",
      status: "pass",
      rationale: "Type 2 diabetes is diet-controlled, with no glucose-lowering medication; HbA1c 6.4% in Aug 2026. No type 1 diabetes.",
      evidence: [{ quote: "T2DM diet-controlled (A1c 6.4% 8/2026)", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "She took oral letrozole and ribociclib for about 27 months; ability to swallow pills is confirmed at screening.",
      evidence: [{ quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No malabsorption, GI surgery or bowel disease in the history.",
    },
    {
      id: "NCT05646862-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is recorded, and she has no neurological symptoms.",
      evidence: [{ quote: "No new weakness, numbness or bowel/bladder sx.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no headache or visual symptoms; brain imaging has never been performed.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Clinic note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05646862-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "No ocular condition is recorded and she reports no visual changes; with diet-controlled diabetes, diabetic retinopathy needing treatment is unlikely but unconfirmed.",
      evidence: [{ quote: "No HA or visual chnages.", source: "Clinic note 2026-09-25" }],
      actionNeeded: "Confirm no active retinopathy or other ocular condition needing treatment (recent eye exam)",
    },
    {
      id: "NCT05646862-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No uveitis or ocular inflammation or infection in the history.",
    },
    {
      id: "NCT05646862-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No supplemental oxygen use is recorded, and she has no lung disease.",
    },
    {
      id: "NCT05646862-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No symptomatic lung disease or pneumonitis; the 9 Sep 2026 PET/CT showed no visceral or lung disease.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT05646862-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease in the past medical history.",
    },
    {
      id: "NCT05646862-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No bowel inflammation or GI symptoms are recorded.",
    },
    {
      id: "NCT05646862-exc-15",
      status: "pass",
      confidence: "medium",
      rationale:
        "No liver disease, no alcohol use, and liver tests are normal (AST 24, ALT 19, bilirubin 0.5, albumin 3.8). Hepatitis serology is not on file.",
      evidence: [
        { quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" },
        { quote: "SH: widowed, lives alone, never smoker, no EtOH.", source: "Clinic note 2026-09-25" },
      ],
      actionNeeded: "Obtain hepatitis B and C serology if required at screening",
    },
    {
      id: "NCT05646862-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No known HIV infection in the past medical history.",
    },
    {
      id: "NCT05646862-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded.",
    },
    {
      id: "NCT05646862-exc-18",
      status: "pass",
      rationale: "No corticosteroids or immunosuppressants on the medication list.",
    },
    {
      id: "NCT05646862-exc-19",
      status: "pass",
      rationale: "On zoledronic acid every 12 weeks (last dose 14 Aug 2026), with no osteonecrosis of the jaw.",
      evidence: [{ quote: "No ONJ.", source: "Clinic note 2026-09-25" }],
    },
    { id: "NCT05646862-exc-20", status: "not-applicable", rationale: MAIN_ONLY },
    {
      id: "NCT05646862-exc-21",
      status: "not-applicable",
      rationale: "Main-study criterion (main-study enrollment is complete), and pregnancy rules cannot apply to a 67-year-old postmenopausal woman.",
    },
    { id: "NCT05646862-exc-22", status: "not-applicable", rationale: MAIN_ONLY },
    { id: "NCT05646862-exc-23", status: "not-applicable", rationale: MAIN_ONLY },
    { id: "NCT05646862-exc-24", status: "not-applicable", rationale: MAIN_ONLY },
    { id: "NCT05646862-exc-25", status: "not-applicable", rationale: MAIN_ONLY },
    {
      id: "NCT05646862-exc-26",
      status: "not-applicable",
      rationale: "Pregnancy and lactation rules cannot apply to a 67-year-old postmenopausal woman.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05646862-exc-27",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection, IV antibiotics or hospitalization is recorded.",
    },
    {
      id: "NCT05646862-exc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational drug has ever been given; all prior therapy is standard of care.",
    },
    {
      id: "NCT05646862-exc-29",
      status: "pass",
      confidence: "medium",
      rationale: "Never exposed to inavolisib or fulvestrant; the only listed allergy is codeine (nausea).",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT05646862-exc-30",
      status: "pass",
      confidence: "medium",
      rationale:
        "Current medications (zoledronic acid, tramadol, escitalopram, calcium/vitamin D) include no CYP2B6, CYP3A4 or CYP2C19 inducer.",
      evidence: [{ quote: "escitalopram 10 mg PO daily", source: "Medication list" }],
      actionNeeded: "Pharmacy review of the medication list, including supplements, against the sub-study's inducer list",
    },
    {
      id: "NCT05646862-exc-31",
      status: "pass",
      confidence: "medium",
      rationale:
        "Ribociclib, a moderate CYP3A4 inhibitor, was stopped 14 Sep 2026 and will be beyond 14 days by sub-study Day -4. Escitalopram and tramadol are not meaningful CYP2B6, CYP3A4 or CYP2C19 inhibitors.",
      evidence: [{ quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" }],
      actionNeeded: "Confirm Day -4 falls ≥ 14 days after the last ribociclib dose (14 Sep 2026); pharmacy review of current medications",
    },
  ],
);
