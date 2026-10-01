import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const PRIOR = "Prior pathology 2019";
const NGS = "Tissue NGS 2025-03-10";
const CT = "CT CAP 2026-08-14";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT05646862",
  "Fits the open sub-study: PIK3CA H1047R, PD on 1L AI + CDK4/6i · HbA1c and amlodipine to clear",
  "Core eligibility is met: HR+/HER2-low (IHC 1+, ISH not amplified) metastatic disease with PIK3CA H1047R, progression on first-line letrozole + palbociclib after about 17 months, no PI3K/AKT/mTOR inhibitor or metastatic chemotherapy, measurable liver disease and ECOG 1. Main-study enrollment is complete, so she would enter the inavolisib + fulvestrant drug-interaction sub-study; main-study-only exclusions are not applicable. Two items to clear before screening: HbA1c (fasting glucose 104 mg/dL; inavolisib protocols set HbA1c < 6.0%) and a pharmacist review of amlodipine, a weak CYP3A4 inhibitor that the sub-study bars from 14 days before Day -4.",
  [
    {
      id: "NCT05646862-inc-1",
      status: "not-applicable",
      rationale: "Postmenopausal since natural menopause at about 51 (now 58), so LHRH agonist therapy is not required.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT05646862-inc-2",
      status: "pass",
      rationale: "Liver core biopsy (February 2025) confirmed metastatic adenocarcinoma of breast origin; disease in the liver and skeleton is not amenable to curative surgery or radiation.",
      evidence: [
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: PATH },
        { quote: "sclerotic bone mets (T8, L3, R ilium) + 2 liver lesions", source: NOTE },
      ],
    },
    {
      id: "NCT05646862-inc-3",
      status: "pass",
      rationale: "ER 90% and PR 10% with HER2 IHC 1+, ISH not amplified on the 2025 liver biopsy: HR-positive and HER2-negative (HER2-low) by ASCO/CAP.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT05646862-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "PIK3CA H1047R (VAF 31%), a kinase-domain hotspot targeted by inavolisib, was found on tissue NGS of the liver biopsy (March 2025); the assay is not named, so whether it counts as the specified test needs confirming.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: NGS }],
      actionNeeded: "Confirm the 2025 tissue NGS is an accepted assay, or submit plasma for the protocol's central ctDNA PIK3CA test.",
    },
    {
      id: "NCT05646862-inc-5",
      status: "pass",
      rationale: "Progressed in the liver on first-line letrozole + palbociclib (CT 2026-08-14, about 17 months on therapy): one metastatic line, no metastatic chemotherapy. Even counting adjuvant anastrozole, on which she recurred, the total is two.",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE },
        { quote: "CT 8/14/26 w/ PD in liver", source: NOTE },
      ],
    },
    {
      id: "NCT05646862-inc-6",
      status: "pass",
      rationale: "Measurable hepatic disease on CT 2026-08-14 (segment VI 3.2 cm, segment IV 1.8 cm). That scan is 45 days old, so baseline imaging will need repeating in the screening window.",
      evidence: [
        { quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: NOTE },
        { quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: CT },
      ],
      actionNeeded: "Repeat CT chest/abdomen/pelvis within the protocol's baseline window.",
    },
    {
      id: "NCT05646862-inc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Her oncologist is weighing endocrine-based second-line options (capivasertib or alpelisib + fulvestrant). There is no visceral crisis (bilirubin 0.6, transaminases normal, ECOG 1), so chemotherapy is not indicated.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: NOTE }],
    },
    {
      id: "NCT05646862-inc-8",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit; she still manages her own shopping and housework.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT05646862-inc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Inferred: ECOG 1, liver-dominant disease with preserved liver function (bilirubin 0.6, albumin 3.9) and stable bone disease support a life expectancy well beyond 6 months.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: LABS }],
    },
    {
      id: "NCT05646862-inc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "Labs from 2026-09-15 meet standard limits (ANC 2.8, platelets 210, Hgb 11.2, bilirubin 0.6, AST 34/ALT 41 unflagged, creatinine 0.8, CrCl ≈ 86 mL/min). However, the inavolisib lab panel also requires HbA1c < 6.0% and fasting glucose < 126 mg/dL: glucose is 104 and HbA1c has never been measured.",
      evidence: [
        { quote: "ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: LABS },
        { quote: "Glucose (fasting) 104 (H)", source: LABS },
        { quote: "A1c not on file, will add to next draw", source: NOTE },
      ],
      actionNeeded: "Obtain HbA1c (inavolisib protocols require < 6.0%) and repeat fasting glucose (< 126 mg/dL) with screening chemistry.",
    },
    {
      id: "NCT05646862-exc-1",
      status: "pass",
      rationale: "Histology is invasive ductal carcinoma on the 2019 primary and adenocarcinoma on the 2025 liver biopsy; no metaplastic component is reported.",
      evidence: [{ quote: "IDC, grade 2 (Nottingham 6/9)", source: PRIOR }],
    },
    {
      id: "NCT05646862-exc-2",
      status: "pass",
      rationale: "No PI3K, AKT or mTOR inhibitor to date: her only metastatic therapy is letrozole + palbociclib, and capivasertib or alpelisib is being discussed as a future option.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-3",
      status: "pass",
      rationale: "She never received an adjuvant CDK4/6 inhibitor (adjuvant therapy was ddAC-T then anastrozole), and she has already had first-line treatment for metastatic disease.",
      evidence: [
        { quote: "adj ddAC-T 5/2019-9/2019", source: NOTE },
        { quote: "then adj anastrozole 12/2019 until recurrence", source: NOTE },
      ],
    },
    {
      id: "NCT05646862-exc-4",
      status: "pass",
      rationale: "No diabetes on the problem list and no glucose-lowering medication; fasting glucose was 104 mg/dL on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: NOTE },
        { quote: "Glucose (fasting) 104 (H)", source: LABS },
      ],
    },
    {
      id: "NCT05646862-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Takes oral medications daily (amlodipine, atorvastatin) and took oral letrozole + palbociclib for about 17 months; ability to swallow pills is confirmed at screening.",
      evidence: [{ quote: "amlodipine 10 mg PO daily", source: MEDS }],
    },
    {
      id: "NCT05646862-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No malabsorption or GI disease on the problem list; appetite and weight are stable and she has no nausea or vomiting.",
      evidence: [{ quote: "Appetite ok, wt stable.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No history of leptomeningeal disease; she denies headache and neurological symptoms and the exam is nonfocal, although brain imaging has never been done.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases: asymptomatic and neurologically nonfocal, but she has never had brain imaging.",
      evidence: [
        { quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE },
        { quote: "No brain MRI at this time (asymptomatic); would obtain if required for trial baseline.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging.",
    },
    {
      id: "NCT05646862-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No eye disease on the problem list and she reports no visual changes; no ocular condition needing intervention is documented.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No uveitis or active ocular inflammation or infection recorded, and no visual symptoms reported.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No supplemental oxygen on the medication list and lungs are clear on examination.",
      evidence: [{ quote: "Lungs CTA.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis or symptomatic lung disease: lungs clear, never smoker, and CT chest 2026-08-14 reports no new pulmonary nodules and no other lung findings.",
      evidence: [
        { quote: "Lungs CTA.", source: NOTE },
        { quote: "No new pulmonary nodules.", source: CT },
      ],
    },
    {
      id: "NCT05646862-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease on the problem list (hypertension, hyperlipidaemia, osteopenia).",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No GI symptoms or bowel inflammation documented; appetite and weight are stable, with no nausea or vomiting.",
      evidence: [{ quote: "Appetite ok, wt stable.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "Liver metastases but preserved function (bilirubin 0.6, albumin 3.9, AST 34/ALT 41 unflagged); no cirrhosis on CT, social wine use only, and no hepatitis history recorded. Hepatitis serology is not on file.",
      evidence: [
        { quote: "AST 34 | ALT 41 | T bili 0.6", source: LABS },
        { quote: "never smoker, wine socially.", source: NOTE },
      ],
      actionNeeded: "Check hepatitis B and C serology at screening.",
    },
    {
      id: "NCT05646862-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection on the problem list; the criterion concerns known infection, and serostatus has not been documented.",
      actionNeeded: "Confirm HIV status at screening if the protocol requires testing.",
    },
    {
      id: "NCT05646862-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy appears in her history; breast cancer is the only cancer on record.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-18",
      status: "pass",
      rationale: "No corticosteroids or immunosuppressants on her medication list (denosumab, oxycodone, amlodipine, atorvastatin, calcium/vitamin D).",
    },
    {
      id: "NCT05646862-exc-19",
      status: "pass",
      rationale: "On denosumab since March 2025 without dental problems; no osteonecrosis of the jaw is reported.",
      evidence: [{ quote: "Tolerating denosumab, no dental isues.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-20",
      status: "not-applicable",
      rationale: "Section heading for main-study-only exclusions. Main-study enrollment is complete, so she would enter the sub-study and these items do not apply.",
    },
    {
      id: "NCT05646862-exc-21",
      status: "not-applicable",
      rationale: "Main-study-only item, and she is postmenopausal (natural menopause at about 51), so pregnancy criteria cannot apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-22",
      status: "not-applicable",
      rationale: "Main-study-only item; she would enter the sub-study, whose own infection criterion is assessed separately.",
    },
    {
      id: "NCT05646862-exc-23",
      status: "not-applicable",
      rationale: "Main-study-only item; the sub-study's investigational-drug washout is assessed separately.",
    },
    {
      id: "NCT05646862-exc-24",
      status: "not-applicable",
      rationale: "Main-study-only item (includes alpelisib); the sub-study's inavolisib/fulvestrant hypersensitivity criterion is assessed separately.",
    },
    {
      id: "NCT05646862-exc-25",
      status: "not-applicable",
      rationale: "Main-study-only item tied to the alpelisib arm. For reference, her only recorded drug reaction is a sulfa rash; no SJS, TEN, erythema multiforme or DRESS is documented.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
    },
    {
      id: "NCT05646862-exc-26",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding criteria do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-27",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile at the 2026-09-18 visit, with no infection, antibiotics or hospitalization recorded.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent recorded: her last anticancer therapy was standard letrozole + palbociclib, stopped 2026-08-20, and she is only now reviewing trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT05646862-exc-29",
      status: "pass",
      confidence: "medium",
      rationale: "Her only recorded allergy is sulfa (rash). She has never received inavolisib or fulvestrant, and neither is a sulfonamide.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
      actionNeeded: "Confirm no hypersensitivity to fulvestrant excipients (castor oil, benzyl alcohol, benzyl benzoate).",
    },
    {
      id: "NCT05646862-exc-30",
      status: "pass",
      confidence: "medium",
      rationale: "None of her current medications (denosumab, oxycodone, amlodipine, atorvastatin, calcium/vitamin D) induces CYP2B6, CYP3A4 or CYP2C19; herbal supplements such as St John's wort are not recorded.",
      actionNeeded: "Confirm no St John's wort or other inducing supplements in the 14 days before Day -4.",
    },
    {
      id: "NCT05646862-exc-31",
      status: "unknown",
      confidence: "medium",
      rationale: "She takes amlodipine 10 mg daily, which standard interaction references class as a weak CYP3A4 inhibitor (it raises simvastatin exposure). The sub-study bars even mild CYP3A4 inhibitors from 14 days before Day -4 through Cycle 1 Day 15.",
      evidence: [{ quote: "amlodipine 10 mg PO daily", source: MEDS }],
      actionNeeded: "Pharmacist review of amlodipine (and atorvastatin) against the protocol list; switch antihypertensive ≥ 14 days before Day -4 if required.",
    },
  ],
);
