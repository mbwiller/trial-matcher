import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07222215",
  "Meets every documented criterion · DPD deficiency status to confirm before capecitabine",
  "She matches this study closely: ER 90%/HER2 0, ESR1 Y537S (a listed pathogenic variant) on 9/2026 ctDNA, about 27 months on first-line letrozole + ribociclib before progression, no prior chemotherapy, ADC, fulvestrant or oral SERD, and evaluable bone-only disease is accepted. Open items: DPD deficiency (no DPYD testing on file), the TP53 line of the Guardant360 report, and her borderline renal function (eGFR 52, CrCl ≈ 52 mL/min against a > 50 floor). Both arms give capecitabine, so this means starting chemotherapy earlier than the endocrine-first plan in the note, and the control arm omits elacestrant despite her ESR1 mutation.",
  [
    {
      id: "NCT07222215-inc-1",
      status: "pass",
      rationale:
        "The most recent biopsy (left iliac bone, May 2024) shows ER 90% strong (well above 10%) and HER2 IHC 0, in metastatic, unresectable disease.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Pathology 2024-05-29" },
        { quote: "HER2 IHC: 0 (negative)", source: "Pathology 2024-05-29" },
      ],
    },
    {
      id: "NCT07222215-inc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "Standard-of-care Guardant360 CDx (collected 16 Sep 2026) shows ESR1 Y537S, a listed pathogenic variant. TP53 is covered by that assay but its result is not in the report excerpt.",
      evidence: [
        { quote: "ESR1 p.Y537S, VAF 2.1%", source: "Guardant360 2026-09-23" },
        { quote: "MOLECULAR - Guardant360 CDx (ctDNA), collected 2026-09-16, reported 2026-09-23:", source: "Guardant360 2026-09-23" },
      ],
      actionNeeded: "Confirm the TP53 result on the full Guardant360 report",
    },
    {
      id: "NCT07222215-inc-3",
      status: "pass",
      rationale: "She is 67 (born 1959), well above the ≥ 18 minimum.",
      evidence: [{ quote: "DOB: 1959 (67 yo F)", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-4",
      status: "pass",
      rationale: "Postmenopausal by the age criterion: she is 67, above the ≥ 60 threshold.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-5",
      status: "pass",
      rationale:
        "Bone-only disease is evaluable by RECIST 1.1, which is accepted here. She progressed on first-line letrozole + ribociclib in the metastatic setting (PET/CT 9 Sep 2026).",
      evidence: [
        { quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Clinic note 2026-09-25" },
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-inc-6",
      status: "pass",
      rationale: "One prior endocrine-based line for advanced disease (letrozole + ribociclib); there is no limit on the number.",
      evidence: [
        {
          quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia) + zoledronic acid, best response SD.",
          source: "Clinic note 2026-09-25",
        },
      ],
    },
    {
      id: "NCT07222215-inc-7",
      status: "pass",
      rationale: "Prior CDK4/6 inhibitor: ribociclib in the metastatic setting from June 2024 until 14 Sep 2026.",
      evidence: [{ quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-8",
      status: "pass",
      rationale:
        "She stayed on letrozole + ribociclib in the metastatic setting for about 27 months (6/2024–9/2026) before progression, far beyond the 6-month minimum.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-9",
      status: "pass",
      rationale: "Permissive statement; she has not received alpelisib, so nothing here limits her.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-inc-10",
      status: "pass",
      rationale: "Permissive statement; she has not received everolimus, so nothing here limits her.",
    },
    {
      id: "NCT07222215-inc-11",
      status: "pass",
      rationale: "Permissive statement; she has not received capivasertib, so nothing here limits her.",
    },
    {
      id: "NCT07222215-inc-12",
      status: "pass",
      rationale: "No prior oral SERD or other next-generation oral endocrine therapy, and no prior fulvestrant.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-inc-13",
      status: "pass",
      rationale: "No chemotherapy or ADC in the metastatic setting; her only metastatic treatment was letrozole + ribociclib.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-inc-14",
      status: "pass",
      rationale: "Palliative RT to the left hip (8 Gy × 1) in July 2024, over 2 years ago, with no ongoing radiation toxicity recorded.",
      evidence: [{ quote: "Palliative RT L hip 8 Gy x1 7/2024.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-15",
      status: "pass",
      rationale: "ECOG 1 on 25 Sep 2026.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-16",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 22 Sep 2026: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST 24/ALT 19 all meet the limits. Kidney function is borderline: eGFR 52 mL/min/1.73 m² and Cockcroft-Gault CrCl ≈ 52 mL/min (67 y, 66 kg, Cr 1.1), just above > 50.",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L) | K 4.2 | Mg 1.9 | Ca 9.4", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Recalculate creatinine clearance on screening labs; it must stay > 50 mL/min",
    },
    {
      id: "NCT07222215-inc-17",
      status: "not-applicable",
      rationale:
        "Contraception rule covers women of childbearing potential, GnRH-suppressed women and men. She is naturally postmenopausal at 67.",
    },
    {
      id: "NCT07222215-inc-18",
      status: "not-applicable",
      rationale: "Pregnancy testing is waived for women over 60; she is 67 and postmenopausal.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-19",
      status: "pass",
      confidence: "medium",
      rationale: "She took oral letrozole and ribociclib for about 27 months with no recorded problem swallowing or retaining tablets.",
      evidence: [{ quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-20",
      status: "pass",
      confidence: "low",
      rationale: "She is open to trials and was referred to the research coordinator; consent is confirmed at screening.",
      evidence: [{ quote: "Pt prefers oral tx, open to trials -> research coordinator.", source: "Clinic note 2026-09-25" }],
    },
    {
      id: "NCT07222215-inc-21",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known HIV infection in the past medical history. This provision only matters for people living with HIV, and screening tests are not mandated.",
    },
    {
      id: "NCT07222215-inc-22",
      status: "pass",
      rationale: "Informational note: HIV testing is not required at screening, so the absence of HIV serology does not hold up eligibility.",
    },
    {
      id: "NCT07222215-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "No history of hepatitis B; this provision only matters for HBsAg-positive patients.",
    },
    {
      id: "NCT07222215-inc-24",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known history of HBV or HCV infection, so screening serology is not required under this note. Liver tests are normal (AST 24, ALT 19).",
      evidence: [{ quote: "AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT07222215-inc-25",
      status: "pass",
      confidence: "medium",
      rationale: "No history of hepatitis C or antiviral therapy, so the curative-therapy washout does not affect her.",
    },
    {
      id: "NCT07222215-inc-26",
      status: "pass",
      confidence: "medium",
      rationale: "No known history of HCV infection, so hepatitis C screening is not required.",
    },
    {
      id: "NCT07222215-exc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole + ribociclib stopped 14 Sep 2026, so the 14-day gap is met on or after 28 Sep (the A/P's 'Continue ribociclib' line is a stale copy-forward). The 2024 grade 3 neutropenia has recovered (ANC 1.7).",
      evidence: [
        { quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" },
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Confirm 14 Sep 2026 as the last ribociclib/letrozole dose; registration no earlier than 28 Sep 2026",
    },
    {
      id: "NCT07222215-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent is recorded, now or previously.",
    },
    {
      id: "NCT07222215-exc-3",
      status: "pass",
      rationale: "Disease is bone-only, with no visceral, nodal or soft-tissue involvement on the 9 Sep 2026 PET/CT.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT07222215-exc-4",
      status: "unknown",
      confidence: "low",
      rationale:
        "She has never received a fluoropyrimidine, and no DPYD genotype or DPD activity test is on file, so DPD deficiency cannot be excluded.",
      actionNeeded: "Obtain DPYD genotyping (or DPD phenotyping) before capecitabine; known DPD deficiency excludes",
    },
    {
      id: "NCT07222215-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain or leptomeningeal metastases and no neurological symptoms. Brain imaging has never been done, and asymptomatic untreated lesions < 1 cm would be allowed.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Clinic note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-exc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "No active infection, cardiovascular disease or arrhythmia is recorded. Diabetes is diet-controlled (HbA1c 6.4%), depression is stable on escitalopram, she has no GI disorder, and she lives alone but is independent in ADLs.",
      evidence: [
        { quote: "T2DM diet-controlled (A1c 6.4% 8/2026)", source: "Clinic note 2026-09-25" },
        { quote: "Depression - escitalopram 10 mg, stable.", source: "Clinic note 2026-09-25" },
      ],
    },
    {
      id: "NCT07222215-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded.",
    },
    {
      id: "NCT07222215-exc-8",
      status: "pass",
      rationale:
        "Current medications (zoledronic acid, tramadol, escitalopram, calcium/vitamin D) include no listed P-gp or BCRP substrate such as digoxin, dabigatran or rosuvastatin.",
      evidence: [{ quote: "escitalopram 10 mg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT07222215-exc-9",
      status: "pass",
      rationale:
        "No strong CYP3A inhibitor on the current list. Ribociclib, a moderate inhibitor at 400 mg, stopped 14 Sep 2026, beyond 5 half-lives.",
      evidence: [{ quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" }],
    },
    {
      id: "NCT07222215-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "None of her medications is a narrow-therapeutic-index CYP3A substrate; tramadol and escitalopram are partly CYP3A-metabolised but not narrow-window.",
      evidence: [{ quote: "tramadol 50 mg PO q6h prn pain", source: "Medication list" }],
    },
    {
      id: "NCT07222215-exc-11",
      status: "not-applicable",
      rationale: "Lactation rules cannot apply to a 67-year-old postmenopausal woman.",
    },
    {
      id: "NCT07222215-exc-12",
      status: "pass",
      rationale: "Inclusiveness statement, not a restriction; it does not affect her eligibility.",
    },
  ],
);
