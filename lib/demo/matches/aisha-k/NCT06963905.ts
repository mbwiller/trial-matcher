import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-11-25";
const CT = "CT CAP 2026-09-15";
const LABS = "Labs 2026-09-23";

export default demoMatch(
  "NCT06963905",
  "Built for her: second line after chemo-immunotherapy, ADC-naive · LVEF and pregnancy test needed",
  "Aisha matches this second-line design closely: metastatic TNBC (HER2 IHC 0), exactly one prior metastatic line that combined chemotherapy with pembrolizumab, radiological progression on CT 2026-09-15, and no prior sacituzumab govitecan, TROP2 ADC or LAG-3 agent. ECOG 1, 2026-09-23 labs, controlled HBV (HBsAg negative, DNA undetectable) and replacement-only hypothyroidism all fit. Outstanding: an echocardiogram (LVEF ≥ 50%), a serum pregnancy test (tubal ligation does not count as sterile here), protocol washout confirmation, and the planned UGT1A1 genotype for sacituzumab dosing.",
  [
    {
      id: "NCT06963905-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and consent are confirmed at screening; she is an accountant engaged in planning and interested in trials.",
      evidence: [{ quote: "Pt interested in trials, hopes to start within 3-4 wks.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-2",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-3",
      status: "pass",
      rationale: "Breast cancer is pathologically documented on the left breast core (2025-11-12) and the RLL metastasis (2025-11-20).",
      evidence: [{ quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: PATH }],
    },
    {
      id: "NCT06963905-inc-4",
      status: "pass",
      rationale: "De novo metastatic disease involving lung, mediastinal/hilar nodes, bone and now liver.",
      evidence: [{ quote: "De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-5",
      status: "pass",
      rationale: "ER 0%, PR 0% and HER2 IHC 0 on the RLL metastasis (2025-11-20), concordant with the breast core.",
      evidence: [
        { quote: "ER: negative (0%)", source: PATH },
        { quote: "PR: negative (0%)", source: PATH },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: PATH },
      ],
    },
    {
      id: "NCT06963905-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Any PD-L1 status is eligible. Hers is CPS 15 by 22C3; SP263 has not been run but can be done on the archival RLL core.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH }],
      actionNeeded: "Confirm whether SP263 PD-L1 testing on archival tissue is needed at screening",
    },
    {
      id: "NCT06963905-inc-7",
      status: "pass",
      rationale: "Exactly one metastatic line: pembrolizumab + gemcitabine/carboplatin from 12/2025; no (neo)adjuvant therapy (de novo stage IV).",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-8",
      status: "pass",
      rationale: "Prior checkpoint inhibitor with chemotherapy in the metastatic setting: pembrolizumab + gemcitabine/carboplatin, ~9 months.",
      evidence: [{ quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-9",
      status: "pass",
      rationale: "Permissive provision; she has had no targeted therapy (no PARP inhibitor), so nothing extra counts toward her line total.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-10",
      status: "pass",
      rationale: "Radiological progression on CT 2026-09-15 (new 2.1 cm liver lesion, RLL nodule 1.2 → 1.8 cm) after a partial response.",
      evidence: [
        { quote: "New 2.1 cm hypoattenuating lesion in hepatic segment VI, consistent with metastasis.", source: CT },
        { quote: "Right lower lobe nodule increased from 1.2 cm to 1.8 cm.", source: CT },
      ],
    },
    {
      id: "NCT06963905-inc-11",
      status: "pass",
      rationale: "Archival RLL core biopsy from 11/2025 (~10 months old, soft tissue, not decalcified) is available, and she is open to a liver biopsy if inadequate.",
      evidence: [{ quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-12",
      status: "pass",
      rationale: "Measurable and non-measurable disease are both allowed; she has measurable liver (2.1 cm) and RLL (1.8 cm) lesions.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-13",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-14",
      status: "unknown",
      confidence: "low",
      rationale: "No echocardiogram has ever been done; no cardiac history and no prior anthracycline or HER2 therapy.",
      evidence: [{ quote: "No echo or ECG on file; order if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram or MUGA; LVEF ≥ 50% required within 6 months before enrollment",
    },
    {
      id: "NCT06963905-inc-15",
      status: "pass",
      confidence: "medium",
      rationale:
        "On 2026-09-23: ANC 1.6, platelets 132, Hgb 9.8, creatinine 0.7, AST/ALT 1.5 × ULN, bilirubin 0.9 — adequate by standard thresholds. Table 1 is not shown, and ANC and Hgb sit close to usual cut-offs.",
      evidence: [
        { quote: "ANC 1.6", source: LABS },
        { quote: "Hgb 9.8 (L)", source: LABS },
        { quote: "AST 58 (H, 1.5x ULN)", source: LABS },
      ],
      actionNeeded: "Repeat CBC and chemistry within 14 days of C1D1 and check against protocol Table 1",
    },
    {
      id: "NCT06963905-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Bilateral tubal ligation (2014) is a highly effective method in standard contraception tables; agreement is confirmed at screening.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-17",
      status: "unknown",
      confidence: "low",
      rationale: "Premenopausal and, under this protocol's definition, of childbearing potential (tubal ligation is not a listed sterilising procedure); no pregnancy test is documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
      actionNeeded: "Obtain serum pregnancy test at screening; must be negative",
    },
    {
      id: "NCT06963905-inc-18",
      status: "unknown",
      confidence: "low",
      rationale: "As a participant of childbearing potential she needs a negative serum test (sensitivity ≥ 25 mIU/mL) at screening; none is on file.",
      actionNeeded: "Obtain serum β-hCG (sensitivity ≥ 25 mIU/mL) at screening, then urine β-hCG before each dose",
    },
    {
      id: "NCT06963905-inc-19",
      status: "pass",
      rationale:
        "Definition only: premenopausal with tubal ligation (not salpingectomy, oophorectomy or hysterectomy), so she counts as of childbearing potential and the pregnancy-test and contraception rules apply.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-20",
      status: "pass",
      confidence: "low",
      rationale: "Bilateral tubal ligation (2014) is a highly effective method; continuation for 7 months after the last dose is confirmed at consent.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT06963905-inc-21",
      status: "pass",
      confidence: "low",
      rationale: "No breastfeeding is recorded; agreement to avoid it on study and for 7 months after the last dose is confirmed at screening.",
    },
    {
      id: "NCT06963905-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Agreement not to donate or retrieve ova during treatment and for 7 months afterwards is confirmed at consent.",
    },
    {
      id: "NCT06963905-inc-23",
      status: "pass",
      confidence: "low",
      rationale: "Describes acceptable abstinence; her documented method is bilateral tubal ligation (2014), confirmed at screening.",
    },
    {
      id: "NCT06963905-inc-24",
      status: "not-applicable",
      rationale: "Applies to male participants only; she is female.",
    },
    {
      id: "NCT06963905-inc-25",
      status: "not-applicable",
      rationale: "Applies to male participants only; she is female.",
    },
    {
      id: "NCT06963905-exc-1",
      status: "pass",
      confidence: "low",
      rationale: "Tubal ligation in 2014 and no pregnancy or lactation recorded; confirmed by the screening pregnancy test.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-2",
      status: "pass",
      confidence: "low",
      rationale: "Her tubal ligation already provides highly effective contraception; willingness is confirmed at consent.",
    },
    {
      id: "NCT06963905-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Header for the comorbidity exclusions that follow; she has no cardiac history, diabetes, lung disease or pneumonitis.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No other primary cancer is recorded; the lung metastasis was confirmed as breast origin (GATA3+, TTF-1 negative). The new liver lesion has not been biopsied.",
      evidence: [{ quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: PATH }],
    },
    {
      id: "NCT06963905-exc-5",
      status: "pass",
      rationale: "No cardiac history recorded; BP 118/72, HR 88.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-6",
      status: "pass",
      rationale: "No cardiac history, and her only irAE on pembrolizumab was hypothyroidism; no myocarditis.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Never smoker, lungs clear, SpO2 98% on room air; no COPD or chronic respiratory illness recorded.",
      evidence: [
        { quote: "SH: accountant, 2 kids, never smoker.", source: NOTE },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT06963905-exc-8",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab, and CT 2026-09-15 shows no interstitial lung disease or pneumonitis.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: CT },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
      ],
    },
    {
      id: "NCT06963905-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No GI perforation is recorded; no colitis on pembrolizumab and the abdomen is soft and nontender.",
      evidence: [{ quote: "Abd soft, nontender.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No infection requiring IV antimicrobials; entecavir is oral prophylaxis for resolved HBV.",
      evidence: [{ quote: "entecavir 0.5 mg PO daily (HBV ppx)", source: "Medication list" }],
    },
    {
      id: "NCT06963905-exc-11",
      status: "pass",
      rationale: "HBsAg negative (anti-HBc positive, HBV DNA not detected 2026-08-28 on entecavir), HCV Ab negative and HIV negative: no active hepatitis B/C or HIV.",
      evidence: [
        { quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS },
        { quote: "HBV DNA 08/28/2026: not detected", source: LABS },
      ],
    },
    {
      id: "NCT06963905-exc-12",
      status: "pass",
      rationale: "Her only autoimmune condition is immune-related hypothyroidism needing hormone replacement alone, which is explicitly allowed; no autoimmune disease before pembrolizumab.",
      evidence: [
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: NOTE },
        { quote: "No autoimmune dz prior to pembro.", source: NOTE },
      ],
    },
    {
      id: "NCT06963905-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases (baseline MRI 2025-11-18 negative, asymptomatic, neuro exam nonfocal) and no cord compression (T11 lesion sclerotic, stable). Brain imaging has not been repeated in ~10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if required at screening (last 2025-11-18)",
    },
    {
      id: "NCT06963905-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "Residual toxicities are grade 1 fatigue, grade 1 transaminase elevation, grade 2 hypothyroidism on replacement (a named allowed example) and grade 2 anemia (Hgb 9.8), which needs investigator acceptance.",
      evidence: [
        { quote: "G1 fatigue, works part-time from home.", source: NOTE },
        { quote: "Anemia (chemo-related): Hgb 9.8, no bleeding.", source: NOTE },
      ],
      actionNeeded: "Confirm the investigator accepts chronic grade 2 anemia (Hgb 9.8 g/dL) and hypothyroidism on replacement",
    },
    {
      id: "NCT06963905-exc-15",
      status: "pass",
      confidence: "medium",
      rationale:
        "Allergy list records only penicillin (hives). She has never received sacituzumab, nivolumab or relatlimab, and tolerated ~9 months of pembrolizumab without a reaction.",
      evidence: [{ quote: "ALLERGIES: penicillin (hives)", source: "Allergies" }],
    },
    {
      id: "NCT06963905-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "Received pembrolizumab for ~9 months and denosumab since 12/2025 with no hypersensitivity documented; only penicillin allergy.",
      evidence: [{ quote: "ALLERGIES: penicillin (hives)", source: "Allergies" }],
    },
    {
      id: "NCT06963905-exc-17",
      status: "pass",
      rationale: "No prior ADC (so no sacituzumab or other TROP2 ADC) and no LAG-3 agent; her only checkpoint inhibitor was pembrolizumab.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No substance use or social barriers recorded; never smoker, works part-time from home, motivated for trials.",
      evidence: [{ quote: "SH: accountant, 2 kids, never smoker.", source: NOTE }],
    },
    {
      id: "NCT06963905-exc-19",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last gem/carbo 2026-08-26 (33 days) and last pembrolizumab 2026-09-02 (26 days; 4 weeks on 2026-09-30); treatment on hold since. The 'C9 D1 ... today' A/P line is stale copy-forward. Protocol washout periods are not listed.",
      evidence: [
        { quote: "Last gem/carbo 8/26/26.", source: NOTE },
        { quote: "Pembro deferred 1 wk for AST/ALT ~2x ULN (HBV DNA neg), last dose 9/2/26.", source: NOTE },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
      actionNeeded: "Confirm protocol washouts (typically 21–28 days) are met by C1D1 and that no dose was given 2026-09-25",
    },
  ],
);
