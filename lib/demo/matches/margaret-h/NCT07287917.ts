import { demoMatch } from "../../match-helpers";

const S_NOTE = "Oncology note 2026-09-18";
const S_PATH = "Liver biopsy pathology 2025-02-19";
const S_NGS = "Tissue NGS 2025-03-10";
const S_CT = "CT C/A/P 2026-08-14";
const S_LABS = "Labs 2026-09-15";
const S_MEDS = "Medication list";

export default demoMatch(
  "NCT07287917",
  "Excluded: protocol bars any prior Adriamycin, and she had adjuvant ddAC-T in 2019",
  "Clinically she fits the breast cancer cohort well: ER+/HER2-low disease with PIK3CA H1047R, relapse on adjuvant anastrozole and progression on first-line letrozole + palbociclib, and her oncologist is already weighing capivasertib + fulvestrant, the backbone of this cohort. However, the protocol states that no prior use of Adriamycin is allowed, and she received dose-dense doxorubicin + cyclophosphamide followed by paclitaxel in 2019, so she is excluded unless the sponsor rules otherwise. Cardiac screening (echocardiogram, troponin/BNP, ECG), aPTT and hepatitis serology would also be outstanding.",
  [
    // ----- Inclusion -----
    {
      id: "NCT07287917-inc-1",
      status: "pass",
      rationale:
        "She is screened against the breast cancer (Cohort 1) items: biopsy-proven ER+/HER2-low metastatic breast cancer. Melanoma-specific items do not apply.",
      evidence: [{ quote: "DIAGNOSIS: Metastatic adenocarcinoma, consistent with breast primary.", source: S_PATH }],
    },
    {
      id: "NCT07287917-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Consent and willingness to comply are confirmed at screening; she has said she is interested in trials.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-3",
      status: "pass",
      rationale: "She is 58 years old (born 1968).",
      evidence: [{ quote: "DOB: 1968 (58 yo F)", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-4",
      status: "pass",
      rationale:
        "Biopsy-proven metastatic ER+/HER2-low breast cancer with an actionable PIK3CA H1047R. She has one metastatic endocrine line but recurred on adjuvant anastrozole (the alternative route), and capivasertib + fulvestrant is already under discussion, so she is a capivasertib candidate.",
      evidence: [
        { quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: S_NGS },
        { quote: "then adj anastrozole 12/2019 until recurrence", source: S_NOTE },
        { quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: S_NOTE },
      ],
    },
    {
      id: "NCT07287917-inc-5",
      status: "not-applicable",
      rationale:
        "Covers premenopausal ovarian suppression and melanoma checkpoint-inhibitor toxicity; she is postmenopausal (natural menopause ~51) and has breast cancer.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-6",
      status: "not-applicable",
      rationale: "Melanoma cohort (Cohort 2) histology and prior-therapy requirements; she has breast cancer.",
    },
    {
      id: "NCT07287917-inc-7",
      status: "pass",
      rationale:
        "Measurable by RECIST 1.1: segment VI liver metastasis 3.2 cm on CT 2026-08-14. The melanoma second-line and treatment-line clauses in this item do not apply.",
      evidence: [{ quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: S_CT }],
    },
    {
      id: "NCT07287917-inc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases (no neurological symptoms, never imaged), so the treated-brain-metastasis conditions do not need to be met; she has no previously irradiated target lesions.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-9",
      status: "pass",
      confidence: "low",
      rationale:
        "Willingness to biopsy is confirmed at screening. Her archival liver core (February 2025, ~19 months old) is outside the 1-year window, but lack of a biopsy does not preclude enrollment.",
      evidence: [{ quote: "Collected: 2025-02-19 | Reported: 2025-02-24", source: S_PATH }],
      actionNeeded: "Confirm willingness for a fresh liver biopsy at screening and on treatment",
    },
    {
      id: "NCT07287917-inc-10",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "Life expectancy is not stated, but ECOG 1, liver-dominant disease with preserved liver function and stable bone disease make at least 12 weeks very likely.",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-12",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Labs 2026-09-15 meet the listed thresholds: ANC 2.8, platelets 210, Hgb 11.2, AST 34/ALT 41 (liver metastases present), bilirubin 0.6. aPTT/PTT has not been measured.",
      evidence: [
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS },
      ],
      actionNeeded: "Obtain aPTT/PTT; must be ≤ 1.5 × ULN",
    },
    {
      id: "NCT07287917-inc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Creatinine 0.8 mg/dL (CrCl ≈86 mL/min); no thyroid disease on her problem list and HR 76, so clinically euthyroid; no grade 3 lab abnormality on 2026-09-15. The Gilbert's clause is moot (bilirubin 0.6).",
      evidence: [{ quote: "Cr 0.8 | Na 139 | K 4.1", source: S_LABS }],
    },
    {
      id: "NCT07287917-inc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last chemotherapy was adjuvant ddAC-T ending September 2019; palbociclib stopped 2026-08-20 (39 days ago) with ANC recovered to 2.8 and only grade 1 anemia. No growth factors or anti-cancer biologics are recorded.",
      evidence: [
        { quote: "Palbo/letrozole stopped 8/20/26.", source: S_NOTE },
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
      ],
    },
    {
      id: "NCT07287917-inc-15",
      status: "pass",
      confidence: "medium",
      rationale:
        "She has had no anti-neoplastic biologic that would need a sponsor-agreed interval; denosumab is a bone-supportive agent rather than anti-cancer therapy.",
      actionNeeded: "Confirm with the sponsor that ongoing denosumab is permitted",
    },
    {
      id: "NCT07287917-inc-16",
      status: "pass",
      confidence: "medium",
      rationale:
        "No anti-cancer antibody has been given. She receives denosumab 120 mg every 4 weeks for bone metastases, a supportive monoclonal antibody not usually counted in this washout.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: S_MEDS }],
      actionNeeded: "Confirm with the sponsor that continuing denosumab q4w does not trigger the 21-day antibody washout",
    },
    {
      id: "NCT07287917-inc-17",
      status: "pass",
      rationale: "Her only radiation was adjuvant whole-breast RT in October–November 2019, nearly 7 years ago.",
      evidence: [{ quote: "whole breast RT 10-11/2019", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No autologous or allogeneic stem cell transplant or solid organ transplant in her history.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-19",
      status: "not-applicable",
      rationale: "Applies to the pembrolizumab (melanoma) cohort only.",
    },
    {
      id: "NCT07287917-inc-20",
      status: "pass",
      confidence: "medium",
      rationale: "No second malignancy is recorded in her history; her 2019 germline panel was negative.",
      evidence: [{ quote: "Germline panel 2019 negative.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-inc-21",
      status: "pass",
      confidence: "low",
      rationale: "Compliance and geographic proximity are judged by the investigator at screening; she attends regular oncology follow-up.",
    },
    {
      id: "NCT07287917-inc-22",
      status: "pass",
      confidence: "low",
      rationale:
        "Naturally postmenopausal for ~7 years; under this protocol she is classed as not of childbearing potential only with FSH > 40 mIU/mL (age < 65), otherwise a contraception agreement applies.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
      actionNeeded: "Check FSH (> 40 mIU/mL) to document non-childbearing potential; otherwise obtain a contraception agreement",
    },
    {
      id: "NCT07287917-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "She took oral letrozole and palbociclib for ~17 months; no swallowing difficulty recorded.",
    },
    // ----- Exclusion -----
    {
      id: "NCT07287917-exc-1",
      status: "pass",
      rationale: "Preamble to the exclusion list; each exclusion is assessed individually.",
    },
    {
      id: "NCT07287917-exc-2",
      status: "not-applicable",
      rationale:
        "Melanoma-only exclusion; she would enter the breast cancer cohort, and no other antineoplastic therapy is planned beyond study treatment (denosumab is bone-supportive).",
    },
    {
      id: "NCT07287917-exc-3",
      status: "pass",
      rationale: "No systemic corticosteroids or other immunosuppressive medication on the current medication list.",
    },
    {
      id: "NCT07287917-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "She has not yet received fulvestrant, capivasertib, AMXT 1501 or DFMO, so no intolerance is known; prior letrozole + palbociclib was tolerated for ~17 months.",
    },
    {
      id: "NCT07287917-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "No epilepsy, stroke, dementia or other CNS pathology in her history; no known brain metastases, neurologically asymptomatic with a nonfocal exam, though brain imaging has never been done.",
      evidence: [
        { quote: "Neuro grossly nonfocal.", source: S_NOTE },
        { quote: "Denies neuro sx. Has never had brain imaging.", source: S_NOTE },
      ],
    },
    {
      id: "NCT07287917-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory neurological disorder in her history; neuro exam grossly nonfocal.",
      evidence: [{ quote: "Neuro grossly nonfocal.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-7",
      status: "fail",
      rationale:
        "The protocol allows no prior Adriamycin; she received adjuvant dose-dense AC-T (doxorubicin + cyclophosphamide, then paclitaxel) May–September 2019. No treatment falls in the 4-week window.",
      evidence: [
        { quote: "adj ddAC-T 5/2019-9/2019", source: S_NOTE },
        { quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: S_NOTE },
      ],
    },
    {
      id: "NCT07287917-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "Palbociclib, her last targeted small molecule, was stopped 2026-08-20, 39 days before today; no chemotherapy since 2019. The A/P line 'continue letrozole/palbociclib' is a stale copy-forward.",
      evidence: [
        { quote: "Palbo/letrozole stopped 8/20/26.", source: S_NOTE },
        { quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: S_MEDS },
      ],
      actionNeeded: "Confirm 2026-08-20 as the last dose of palbociclib/letrozole",
    },
    {
      id: "NCT07287917-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease on her problem list and no disease-modifying, steroid or immunosuppressive therapy.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "No clinically significant cardiovascular disease recorded: hypertension controlled on amlodipine (BP 132/78) and hyperlipidemia on a statin. The specific cardiac items are assessed separately.",
      evidence: [{ quote: "HTN - amlodipine, controlled.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-11",
      status: "unknown",
      confidence: "low",
      rationale:
        "BP 132/78 on amlodipine (below 150/100) and no MI, angina, coronary disease, stroke or revascularization recorded, but troponin I and BNP/NT-proBNP have not been measured.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
      actionNeeded: "Obtain troponin I and BNP or NT-proBNP at screening; both must be ≤ ULN",
    },
    {
      id: "NCT07287917-exc-12",
      status: "unknown",
      confidence: "low",
      rationale:
        "No heart failure recorded, but her only LVEF is 62% from the pre-anthracycline echo in 2019 — about 7 years old and before doxorubicin.",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: S_NOTE }],
      actionNeeded: "Obtain echocardiogram; LVEF ≥ 50% required",
    },
    {
      id: "NCT07287917-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No atrial fibrillation or other arrhythmia and no pacemaker or ICD recorded; HR 76 at the 2026-09-18 visit.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic inflammatory disease (SLE, rheumatoid or psoriatic arthritis, systemic sclerosis) on her problem list.",
    },
    {
      id: "NCT07287917-exc-15",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG is documented in the record.",
      actionNeeded: "Obtain 12-lead ECG; QTcF must be ≤ 450 ms with no bundle branch, fascicular or 2nd/3rd-degree AV block",
    },
    {
      id: "NCT07287917-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "Surgical history ends with port removal in 2020; no major surgery in the past 4 weeks.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection or anti-infective therapy recorded; afebrile at the 2026-09-18 visit.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-18",
      status: "not-applicable",
      rationale:
        "She is 58 and naturally postmenopausal since about 51, so pregnancy and lactation do not arise; the protocol's formal non-childbearing definition (FSH) is addressed in the next item.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-19",
      status: "pass",
      confidence: "low",
      rationale:
        "Part of the non-childbearing definition: at 58 she needs FSH > 40 mIU/mL to be classed postmenopausal, and FSH is not in the record. A lower value would add pregnancy testing and contraception, not exclusion.",
      actionNeeded: "Check FSH; > 40 mIU/mL documents non-childbearing potential, otherwise a serum pregnancy test within 1 week and contraception apply",
    },
    {
      id: "NCT07287917-exc-20",
      status: "not-applicable",
      rationale: "Applies to women aged ≥65 or on hormone replacement therapy; she is 58 and takes no HRT.",
    },
    {
      id: "NCT07287917-exc-21",
      status: "not-applicable",
      rationale: "Surgical-sterilization route to non-childbearing status; she has had no hysterectomy or oophorectomy and qualifies through natural menopause instead.",
    },
    {
      id: "NCT07287917-exc-22",
      status: "pass",
      confidence: "medium",
      rationale:
        "No unresolved grade >1 toxicity: Hgb 11.2 (grade 1) and fatigue called moderate but with her own shopping and housework intact (grade 1).",
      evidence: [{ quote: "Since then moderate fatigue (still does own shopping/housework)", source: S_NOTE }],
      actionNeeded: "Grade fatigue at screening; must be grade ≤1",
    },
    {
      id: "NCT07287917-exc-23",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to comply with protocol procedures are confirmed at screening.",
    },
    {
      id: "NCT07287917-exc-24",
      status: "unknown",
      confidence: "low",
      rationale:
        "No chronic liver disease recorded and liver tests are normal (AST 34, ALT 41, bilirubin 0.6); her liver involvement is metastatic. Hepatitis A, B and C serologies are not documented.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS }],
      actionNeeded: "Obtain HAV IgM, HBsAg and HCV antibody (HCV RNA if positive; HBV DNA if prior HBV)",
    },
    {
      id: "NCT07287917-exc-25",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are limited to controlled hypertension, treated hyperlipidemia and osteopenia; no serious nonmalignant disease.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-26",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent in her treatment history; her last cancer therapy was letrozole + palbociclib, stopped 2026-08-20.",
    },
    {
      id: "NCT07287917-exc-27",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease or surgery affecting absorption; she swallowed letrozole and palbociclib tablets for ~17 months.",
    },
    {
      id: "NCT07287917-exc-28",
      status: "pass",
      confidence: "medium",
      rationale: "Her only documented allergy is sulfa (rash); she has not been exposed to AMXT 1501, DFMO, fulvestrant or capivasertib.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)" }],
    },
    {
      id: "NCT07287917-exc-29",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole was stopped 2026-08-20 and she takes no other hormonal therapy or HRT; study fulvestrant would be her only endocrine agent.",
      evidence: [{ quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: S_MEDS }],
    },
    {
      id: "NCT07287917-exc-30",
      status: "pass",
      confidence: "low",
      rationale: "Her supplements are calcium carbonate and vitamin D3 only; no biotin or multivitamin is listed.",
      evidence: [{ quote: "calcium carbonate 600 mg / vitamin D3 800 IU daily", source: S_MEDS }],
      actionNeeded: "Confirm no biotin-containing supplement above 30 μg/day",
    },
    {
      id: "NCT07287917-exc-31",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled or acute infection; afebrile with clear lungs at the 2026-09-18 visit.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-32",
      status: "pass",
      confidence: "medium",
      rationale:
        "No HIV infection is recorded; this clause only bars HIV that is not well controlled (CD4 > 350, undetectable viral load), which would be documented in her care.",
      actionNeeded: "Confirm HIV status if tested; well-controlled HIV is permitted",
    },
    {
      id: "NCT07287917-exc-33",
      status: "pass",
      confidence: "medium",
      rationale: "No active or prior autoimmune disease on her problem list.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-34",
      status: "pass",
      confidence: "medium",
      rationale: "No additional malignancy is recorded; breast cancer is her only cancer.",
    },
    {
      id: "NCT07287917-exc-35",
      status: "not-applicable",
      rationale: "Pembrolizumab is given only in the melanoma cohort; she would receive fulvestrant + capivasertib in the breast cohort.",
    },
    {
      id: "NCT07287917-exc-36",
      status: "pass",
      rationale: "No lung radiation in the past 6 months; her only radiotherapy was whole-breast RT in late 2019.",
      evidence: [{ quote: "whole breast RT 10-11/2019", source: S_NOTE }],
    },
    {
      id: "NCT07287917-exc-37",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis or ILD history; lungs clear on exam and no pulmonary abnormality on CT 2026-08-14.",
      evidence: [
        { quote: "Lungs CTA.", source: S_NOTE },
        { quote: "No new pulmonary nodules. No adenopathy.", source: S_CT },
      ],
    },
    {
      id: "NCT07287917-exc-38",
      status: "pass",
      confidence: "medium",
      rationale: "No allogeneic stem cell or solid organ transplant in her history.",
    },
    {
      id: "NCT07287917-exc-39",
      status: "pass",
      confidence: "medium",
      rationale: "No radiation pneumonitis after her 2019 whole-breast RT; lungs clear and no pulmonary findings on CT 2026-08-14.",
      evidence: [{ quote: "Lungs CTA.", source: S_NOTE }],
    },
  ],
);
