import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05696626",
  "Excluded: requires a RECIST-measurable lesion, and her disease is bone-only",
  "Biologically she is the population this study targets: ER+/HER2-negative, ESR1 Y537S on ctDNA, progression on a first-line AI + ribociclib after about 27 months, and no prior abemaciclib, fulvestrant or SERD. The protocol, however, requires at least one RECIST 1.1-measurable lesion, and her disease is bone-only with no soft-tissue component. Only a new measurable lesion would change this. A fasting lipid panel would then be needed, and the fulvestrant arm (intramuscular) runs against her stated preference for oral treatment.",
  [
    {
      id: "NCT05696626-inc-1",
      status: "pass",
      rationale: "Postmenopausal woman, aged 67.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-inc-2",
      status: "pass",
      rationale:
        "ER+ metastatic disease with radiological progression (PET/CT 9 Sep 2026) on letrozole + ribociclib, her first hormonal treatment for metastatic disease.",
      evidence: [
        { quote: "PET/CT 9/9/26 w/ bone PD (new T10, sacrum, R acetabulum), no visceral dz", source: "Clinic note 2026-09-25" },
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05696626-inc-3",
      status: "pass",
      rationale: "Histologically confirmed on the May 2024 iliac biopsy: ER 90% strong, HER2 IHC 0.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Pathology 2024-05-29" },
        { quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" },
      ],
    },
    {
      id: "NCT05696626-inc-4",
      status: "pass",
      rationale:
        "On letrozole + ribociclib from June 2024 with best response stable disease until progression in Sep 2026, about 27 months without progression.",
      evidence: [
        {
          quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia) + zoledronic acid, best response SD.",
          source: "Clinic note 2026-09-25",
        },
      ],
    },
    {
      id: "NCT05696626-inc-5",
      status: "pass",
      rationale: "ESR1 Y537S, a ligand-binding-domain point mutation, was detected on Guardant360 ctDNA collected 16 Sep 2026.",
      evidence: [{ quote: "ESR1 p.Y537S, VAF 2.1%", source: "Guardant360 2026-09-23" }],
    },
    {
      id: "NCT05696626-inc-6",
      status: "fail",
      rationale:
        "Disease is bone-only and documented as not RECIST 1.1-measurable; the left iliac lesion's 2.3 cm lytic component has no soft-tissue mass, so there is no measurable lesion.",
      evidence: [
        { quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Clinic note 2026-09-25" },
        {
          quote: "Mixed lytic/sclerotic L iliac lesion, lytic component 2.3 cm, no extraosseous soft tissue component.",
          source: "PET/CT 2026-09-09",
        },
      ],
    },
    {
      id: "NCT05696626-inc-7",
      status: "pass",
      rationale: "Permissive: one prior chemotherapy regimen is allowed, and she has had none in the metastatic setting.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05696626-inc-8",
      status: "pass",
      rationale: "ECOG 1 on 25 Sep 2026.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-inc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 22 Sep 2026: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST 24/ALT 19. CKD 3a with eGFR 52 (Cockcroft-Gault CrCl ≈ 52 mL/min) meets usual thresholds; protocol limits are not given.",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L) | K 4.2 | Mg 1.9 | Ca 9.4", source: "Labs 2026-09-22" },
        { quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check renal function against the protocol's organ-function table (CrCl ≈ 52 mL/min)",
    },
    {
      id: "NCT05696626-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "She took oral letrozole and ribociclib tablets for about 27 months.",
      evidence: [{ quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-inc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases and no headache or visual symptoms, so the conditions for treated brain metastases do not come into play. Brain imaging has never been done.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Clinic note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05696626-inc-12",
      status: "pass",
      confidence: "low",
      rationale: "She is open to trials and was referred to the research coordinator; consent is confirmed at screening.",
      evidence: [{ quote: "Pt prefers oral tx, open to trials -> research coordinator.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-inc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her most recent biopsy (left iliac bone, May 2024) confirms ER+/HER2-negative disease, which satisfies the fallback if a fresh biopsy is not feasible.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Pathology 2024-05-29" },
        { quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" },
      ],
      actionNeeded: "Decide whether a fresh metastatic biopsy is safe and feasible; otherwise submit the 2024 iliac biopsy results",
    },
    {
      id: "NCT05696626-exc-1",
      status: "pass",
      rationale: "No lung involvement; PET/CT on 9 Sep 2026 showed no visceral, nodal or soft-tissue disease.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT05696626-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or pneumonitis on any prior therapy is recorded.",
    },
    {
      id: "NCT05696626-exc-3",
      status: "pass",
      rationale: "No visceral crisis: disease is bone-only, organ function is preserved, and endocrine therapy is planned.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT05696626-exc-4",
      status: "pass",
      rationale: "No prior abemaciclib, fulvestrant or any SERD; her CDK4/6 inhibitor was ribociclib.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT05696626-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Never exposed to fulvestrant; the only listed allergy is codeine (nausea).",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT05696626-exc-6",
      status: "pass",
      rationale: "Last radiotherapy was a single 8 Gy fraction to the left hip in July 2024, more than 2 years ago.",
      evidence: [{ quote: "Palliative RT L hip 8 Gy x1 7/2024.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No RB1 alteration is reported on the Sep 2026 ctDNA excerpt, and RB1 screening is not required.",
    },
    {
      id: "NCT05696626-exc-8",
      status: "pass",
      rationale: "QTcF 462 ms on 17 Sep 2026, below the > 480 ms cut-off, and no long-QT syndrome in the history.",
      evidence: [{ quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" }],
    },
    {
      id: "NCT05696626-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No PE, DVT or thrombophilia in the history, and she is not on anticoagulation.",
    },
    {
      id: "NCT05696626-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "No heart failure, and she is not immobilised: she walks about 2 blocks, uses a cane outdoors and is independent in ADLs.",
      evidence: [{ quote: "walking limited to ~2 blocks, cane outdoors, independant in ADLs", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-exc-11",
      status: "pass",
      rationale:
        "Current medications (zoledronic acid, tramadol, escitalopram, calcium/vitamin D) include no strong CYP3A4 inhibitor; ribociclib stopped 14 Sep 2026.",
      evidence: [{ quote: "escitalopram 10 mg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT05696626-exc-12",
      status: "pass",
      rationale: "No strong or moderate CYP3A4 inducer on the current medication list.",
      evidence: [{ quote: "tramadol 50 mg PO q6h prn pain", source: "Medication list" }],
    },
    {
      id: "NCT05696626-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her comorbidities (stable CKD 3a, diet-controlled T2DM, osteoporosis, treated depression) should not compromise safety, and there is no malabsorption.",
      evidence: [
        {
          quote: "PMH: CKD 3a, T2DM diet-controlled (A1c 6.4% 8/2026), osteoporosis (DEXA 2021 T-score -2.6), depression.",
          source: "Clinic note 2026-09-25",
        },
      ],
    },
    {
      id: "NCT05696626-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection, and no IV antibiotics or antifungals are recorded.",
    },
    {
      id: "NCT05696626-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No known HIV, hepatitis B or hepatitis C infection in the history, and liver tests are normal (AST 24, ALT 19).",
      evidence: [{ quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT05696626-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded.",
    },
    {
      id: "NCT05696626-exc-17",
      status: "not-applicable",
      rationale: "Pregnancy testing applies only to premenopausal women; she is 67 and postmenopausal.",
    },
    {
      id: "NCT05696626-exc-18",
      status: "not-applicable",
      rationale: "Applies to premenopausal women and men; she is a postmenopausal woman.",
    },
    {
      id: "NCT05696626-exc-19",
      status: "not-applicable",
      rationale: "Breastfeeding cannot apply to a 67-year-old postmenopausal woman.",
    },
    {
      id: "NCT05696626-exc-20",
      status: "pass",
      confidence: "medium",
      rationale: "Good adherence history: she completed 5 years of adjuvant anastrozole and about 27 months of letrozole + ribociclib.",
      evidence: [{ quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-exc-21",
      status: "pass",
      confidence: "low",
      rationale:
        "She is open to trials. Note her stated preference for oral treatment, since one arm gives intramuscular fulvestrant. Confirmed at screening.",
      evidence: [{ quote: "Pt prefers oral tx, open to trials -> research coordinator.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT05696626-exc-22",
      status: "pass",
      confidence: "medium",
      rationale: "No current or recent investigational drug or device; all prior therapy is standard of care.",
    },
    {
      id: "NCT05696626-exc-23",
      status: "pass",
      confidence: "medium",
      rationale:
        "No familial hypertriglyceridaemia or lipid disorder on the problem list. A screening triglyceride level > 880 mg/dL would be unexpected, but no lipid panel is on file.",
      actionNeeded: "Obtain fasting lipid panel at screening",
    },
    {
      id: "NCT05696626-exc-24",
      status: "unknown",
      confidence: "low",
      rationale:
        "No lipid panel is on file. Moderately raised triglycerides are plausible in a 67-year-old with type 2 diabetes who takes no statin.",
      actionNeeded: "Obtain fasting triglycerides; must be ≤ 300 mg/dL (retest allowed after diet or treatment)",
    },
    {
      id: "NCT05696626-exc-25",
      status: "pass",
      confidence: "medium",
      rationale:
        "No hypercholesterolaemia on the problem list. A fasting cholesterol > 400 mg/dL would be unusual without a known lipid disorder, but no lipid panel is on file.",
      actionNeeded: "Obtain fasting cholesterol at screening; must be ≤ 400 mg/dL",
    },
  ],
);
