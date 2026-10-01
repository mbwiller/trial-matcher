import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06982521",
  "Meets all 6 inclusion criteria · HbA1c and ECG/QTc not on file",
  "A close fit: PIK3CA H1047R, HR+/HER2-low metastatic disease that progressed in the liver on first-line letrozole + palbociclib (CT 2026-08-14), measurable disease, ECOG 1, and no prior PI3K/AKT/mTOR inhibitor, immunotherapy, ADC or chemotherapy for advanced disease. Two screening items remain: HbA1c has never been measured (fasting glucose 104 mg/dL; must be below 7.0%) and no ECG/QTc is on file. Both arms (zovegalisib or capivasertib, each with fulvestrant) match the second-line options already discussed in clinic.",
  [
    {
      id: "NCT06982521-inc-1",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06982521-inc-2",
      status: "pass",
      rationale: "PIK3CA H1047R, a primary oncogenic kinase-domain hotspot, was detected on tissue NGS of the liver biopsy (reported 2025-03-10).",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" }],
    },
    {
      id: "NCT06982521-inc-3",
      status: "pass",
      rationale: "Adult woman, 58, postmenopausal after natural menopause at about 51; GnRH agonist is not required.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06982521-inc-4",
      status: "pass",
      rationale: "Biopsy-proven metastatic breast cancer, ER 90%, HER2 1+/ISH not amplified (HER2-low counts as HER2-negative), with radiological progression in the liver on CT 2026-08-14.",
      evidence: [
        { quote: "Liver bx 2/19/25 c/w met breast ca, ER 90% PR 10% HER2 1+/ISH neg (HER2-low)", source: "Clinic note 2026-09-18" },
        { quote: "CT 8/14/26 w/ PD in liver (new seg IV lesion 1.8 cm, seg VI lesion now 3.2 cm), bone dz stable.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-inc-5",
      status: "pass",
      rationale: "Measurable liver disease per RECIST v1.1: segment VI lesion 3.2 cm on CT 2026-08-14.",
      evidence: [
        { quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: "CT CAP 2026-08-14" },
        { quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-inc-6",
      status: "pass",
      rationale: "Two endocrine lines, within the 1–2 allowed: adjuvant anastrozole with recurrence on it (Feb 2025) and letrozole in the ABC setting. One CDK4/6i line (palbociclib + letrozole in ABC), with progression on CT 2026-08-14.",
      evidence: [
        { quote: "then adj anastrozole 12/2019 until recurrence", source: "Clinic note 2026-09-18" },
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-exc-1",
      status: "pass",
      rationale: "Prior systemic therapy was ddAC-T, anastrozole, letrozole and palbociclib (a CDK4/6, not CDK2, inhibitor); no PI3K/AKT/mTOR inhibitor, immunotherapy or antibody-drug conjugate.",
      evidence: [
        { quote: "adj ddAC-T 5/2019-9/2019", source: "Clinic note 2026-09-18" },
        { quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-exc-2",
      status: "unknown",
      confidence: "medium",
      rationale: "No diabetes and no antihyperglycemic medication; fasting glucose 104 mg/dL on 2026-09-15 is below 140, but HbA1c has never been measured.",
      evidence: [
        { quote: "No DM.", source: "Clinic note 2026-09-18" },
        { quote: "fasting glucose 104 on 9/15 labs, A1c not on file, will add to next draw", source: "Clinic note 2026-09-18" },
      ],
      actionNeeded: "Obtain HbA1c; must be < 7.0% (53 mmol/mol) at screening",
    },
    {
      id: "NCT06982521-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled on amlodipine (BP 132/78); no other cardiovascular disease is documented.",
      evidence: [
        { quote: "HTN - amlodipine, controlled.", source: "Clinic note 2026-09-18" },
        { quote: "BP 132/78 HR 76 afebrile.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-exc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG or QTc is on file. Potassium 4.1 is normal, magnesium is not reported, and none of her current medications is a recognized QT-prolonging drug.",
      evidence: [{ quote: "Cr 0.8 | Na 139 | K 4.1", source: "Labs 2026-09-15" }],
      actionNeeded: "Obtain 12-lead ECG and magnesium; QTcF must be within the protocol limit (typically ≤ 470 ms)",
    },
    {
      id: "NCT06982521-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms, steroids or anticonvulsants; she has never had brain imaging.",
      evidence: [
        { quote: "Denies neuro sx. Has never had brain imaging.", source: "Clinic note 2026-09-18" },
        { quote: "No brain MRI at this time (asymptomatic); would obtain if required for trial baseline.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06982521-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or radiation pneumonitis is recorded despite whole-breast RT in 2019; lungs clear on exam and CT 2026-08-14 shows no new pulmonary findings.",
      evidence: [
        { quote: "Lungs CTA.", source: "Clinic note 2026-09-18" },
        { quote: "No new pulmonary nodules. No adenopathy.", source: "CT CAP 2026-08-14" },
      ],
    },
    {
      id: "NCT06982521-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "She has never received fulvestrant, zovegalisib or capivasertib, and her only documented allergy is sulfa (rash).",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
      actionNeeded: "Confirm no reactions to fulvestrant excipients (castor oil, benzyl alcohol) at screening",
    },
    {
      id: "NCT06982521-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "March 2025 tissue NGS reported PIK3CA H1047R as the only pathogenic alteration; no AKT or PTEN alteration is known, though PTEN and AKT1 are not individually listed.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" }],
      actionNeeded: "Confirm the full NGS report shows no AKT1 or PTEN alteration",
    },
  ],
);
