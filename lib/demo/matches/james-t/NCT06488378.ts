import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const GEN = "Germline panel 2021-06";
const NGS = "Tissue NGS 2025-02-12";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medication list";

export default demoMatch(
  "NCT06488378",
  "Meets gBRCA2, HER2-low and PARP-naive criteria · leuprolide washout and ECG to settle",
  "A strong fit: HR+/HER2-low (IHC 1+/ISH-) metastatic breast cancer with a pathogenic germline BRCA2 variant, PARP inhibitor-naive, no metastatic chemotherapy, measurable disease, ECOG 1 and adequate labs, and the olaparib backbone matches his oncologist's planned second line. The investigator must document that further endocrine therapy is not appropriate (he has not had fulvestrant), and the protocol requires endocrine therapy to stop ≥ 7 days before C1D1, which conflicts with the plan to continue leuprolide. A screening ECG, PI acceptance of his GG1 prostate cancer and agreement to three research biopsies complete screening.",
  [
    {
      id: "NCT06488378-inc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "HER2-low (IHC 1+/ISH-) HR+ metastatic disease with known ER/PR; progressed on adjuvant tamoxifen and first-line AI + CDK4/6i, and the 2L plan is a PARP inhibitor rather than more endocrine therapy. Fulvestrant has not been used, so non-candidacy for further ET must be documented.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
      ],
      actionNeeded: "Investigator to document that further endocrine-based therapy (e.g., fulvestrant-based) is not appropriate.",
    },
    {
      id: "NCT06488378-inc-2",
      status: "pass",
      rationale:
        "Germline BRCA2 c.5946delT (p.Ser1982ArgfsTer22), reported pathogenic on a 2021 germline panel and confirmed in tumor with loss of heterozygosity.",
      evidence: [
        { quote: "BRCA2 c.5946delT (p.Ser1982ArgfsTer22) - PATHOGENIC", source: GEN },
        { quote: "BRCA2 c.5946delT, VAF 81% - germline variant w/ loss of heterozygosity", source: NGS },
      ],
    },
    {
      id: "NCT06488378-inc-3",
      status: "pass",
      rationale:
        "Measurable disease (RUL nodule 1.6 cm, right hilar node 1.7 cm short axis), both right-sided and outside the 2021 left chest-wall radiation field.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT06488378-inc-4",
      status: "pass",
      rationale: "No cytotoxic chemotherapy, ADC or checkpoint inhibitor for metastatic disease, well within the limit of 2; endocrine + CDK4/6 inhibitor therapy does not count.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT06488378-inc-5",
      status: "pass",
      rationale: "Age 61 (born 1965), above the 18-year minimum.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06488378-inc-6",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit, within the ≤ 2 limit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06488378-inc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 2026-09-22: WBC 4.2, ANC 1.7, platelets 190, bilirubin 0.7, AST 26, ALT 31 all meet limits. Weight is not recorded for Cockcroft-Gault, but at age 61 and creatinine 1.1, CrCl ≈ weight in kg, so ≥ 51 for any weight ≥ 51 kg (eGFR 74).",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "Cr 1.1 | eGFR 74", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
      actionNeeded: "Record weight and calculate Cockcroft-Gault CrCl at screening (≥ 51 mL/min).",
    },
    {
      id: "NCT06488378-inc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Applies to HBsAg-positive participants; no hepatitis B history is recorded and screening is not required without one.",
    },
    {
      id: "NCT06488378-inc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Applies to a history of hepatitis C; none is recorded and testing is not required without one.",
    },
    {
      id: "NCT06488378-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Applies to participants living with HIV; no HIV infection is recorded.",
    },
    {
      id: "NCT06488378-inc-11",
      status: "not-applicable",
      rationale: "CD4 requirement for participants on antiretroviral therapy; no antiretroviral is on his medication list.",
    },
    {
      id: "NCT06488378-inc-12",
      status: "not-applicable",
      rationale: "Virologic-suppression requirement for participants on antiretroviral therapy; he takes no antiretrovirals.",
    },
    {
      id: "NCT06488378-inc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No AIDS-defining or other opportunistic infection is recorded in the past 12 months.",
    },
    {
      id: "NCT06488378-inc-14",
      status: "not-applicable",
      rationale: "Stable-regimen requirement applies to participants on antiretroviral therapy; he takes none.",
    },
    {
      id: "NCT06488378-inc-15",
      status: "not-applicable",
      rationale: "Antiretroviral drug-interaction rule applies only to participants on antiretroviral therapy; he takes none.",
    },
    {
      id: "NCT06488378-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "Took oral abemaciclib and letrozole for about 19 months alongside other daily oral medications; no swallowing or retention problem recorded.",
      evidence: [{ quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT06488378-inc-17",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for treated CNS metastases; none are known (asymptomatic, nonfocal), though the brain has never been imaged.",
      evidence: [
        { quote: "No HA, visual change or focal weakness.", source: NOTE },
        { quote: "Has never had brain imaging.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if required for baseline staging.",
    },
    {
      id: "NCT06488378-inc-18",
      status: "pass",
      confidence: "medium",
      rationale:
        "Concurrent prostate cancer is low risk (Gleason 3+3=6, GG1), untreated on active surveillance, and unlikely to interfere with safety or efficacy assessment.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Confirm with the sponsor-investigator that GG1 prostate cancer on active surveillance is acceptable.",
    },
    {
      id: "NCT06488378-inc-19",
      status: "not-applicable",
      rationale: "Postmenopausal status and pregnancy testing apply to female participants; he is a man.",
    },
    {
      id: "NCT06488378-inc-20",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to contraception for 4 months after treatment (men with partners of childbearing potential) is confirmed at screening; vasectomy 2005.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06488378-inc-21",
      status: "pass",
      confidence: "low",
      rationale:
        "Willingness for three research biopsies is confirmed at consent. His measurable lesions (RUL nodule, right hilar node) are also the most accessible biopsy sites, so the sponsor-investigator may need to approve forgoing them.",
      actionNeeded: "Confirm willingness for 3 research biopsies; seek sponsor-investigator waiver if only measurable lesions are accessible.",
    },
    {
      id: "NCT06488378-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT06488378-exc-1",
      status: "pass",
      rationale: "He has never received a PARP inhibitor.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT06488378-exc-2",
      status: "pass",
      rationale: "His treatment history (ddAC-T, PMRT, tamoxifen, letrozole + leuprolide + abemaciclib) contains no CSF1R antibody.",
    },
    {
      id: "NCT06488378-exc-3",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Letrozole stopped 2026-09-15 clears the 7-day endocrine washout (and the 3-week window on 10/6 if abemaciclib counts as systemic therapy), but leuprolide is being continued (depot 2026-08-14, active to mid-November) and endocrine therapy must be discontinued. Denosumab may continue.",
      evidence: [
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
        { quote: "3. Continue leuprolide 22.5 mg q3 mo for now; testosterone castrate.", source: NOTE },
      ],
      actionNeeded: "Decide with the PI whether leuprolide stops (no depot after 8/14/2026) or may continue; endocrine therapy must stop ≥ 7 days before C1D1.",
    },
    {
      id: "NCT06488378-exc-4",
      status: "pass",
      rationale: "No residual toxicity above grade 1: abemaciclib diarrhea resolved after it was stopped on 2026-09-15.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06488378-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies recorded, and he has never received axatilimab or olaparib.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT06488378-exc-6",
      status: "pass",
      rationale:
        "No strong or moderate CYP450 inhibitor or inducer: current medications are leuprolide, denosumab, lisinopril, rosuvastatin and calcium/vitamin D.",
      evidence: [
        { quote: "lisinopril 20 mg PO daily", source: MEDS },
        { quote: "rosuvastatin 10 mg PO daily", source: MEDS },
      ],
    },
    {
      id: "NCT06488378-exc-7",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG is documented, so QTcF cannot be assessed.",
      actionNeeded: "Obtain screening ECG; QTcF must be ≤ 470 ms.",
    },
    {
      id: "NCT06488378-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No MDS/AML history and no suggestive features: WBC 4.2, ANC 1.7, platelets 190, with mild anemia (Hgb 11.8). Prior doxorubicin/cyclophosphamide raises background risk, so counts merit monitoring on olaparib.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06488378-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disorder or bowel resection affecting absorption; abdomen benign and he took oral abemaciclib for about 19 months.",
      evidence: [{ quote: "Abd benign.", source: NOTE }],
    },
    {
      id: "NCT06488378-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled (BP 138/82 on lisinopril); no active infection, heart failure, angina, arrhythmia or psychiatric illness recorded.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE },
      ],
    },
    {
      id: "NCT06488378-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis/ILD history, and CT 2026-09-11 reports nodules and a hilar node without interstitial change.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
      ],
    },
    {
      id: "NCT06488378-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No known active or latent tuberculosis is recorded.",
    },
    {
      id: "NCT06488378-exc-13",
      status: "pass",
      rationale: "Surgical history is the 2021 mastectomy/ALND and a 2005 vasectomy; no surgery in the past 28 days.",
      evidence: [{ quote: "PSH: as above. Vasectomy 2005.", source: NOTE }],
    },
  ],
);
