import { demoMatch } from "../../match-helpers";

const COHORT2 =
  "Applies to Cohort 2 (ER+/HER2-positive, prior anti-HER2 therapy) only; she is HER2 IHC 0 and would be screened for Cohort 1.";
const COHORT2_ARM =
  "Applies to a Cohort 2 (HER2-positive) arm only; she is HER2 IHC 0 and would be screened for Cohort 1.";
const COHORT3 =
  "Applies to Cohort 3 (first-line, PIK3CA-mutated, relapse on or ≤ 12 months after adjuvant ET) only; she would be screened for Cohort 1.";
const INAVO_ARM =
  "Applies to the giredestrant + inavolisib arms, which need a PIK3CA mutation; PIK3CA was not detected on her 9/2026 ctDNA, so she would not be assigned there.";
const STAGE2 =
  "Stage 2 criteria apply only after Stage 1 treatment is stopped; she would be screened for Cohort 1 Stage 1.";

export default demoMatch(
  "NCT04802759",
  "Excluded: Cohort 1 requires a RECIST-measurable lesion and her disease is bone-only",
  "She fits Cohort 1 of this umbrella study (ER+/HER2-negative, progression after ~27 months of first-line letrozole + ribociclib, no prior chemotherapy, fulvestrant or PI3K/AKT/mTOR inhibitor) and would enter Stage 1; the inavolisib arms are closed to her because PIK3CA was not detected. The decisive barrier is that Cohort 1 Stages 1 and 2 require at least one RECIST 1.1 target lesion, and her disease is bone-only without a soft-tissue component. Only new measurable disease would reopen this; HIV/hepatitis serology, the borderline QTcF of 462 ms and tissue suitability would then need checking.",
  [
    {
      id: "NCT04802759-inc-1",
      status: "pass",
      rationale:
        "She fits Cohort 1: ER+/HER2-negative (IHC 0) metastatic breast cancer progressing after first-line letrozole + ribociclib. She does not fit Cohort 2 (HER2-positive) or Cohort 3 (first-line, PIK3CA-mutated).",
      evidence: [
        { quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only, ESR1 Y537S on ctDNA", source: "Clinic note 2026-09-25" },
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT04802759-inc-2",
      status: "pass",
      rationale: "ECOG 1 at the 25 Sep 2026 visit; independent in ADLs, walking limited to about 2 blocks by bone pain.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-inc-3",
      status: "pass",
      rationale: "ER 90% strong on the May 2024 left iliac bone metastasis biopsy (ER 95% on the 2017 primary).",
      evidence: [{ quote: "ER: positive, 90%, strong", source: "Pathology 2024-05-29" }],
    },
    {
      id: "NCT04802759-inc-4",
      status: "pass",
      rationale:
        "Bone-only disease with no visceral involvement, and the treating oncologist lists only endocrine-based options (elacestrant, fulvestrant combination or an oral SERD trial); chemotherapy is not proposed.",
      evidence: [
        {
          quote:
            "Options: elacestrant (ESR1m, >12 mo on prior CDK4/6i) vs fulvestrant-based combination vs clinical trial of next-gen oral SERD.",
          source: "Clinic note 2026-09-25",
        },
        { quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" },
      ],
    },
    {
      id: "NCT04802759-inc-5",
      status: "pass",
      rationale:
        "PET/CT on 9 Sep 2026 showed new osseous lesions (T10, sacrum, right acetabulum) on letrozole + ribociclib, her most recent systemic therapy.",
      evidence: [
        {
          quote: "Progression of osseous metastases: new FDG-avid sclerotic/mixed lesions at T10, sacrum and R acetabulum",
          source: "PET/CT 2026-09-09",
        },
      ],
    },
    {
      id: "NCT04802759-inc-6",
      status: "pass",
      rationale:
        "Progressed on first-line letrozole + ribociclib for metastatic disease after about 27 months of CDK4/6i exposure (6/2024 to 9/2026), well over the 8-week minimum.",
      evidence: [
        {
          quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia) + zoledronic acid, best response SD.",
          source: "Clinic note 2026-09-25",
        },
        { quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT04802759-inc-7",
      status: "pass",
      rationale: "67-year-old woman documented as postmenopausal.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-inc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "Not stated explicitly, but bone-only disease, ECOG 1 and preserved organ function make a life expectancy well beyond 3 months a safe inference.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT04802759-inc-9",
      status: "unknown",
      confidence: "medium",
      rationale:
        "The only metastatic tissue is a decalcified 2024 iliac bone core, which central labs often reject for biomarker work; the 2017 mastectomy block may be usable but its availability is not documented.",
      evidence: [{ quote: "Specimen: Bone, left iliac, CT-guided core biopsy (decalcified)", source: "Pathology 2024-05-29" }],
      actionNeeded:
        "Confirm with the sponsor whether the decalcified iliac core or the 2017 mastectomy block is acceptable; otherwise plan a fresh biopsy",
    },
    {
      id: "NCT04802759-inc-10",
      status: "pass",
      rationale: "Permissive statement; she has never received fulvestrant, so nothing here limits her.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT04802759-inc-11",
      status: "fail",
      rationale:
        "Disease is bone-only and documented as not RECIST 1.1-measurable; the 2.3 cm lytic component of the left iliac lesion has no soft-tissue mass, so it cannot serve as a target lesion.",
      evidence: [
        { quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Clinic note 2026-09-25" },
        {
          quote: "Mixed lytic/sclerotic L iliac lesion, lytic component 2.3 cm, no extraosseous soft tissue component.",
          source: "PET/CT 2026-09-09",
        },
      ],
    },
    {
      id: "NCT04802759-inc-12",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 22 Sep 2026: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST 24/ALT 19. CKD 3a with eGFR 52; Cockcroft-Gault CrCl ≈ 52 mL/min (67 y, 66 kg, Cr 1.1), just above a typical 50 mL/min floor.",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L) | K 4.2 | Mg 1.9 | Ca 9.4", source: "Labs 2026-09-22" },
        { quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check the protocol renal threshold; calculated CrCl ≈ 52 mL/min would fail a ≥ 60 mL/min requirement",
    },
    {
      id: "NCT04802759-inc-13",
      status: "not-applicable",
      rationale:
        "She is not on therapeutic anticoagulation (medications: zoledronic acid, tramadol, escitalopram, calcium/vitamin D), so the stable-regimen requirement does not apply.",
    },
    { id: "NCT04802759-inc-14", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-15", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-16", status: "not-applicable", rationale: COHORT2 },
    {
      id: "NCT04802759-inc-17",
      status: "not-applicable",
      rationale:
        "Defines Cohort 2 (HER2-positive). She is HER2 IHC 0 on both specimens and belongs to Cohort 1, so this does not count against her.",
      evidence: [{ quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" }],
    },
    { id: "NCT04802759-inc-18", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-19", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-20", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-21", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-22", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-23", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-24", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-25", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-inc-26", status: "not-applicable", rationale: STAGE2 },
    { id: "NCT04802759-inc-27", status: "not-applicable", rationale: STAGE2 },
    { id: "NCT04802759-inc-28", status: "not-applicable", rationale: STAGE2 },
    { id: "NCT04802759-inc-29", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-30", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-31", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-32", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-33", status: "not-applicable", rationale: COHORT3 },
    {
      id: "NCT04802759-inc-34",
      status: "not-applicable",
      rationale:
        "Cohort 3 only. She would not qualify for it anyway: she relapsed in May 2024, about 19 months after finishing adjuvant anastrozole (10/2022), and has since had first-line therapy.",
      evidence: [{ quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Clinic note 2026-09-25" }],
    },
    { id: "NCT04802759-inc-35", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-36", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-inc-37", status: "not-applicable", rationale: COHORT3 },
    {
      id: "NCT04802759-inc-38",
      status: "not-applicable",
      rationale: "Cohort 3 only. PIK3CA was not detected on her 9/2026 ctDNA, which also rules her out of that cohort.",
      evidence: [{ quote: "PIK3CA, AKT1, PTEN: not detected", source: "Guardant360 2026-09-23" }],
    },
    {
      id: "NCT04802759-exc-1",
      status: "pass",
      rationale:
        "Heading for the general Stage 1 exclusions in Cohorts 1 and 2. They apply to her as a Cohort 1 candidate and are assessed one by one below.",
    },
    {
      id: "NCT04802759-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "No prior giredestrant, abemaciclib, ipatasertib, inavolisib, everolimus, samuraciclib or atezolizumab. Her prior ribociclib (2024–2026) is expected in Cohort 1, which requires CDK4/6i exposure, but may close the giredestrant + ribociclib arm.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
      actionNeeded: "Confirm with the sponsor that prior ribociclib excludes her only from the giredestrant + ribociclib arm",
    },
    {
      id: "NCT04802759-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "All prior therapy is standard of care (adjuvant anastrozole, then letrozole + ribociclib); no investigational agent is recorded.",
    },
    {
      id: "NCT04802759-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole + ribociclib stopped 14 Sep 2026, 14 days before 28 Sep; Cycle 1 Day 1 would fall later, beyond both 2 weeks and 5 half-lives (ribociclib t½ ≈ 32 h, letrozole ≈ 2 days). The A/P's 'Continue ribociclib' line is a stale copy-forward.",
      evidence: [
        { quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" },
        { quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" },
      ],
      actionNeeded: "Confirm 14 Sep 2026 as the last ribociclib/letrozole dose",
    },
    {
      id: "NCT04802759-exc-5",
      status: "pass",
      rationale:
        "Current medications (zoledronic acid, tramadol, escitalopram, calcium/vitamin D) include no strong CYP3A4 inhibitor or inducer; ribociclib, a moderate CYP3A4 inhibitor, was stopped 14 Sep 2026.",
      evidence: [{ quote: "escitalopram 10 mg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT04802759-exc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "The 2024 grade 3 neutropenia on ribociclib has recovered: ANC 1.7, WBC 3.6 and Hgb 11.4 on 22 Sep 2026 are grade ≤ 1. No other unresolved toxicity is recorded.",
      evidence: [{ quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT04802759-exc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "She is not limited to the control arm. None of the arm-specific exclusions for the abemaciclib, ipatasertib, ribociclib, samuraciclib or atezolizumab arms is triggered on the record; only the PIK3CA-mutant inavolisib arms are closed to her.",
    },
    {
      id: "NCT04802759-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or solid organ transplant in the past medical history.",
    },
    {
      id: "NCT04802759-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her only operation was the 2017 mastectomy; the 2024 bone biopsy was diagnostic. No surgery is planned, and no impending fracture is described (lower-limb strength 5/5).",
      evidence: [{ quote: "LE strength 5/5, no sensory level.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded; the family history of colon cancer is her mother's.",
      evidence: [{ quote: "FHx: mother colon ca at 80.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "PET/CT on 9 Sep 2026 showed bone-only disease without visceral or soft-tissue involvement, and no effusion or drainage procedure is recorded.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT04802759-exc-12",
      status: "pass",
      confidence: "medium",
      rationale:
        "Bone pain is 3–4/10 on tramadol once or twice a day, which is controlled; the investigator will reassess given the recent progression.",
      evidence: [{ quote: "Pain L hip/low back 3-4/10, tramadol 1-2x/day", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-13",
      status: "pass",
      rationale: "Calcium 9.4 mg/dL with albumin 3.8 on 22 Sep 2026 is normal; she is on zoledronic acid.",
      evidence: [{ quote: "Cr 1.1 | eGFR 52 (L) | K 4.2 | Mg 1.9 | Ca 9.4", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT04802759-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known CNS metastases and no headache, visual or focal neurological symptoms. Brain imaging has never been done, so this rests on the absence of symptoms.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Clinic note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Clinic note 2026-09-25" },
      ],
      actionNeeded: "Obtain brain MRI if the protocol mandates baseline CNS imaging",
    },
    {
      id: "NCT04802759-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is recorded, and she has no neurological symptoms.",
      evidence: [{ quote: "No new weakness, numbness or bowel/bladder sx.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis in the history or problem list, and no pulmonary findings on the 9 Sep 2026 PET/CT.",
    },
    {
      id: "NCT04802759-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No severe infection or hospitalization is recorded in the past 4 weeks.",
    },
    {
      id: "NCT04802759-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No antibiotics on the current medication list and no recent infection documented.",
    },
    {
      id: "NCT04802759-exc-19",
      status: "pass",
      confidence: "medium",
      rationale:
        "No history of pneumonitis, organizing pneumonia or pulmonary fibrosis; the 9 Sep 2026 PET/CT reported no lung abnormality. The screening chest CT will confirm.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT04802759-exc-20",
      status: "pass",
      confidence: "medium",
      rationale:
        "No cardiac history on the problem list; ECG 17 Sep 2026 showed sinus rhythm with QTcF 462 ms on escitalopram. No echocardiogram has ever been done, so cardiac function is unmeasured.",
      evidence: [
        { quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" },
        { quote: "No echocardiogram on file.", source: "Record" },
      ],
      actionNeeded: "Repeat ECG off ribociclib; obtain an echocardiogram if the protocol requires LVEF ≥ 50%",
    },
    {
      id: "NCT04802759-exc-21",
      status: "unknown",
      confidence: "low",
      rationale: "HIV status is not documented; no HIV test is on file.",
      actionNeeded: "Obtain HIV serology at screening; a positive result excludes",
    },
    {
      id: "NCT04802759-exc-22",
      status: "unknown",
      confidence: "low",
      rationale:
        "Hepatitis B and C serology are not documented. Transaminases are normal (AST 24, ALT 19), which argues against active hepatitis but does not exclude infection.",
      evidence: [{ quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" }],
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody, with HBV DNA or HCV RNA if any is positive",
    },
    {
      id: "NCT04802759-exc-23",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease, chronic diarrhea or GI surgery in the history.",
    },
    {
      id: "NCT04802759-exc-24",
      status: "pass",
      confidence: "medium",
      rationale:
        "The only recorded allergy is codeine (nausea, an intolerance). She took ribociclib for about 27 months without hypersensitivity and has never received the other study drugs.",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT04802759-exc-25",
      status: "pass",
      rationale: "HER2 IHC 0 on both the 2024 bone metastasis and the 2017 primary, and no ERBB2 alteration on ctDNA.",
      evidence: [
        { quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" },
        { quote: "ERBB2: no alterations detected", source: "Guardant360 2026-09-23" },
      ],
    },
    {
      id: "NCT04802759-exc-26",
      status: "pass",
      rationale: "No hormone replacement therapy on the medication list.",
      evidence: [{ quote: "calcium + vitamin D3 daily", source: "Medication list" }],
    },
    {
      id: "NCT04802759-exc-27",
      status: "pass",
      rationale: "No chemotherapy for metastatic disease; Oncotype RS 14 also spared her adjuvant chemotherapy in 2017.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    { id: "NCT04802759-exc-28", status: "not-applicable", rationale: COHORT2 },
    { id: "NCT04802759-exc-29", status: "not-applicable", rationale: COHORT2 },
    {
      id: "NCT04802759-exc-30",
      status: "pass",
      confidence: "medium",
      rationale:
        "Heading for the abemaciclib-arm exclusions. She could be randomized to these Cohort 1 arms, and none of the listed items (ILD, GI resection or diarrhea, cardiac syncope or arrhythmia) is documented.",
    },
    {
      id: "NCT04802759-exc-31",
      status: "pass",
      confidence: "medium",
      rationale: "No interstitial lung disease, dyspnoea at rest or oxygen use is recorded.",
    },
    {
      id: "NCT04802759-exc-32",
      status: "pass",
      confidence: "medium",
      rationale: "No gastric or small-bowel resection and no chronic diarrhea in the history.",
    },
    {
      id: "NCT04802759-exc-33",
      status: "pass",
      confidence: "medium",
      rationale: "No syncope, ventricular arrhythmia or cardiac arrest in the history; ECG 17 Sep 2026 showed sinus rhythm.",
      evidence: [{ quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" }],
    },
    {
      id: "NCT04802759-exc-34",
      status: "pass",
      confidence: "medium",
      rationale:
        "Heading for the ipatasertib-arm exclusions. She could be randomized to this arm; the lipid and ECG items below still need checking.",
    },
    {
      id: "NCT04802759-exc-35",
      status: "pass",
      rationale: "No prior AKT inhibitor.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT04802759-exc-36",
      status: "pass",
      confidence: "medium",
      rationale: "She took oral letrozole and ribociclib for about 27 months and has no recorded malabsorption.",
      evidence: [{ quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-37",
      status: "unknown",
      confidence: "low",
      rationale:
        "No lipid panel is on file. Hyperlipidaemia is not on the problem list, but she is a 67-year-old with type 2 diabetes and no statin.",
      actionNeeded: "Obtain fasting lipids; uncontrolled grade ≥ 2 (cholesterol or triglycerides > 300 mg/dL) excludes from the ipatasertib arm",
    },
    {
      id: "NCT04802759-exc-38",
      status: "pass",
      rationale: "Type 2 diabetes is diet-controlled (HbA1c 6.4%, Aug 2026) and has never needed insulin.",
      evidence: [{ quote: "T2DM diet-controlled (A1c 6.4% 8/2026)", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT04802759-exc-39",
      status: "unknown",
      confidence: "medium",
      rationale:
        "QTcF 462 ms on 17 Sep 2026 (440–455 on ribociclib), recorded 3 days after the last ribociclib dose while on escitalopram. It is mildly prolonged for a woman, and whether it is clinically significant is the investigator's call.",
      evidence: [{ quote: "QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram.", source: "Clinic note 2026-09-25" }],
      actionNeeded: "Repeat ECG ≥ 2 weeks off ribociclib; consider switching escitalopram to sertraline, as the note suggests",
    },
    { id: "NCT04802759-exc-40", status: "not-applicable", rationale: INAVO_ARM },
    { id: "NCT04802759-exc-41", status: "not-applicable", rationale: INAVO_ARM },
    { id: "NCT04802759-exc-42", status: "not-applicable", rationale: INAVO_ARM },
    {
      id: "NCT04802759-exc-43",
      status: "not-applicable",
      rationale:
        "Applies to the inavolisib arms only, which she would not enter (PIK3CA not detected). Her HbA1c of 6.4% (Aug 2026) would otherwise need a fasting glucose check.",
      evidence: [{ quote: "HbA1c 6.4% (08/2026)", source: "Labs" }],
    },
    { id: "NCT04802759-exc-44", status: "not-applicable", rationale: INAVO_ARM },
    { id: "NCT04802759-exc-45", status: "not-applicable", rationale: INAVO_ARM },
    { id: "NCT04802759-exc-46", status: "not-applicable", rationale: INAVO_ARM },
    {
      id: "NCT04802759-exc-47",
      status: "not-applicable",
      rationale:
        "Arm-specific biomarker gate for the inavolisib arms. PIK3CA was not detected on ctDNA (9/2026), so she would be assigned to another Cohort 1 arm instead.",
      evidence: [{ quote: "PIK3CA, AKT1, PTEN: not detected", source: "Guardant360 2026-09-23" }],
    },
    {
      id: "NCT04802759-exc-48",
      status: "not-applicable",
      rationale:
        "Applies to the ESR1m-enriched inavolisib arm only. She has ESR1 Y537S, but that arm also requires a PIK3CA mutation, which was not detected.",
      evidence: [{ quote: "ESR1 p.Y537S, VAF 2.1%", source: "Guardant360 2026-09-23" }],
    },
    {
      id: "NCT04802759-exc-49",
      status: "pass",
      confidence: "medium",
      rationale:
        "Heading for the giredestrant + ribociclib arm. Neither listed exclusion is triggered, although her prior ribociclib may close this arm (see the prior-treatment criterion).",
    },
    {
      id: "NCT04802759-exc-50",
      status: "pass",
      rationale: "No systemic corticosteroids on the medication list.",
      evidence: [{ quote: "tramadol 50 mg PO q6h prn pain", source: "Medication list" }],
    },
    {
      id: "NCT04802759-exc-51",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease or malabsorption is recorded, and she absorbed oral endocrine therapy for years.",
    },
    {
      id: "NCT04802759-exc-52",
      status: "pass",
      confidence: "medium",
      rationale: "Heading for the samuraciclib-arm exclusions. She could be randomized to this arm, and none of the listed items is documented.",
    },
    {
      id: "NCT04802759-exc-53",
      status: "pass",
      rationale: "No prior mTOR inhibitor (everolimus).",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT04802759-exc-54",
      status: "pass",
      rationale: "No systemic corticosteroids on the current medication list.",
    },
    {
      id: "NCT04802759-exc-55",
      status: "pass",
      confidence: "medium",
      rationale: "No bleeding disorder is recorded; platelets 168 on 22 Sep 2026.",
      evidence: [{ quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT04802759-exc-56",
      status: "pass",
      confidence: "medium",
      rationale:
        "No hemolytic anemia or marrow aplasia. The mild anemia (Hgb 11.4) and 2024 neutropenia are consistent with ribociclib and bone metastases.",
    },
    {
      id: "NCT04802759-exc-57",
      status: "pass",
      confidence: "low",
      rationale: "No recent vaccination is recorded; live-virus vaccines are uncommon at her age. Confirm at screening.",
      actionNeeded: "Confirm no live-virus vaccine within 28 days before the planned start",
    },
    {
      id: "NCT04802759-exc-58",
      status: "pass",
      confidence: "medium",
      rationale: "Heading for the atezolizumab-containing arms. She could be randomized to these, and none of the listed immune or cardiac items is documented.",
    },
    {
      id: "NCT04802759-exc-59",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease or immune deficiency on the problem list (CKD 3a, diet-controlled T2DM, osteoporosis, depression).",
      evidence: [
        {
          quote: "PMH: CKD 3a, T2DM diet-controlled (A1c 6.4% 8/2026), osteoporosis (DEXA 2021 T-score -2.6), depression.",
          source: "Clinic note 2026-09-25",
        },
      ],
    },
    {
      id: "NCT04802759-exc-60",
      status: "pass",
      confidence: "medium",
      rationale: "No heart failure, MI, stroke, angina or arrhythmia is recorded; BP 136/82 and sinus rhythm.",
      evidence: [{ quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" }],
    },
    {
      id: "NCT04802759-exc-61",
      status: "pass",
      confidence: "low",
      rationale: "No live attenuated vaccine is recorded or planned. Confirm at screening.",
      actionNeeded: "Confirm no live attenuated vaccine within 4 weeks before treatment",
    },
    {
      id: "NCT04802759-exc-62",
      status: "pass",
      rationale: "No immunostimulatory agents (interferon, IL-2) have ever been given, and none is on the medication list.",
    },
    {
      id: "NCT04802759-exc-63",
      status: "pass",
      rationale: "No systemic immunosuppressive medication on the current list.",
    },
    {
      id: "NCT04802759-exc-64",
      status: "pass",
      confidence: "medium",
      rationale: "She has never received a monoclonal antibody or fusion protein, and her only listed allergy is codeine.",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT04802759-exc-65",
      status: "pass",
      confidence: "medium",
      rationale: "No recombinant antibody exposure and no recorded hypersensitivity apart from codeine intolerance.",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT04802759-exc-66",
      status: "pass",
      confidence: "medium",
      rationale: "Her complete treatment history (anastrozole, then letrozole + ribociclib) contains no checkpoint inhibitor or CD137 agonist.",
    },
    {
      id: "NCT04802759-exc-67",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding rules cannot apply to a 67-year-old postmenopausal woman.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    { id: "NCT04802759-exc-68", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-69", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-70", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-71", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-72", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-73", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-74", status: "not-applicable", rationale: COHORT2_ARM },
    { id: "NCT04802759-exc-75", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-76", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-77", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-78", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-79", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-80", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-81", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-82", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-83", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-84", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-85", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-86", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-87", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-88", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-89", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-90", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-91", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-92", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-93", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-94", status: "not-applicable", rationale: COHORT3 },
    { id: "NCT04802759-exc-95", status: "not-applicable", rationale: COHORT3 },
  ],
);
