import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const LABS = "Labs 2026-09-23";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07191717",
  "Excluded: needs ≥ 24 months of adjuvant endocrine therapy and no prior VTE; she has 3 weeks and a 2019 DVT",
  "MIRI treats ctDNA-positive minimal residual disease with imlunestrant plus abemaciclib in patients already on at least two years of adjuvant endocrine therapy. Helen's tumor biology and stage fit (ER 90%, HER2-low/negative, pathologic stage IIIA), but letrozole only began on 9/8/26, so she could not qualify before 9/2028, and her provoked leg DVT in 2019 meets the VTE exclusion (only catheter-related occlusion is exempt). ctDNA has also never been sent. Even at the two-year mark the DVT history would keep her out unless the PI granted an exception.",
  [
    {
      id: "NCT07191717-inc-1",
      status: "pass",
      rationale: "Localized invasive cancer, ER 90% on pathology, HER2 IHC 2+ with ISH ratio 1.3 (< 2, negative), pathologic stage IIIA (pT2 pN2a, AJCC 8th).",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: PATH },
        { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: PATH },
      ],
    },
    {
      id: "NCT07191717-inc-2",
      status: "unknown",
      confidence: "medium",
      rationale: "No ctDNA test has been sent (Signatera planned only if a trial requires it); she has no clinical or radiographic evidence of recurrence.",
      evidence: [
        { quote: "ctDNA (Signatera) not sent; would send if trial requires.", source: NOTE },
        { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE },
      ],
      actionNeeded: "Send tumor-informed ctDNA (e.g. Signatera on MRM tissue); detectable ctDNA within 6 months required",
    },
    {
      id: "NCT07191717-inc-3",
      status: "pass",
      rationale: "Surgical tissue, the preferred source, is available: the 5/12/26 mastectomy blocks.",
      evidence: [{ quote: "MRM blocks available.", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy in her detailed history; comorbidities (rate-controlled AF, CKD 3a, HTN) are stable and not obviously disqualifying.",
    },
    {
      id: "NCT07191717-inc-5",
      status: "pass",
      rationale: "Adjuvant TC completed 8/19/26; residual toxicity is grade 1 fingertip neuropathy (≤ grade 2 allowed) and grade 1 anemia (Hgb 11.1).",
      evidence: [
        { quote: "G1 PN fingertps (numbness, buttons ok)", source: NOTE },
        { quote: "Anemia Hgb 11.1 post-chemo, monitor.", source: NOTE },
      ],
    },
    {
      id: "NCT07191717-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Radiation is ongoing (to ~10/20/26) with grade 1 chest-wall erythema and no desquamation, within the grade ≤ 1 limit; reassess after completion.",
      evidence: [{ quote: "R chest wall: MRM scar healed, G1 RT erythema.", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-7",
      status: "pass",
      rationale: "Postmenopausal woman aged 72; pregnancy testing is not required at age ≥ 60.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-8",
      status: "pass",
      rationale: "Age 72, above the 18-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-9",
      status: "pass",
      rationale: "Permissive clause; she has never received a CDK4/6 inhibitor (still being discussed).",
      evidence: [{ quote: "Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-10",
      status: "pass",
      rationale: "ECOG 1 on 9/25/26, within 0–1.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-11",
      status: "fail",
      rationale: "She is on adjuvant letrozole, but only since 9/8/26 (20 days), far short of the required 24 months cumulative; earliest qualifying date would be 9/2028.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS }],
    },
    {
      id: "NCT07191717-inc-12",
      status: "pass",
      confidence: "low",
      rationale: "She is keen to discuss trials and has capacity; consent before screening procedures is obtained at screening.",
      evidence: [{ quote: "Pt keen to hear about trials before deciding -> research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-13",
      status: "fail",
      rationale: "Letrozole is an allowed AI, but she has taken it for 20 days (since 9/8/26), not the required ≥ 2 years.",
      evidence: [{ quote: "Letrozole 2.5 mg started 9/8/26.", source: NOTE }],
    },
    {
      id: "NCT07191717-inc-14",
      status: "pass",
      rationale: "ANC 2.3 × 10⁹/L on 9/23/26, above 1.5.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07191717-inc-15",
      status: "pass",
      rationale: "Platelets 201 × 10⁹/L on 9/23/26, above 100.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07191717-inc-16",
      status: "pass",
      rationale: "Hemoglobin 11.1 g/dL on 9/23/26, above 9.0.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07191717-inc-17",
      status: "pass",
      rationale: "Serum creatinine 1.1 mg/dL on 9/23/26, below 1.5 (Cockcroft-Gault CrCl ≈ 50 mL/min, eGFR 49).",
      evidence: [{ quote: "Cr 1.1 | eGFR 49 (L)", source: LABS }],
    },
    {
      id: "NCT07191717-inc-18",
      status: "pass",
      rationale: "AST 22 and ALT 18 U/L on 9/23/26, below 2.5 × ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07191717-inc-19",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 9/23/26, below 1.5 × ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07191717-inc-20",
      status: "pass",
      rationale: "She already takes several oral medications daily, including letrozole and apixaban.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS }],
    },
    {
      id: "NCT07191717-exc-1",
      status: "pass",
      rationale: "No metastatic disease on staging CT and bone scan (5/21/26), no contralateral adenopathy, and no inflammatory features (screen-detected pT2 mass).",
      evidence: [
        { quote: "No evidence of distant metastatic disease.", source: "CT + bone scan 2026-05-21" },
        { quote: "No axillary/supraclav adenopathy.", source: NOTE },
      ],
    },
    {
      id: "NCT07191717-exc-2",
      status: "pass",
      rationale: "No CDK4/6 inhibitor has been given; abemaciclib or ribociclib is only under discussion.",
      evidence: [{ quote: "Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial", source: NOTE }],
    },
    {
      id: "NCT07191717-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent in her treatment history or medication list.",
    },
    {
      id: "NCT07191717-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy in the past 5 years in her history; her comorbidities are controlled.",
    },
    {
      id: "NCT07191717-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No herbal products; she takes calcium carbonate with vitamin D3 (being increased to 2000 IU for a level of 24), standard bone support on an aromatase inhibitor.",
      evidence: [
        { quote: "calcium carbonate 600 mg / vitamin D3 800 IU daily", source: MEDS },
        { quote: "Vit D 24 -> D3 2000 IU.", source: NOTE },
      ],
      actionNeeded: "Confirm with the overall PI that calcium and vitamin D3 supplements are permitted",
    },
    {
      id: "NCT07191717-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness: paroxysmal AF is rate-controlled and in sinus rhythm, CrCl ≈ 50 mL/min (above 30), no infection, diarrhea or GI malabsorption documented.",
      evidence: [
        { quote: "2. pAF: apixaban 5 mg BID, metoprolol succ. SR on ECG.", source: NOTE },
        { quote: "Cr 1.1 | eGFR 49 (L)", source: LABS },
      ],
    },
    {
      id: "NCT07191717-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Her arrhythmia is atrial (paroxysmal AF), not ventricular; no syncope or cardiac arrest is recorded.",
      evidence: [{ quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE }],
    },
    {
      id: "NCT07191717-exc-8",
      status: "fail",
      rationale: "She had a deep vein thrombosis of the left leg in 2019 after knee replacement; only uncomplicated catheter-related occlusion is exempt, and her oncologist already flags VTE history with abemaciclib.",
      evidence: [
        { quote: "provoked DVT L leg 2019 after L TKA, completed 3 mo anticoagulation", source: NOTE },
        { quote: "Abemaciclib: VTE hx a concern (already on apixaban)", source: NOTE },
      ],
    },
    {
      id: "NCT07191717-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "She has never received imlunestrant or abemaciclib; her only recorded allergy is lisinopril cough.",
      evidence: [{ quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" }],
    },
    {
      id: "NCT07191717-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection in her history; the clause applies only to HIV-positive patients not on antiretrovirals.",
    },
    {
      id: "NCT07191717-exc-11",
      status: "not-applicable",
      rationale: "Pregnancy and contraception rule for women of child-bearing potential and men; she is 72 and postmenopausal since about age 50.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07191717-exc-12",
      status: "not-applicable",
      rationale: "Fragment of the definition of child-bearing potential; she is postmenopausal (age 72, menopause ~50), so the WOCBP rules do not apply.",
    },
    {
      id: "NCT07191717-exc-13",
      status: "not-applicable",
      rationale: "Fragment of the WOCBP definition; at age 72 (≥ 60) she meets the postmenopausal definition, so she is not of child-bearing potential.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07191717-exc-14",
      status: "not-applicable",
      rationale: "Contraception requirement for women of child-bearing potential; she has had natural amenorrhea for about 22 years.",
    },
    {
      id: "NCT07191717-exc-15",
      status: "not-applicable",
      rationale: "Description of acceptable contraception (abstinence) for women of child-bearing potential; not relevant to a postmenopausal woman.",
    },
    {
      id: "NCT07191717-exc-16",
      status: "not-applicable",
      rationale: "Description of sterilisation as a contraceptive method for women of child-bearing potential; not relevant to a postmenopausal woman.",
    },
    {
      id: "NCT07191717-exc-17",
      status: "not-applicable",
      rationale: "Description of hormonal contraception and IUDs for women of child-bearing potential; not relevant to a postmenopausal woman.",
    },
    {
      id: "NCT07191717-exc-18",
      status: "not-applicable",
      rationale: "Description of LHRH agonist plus barrier contraception for women of child-bearing potential; not relevant to a postmenopausal woman.",
    },
    {
      id: "NCT07191717-exc-19",
      status: "not-applicable",
      rationale: "Lactation exclusion cannot apply to a 72-year-old postmenopausal woman.",
    },
  ],
);
