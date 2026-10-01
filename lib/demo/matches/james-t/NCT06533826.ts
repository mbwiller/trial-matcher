import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const PRIOR = "Mastectomy pathology 2021-05";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medication list";

export default demoMatch(
  "NCT06533826",
  "Fits an HR+ ADC1 cohort · echo, ECG, coags and PI review of prostate cancer pending",
  "He would enter an HR+ ADC1 cohort (T-DXd or Dato-DXd first): HR+/HER2-low (IHC 1+/ISH-) metastatic disease progressing after adjuvant tamoxifen and first-line AI + CDK4/6 inhibitor, with no metastatic chemotherapy, no prior topoisomerase I agent, measurable disease, ECOG 1 and adequate counts and chemistry. Open items are a baseline echocardiogram (T-DXd cohorts; last LVEF 2021, before doxorubicin), an ECG, coagulation tests, and PI sign-off on his untreated GG1 prostate cancer diagnosed within 3 years. Enrolling would defer the PARP inhibitor his oncologist lists as standard second line.",
  [
    {
      id: "NCT06533826-inc-1",
      status: "pass",
      rationale:
        "Metastatic breast cancer confirmed on CT-guided core biopsy of a left lower lobe nodule (2025-01-22), with lung, right hilar nodal and bone disease on CT 2026-09-11.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma, consistent with breast primary.", source: PATH },
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
      ],
    },
    {
      id: "NCT06533826-inc-2",
      status: "pass",
      rationale: "ER, PR and HER2 are known from the most recent sample, the 2025 lung biopsy: ER 85%, PR 30%, HER2 IHC 1+ with ISH not amplified.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 30% of tumor cells, moderate intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT06533826-inc-3",
      status: "pass",
      rationale: "HER2-low on every sample: IHC 1+ on the 2021 primary and IHC 1+/ISH not amplified (ratio 1.3) on the 2025 metastasis; never HER2-positive.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
        { quote: "HER2 IHC 1+ (negative)", source: PRIOR },
      ],
    },
    {
      id: "NCT06533826-inc-4",
      status: "pass",
      rationale: "HR-positive cohort (ER 85%, PR 30%, both ≥ 1%), and the most recent HER2 result is HER2-low (IHC 1+/ISH-), not HER2-positive.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
      ],
    },
    {
      id: "NCT06533826-inc-5",
      status: "pass",
      rationale: "RECIST-measurable lesions: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-6",
      status: "pass",
      confidence: "low",
      rationale:
        "Willingness for serial research biopsies is confirmed at consent; the RUL nodule and hilar node are potentially accessible, the sclerotic bone lesions less so.",
      actionNeeded: "Confirm willingness for research biopsies at baseline, week 3 and progression.",
    },
    {
      id: "NCT06533826-inc-7",
      status: "pass",
      rationale:
        "Both parts are met: he recurred on adjuvant tamoxifen (January 2025, about 3 years in) and received first-line letrozole + leuprolide + abemaciclib, a CDK4/6 inhibitor, with progression on 2026-09-11.",
      evidence: [
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-inc-8",
      status: "pass",
      rationale:
        "No chemotherapy in the metastatic setting; his only chemotherapy was adjuvant ddAC-T ending 10/2021, which contains no topoisomerase I inhibitor, with no residual toxicity recorded.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-inc-9",
      status: "pass",
      rationale: "Within the 0–1 prior metastatic lines allowed for ADC1 T-DXd: no prior metastatic chemotherapy and a single endocrine + CDK4/6 inhibitor line.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-10",
      status: "pass",
      rationale: "Within the 0–1 prior metastatic lines allowed for ADC1 Dato-DXd: no prior metastatic chemotherapy and a single endocrine + CDK4/6 inhibitor line.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-11",
      status: "not-applicable",
      rationale: "Applies to ADC2 T-DXd cohorts (after progression on Dato-DXd); he has had no ADC and would enter an ADC1 cohort.",
    },
    {
      id: "NCT06533826-inc-12",
      status: "not-applicable",
      rationale: "Applies to ADC2 Dato-DXd cohorts (after progression on T-DXd); he has had no ADC and would enter an ADC1 cohort.",
    },
    {
      id: "NCT06533826-inc-13",
      status: "pass",
      rationale:
        "Abemaciclib was stopped 2026-09-15 (13 days before 2026-09-28; 14 days on 9/29, before any feasible start) and its diarrhea has resolved. The A/P 'continue abemaciclib' line is a stale carry-forward.",
      evidence: [
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
        { quote: "Diarrhea resolved off abema.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent appears in his treatment history; all prior therapy was standard of care.",
    },
    {
      id: "NCT06533826-inc-15",
      status: "pass",
      rationale: "Only radiation was post-mastectomy RT in Nov–Dec 2021, far outside the 14-day window, with no ongoing radiation toxicity.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for treated CNS metastases; he has no known CNS disease (asymptomatic, nonfocal), though the brain has never been imaged.",
      evidence: [
        { quote: "No HA, visual change or focal weakness.", source: NOTE },
        { quote: "Has never had brain imaging.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if required for baseline staging.",
    },
    {
      id: "NCT06533826-inc-17",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for asymptomatic active brain metastases; none are known and he has no neurological symptoms, though no brain imaging exists.",
      evidence: [{ quote: "No brain MRI (asymptomatic); obtain if required for trial baseline.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-18",
      status: "pass",
      rationale: "He is on denosumab 120 mg every 4 weeks for bone metastases, which may continue on study.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: MEDS }],
    },
    {
      id: "NCT06533826-inc-19",
      status: "pass",
      rationale: "Age 61 (born 1965), above the 18-year minimum.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-20",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-21",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Labs 2026-09-22 meet the limits (ANC 1.7, platelets 190, Hgb 11.8, bilirubin 0.7, AST 26, ALT 31, creatinine 1.1), but INR/PT/aPTT are not on file, and the panel must fall within 2 weeks of the first dose.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
        { quote: "Cr 1.1 | eGFR 74", source: LABS },
      ],
      actionNeeded: "Obtain INR/PT and aPTT (≤ 1.5 × ULN); repeat CBC and chemistry if the first dose falls after 2026-10-06.",
    },
    {
      id: "NCT06533826-inc-22",
      status: "pass",
      rationale: "No unresolved toxicity above grade 1: abemaciclib diarrhea resolved after it was stopped, and no late effects of 2021 chemotherapy are recorded.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-23",
      status: "unknown",
      confidence: "medium",
      rationale: "Required for T-DXd cohorts. The only LVEF is 60% from 2021, before adjuvant doxorubicin, about 5 years old.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram (or MUGA) before registration; LVEF ≥ 50% required.",
    },
    {
      id: "NCT06533826-inc-24",
      status: "not-applicable",
      rationale: "Pregnancy testing applies to female participants of childbearing potential; he is a 61-year-old man.",
    },
    {
      id: "NCT06533826-inc-25",
      status: "pass",
      confidence: "low",
      rationale: "Applies to any female partner of childbearing potential; he had a vasectomy in 2005 and partner status is confirmed at screening.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-26",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to contraception for 4 months after treatment is confirmed at screening; vasectomy in 2005, partner status not documented.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06533826-inc-27",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT06533826-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent is in use; current medications are leuprolide, denosumab, lisinopril, rosuvastatin and calcium/vitamin D.",
    },
    {
      id: "NCT06533826-exc-2",
      status: "pass",
      rationale:
        "No topoisomerase I agent in any setting: prior chemotherapy was doxorubicin, cyclophosphamide and paclitaxel (adjuvant 2021), with no ADC or chemotherapy for metastatic disease.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-exc-3",
      status: "pass",
      confidence: "low",
      rationale: "No live vaccine is recorded; recent vaccinations are confirmed at screening.",
      actionNeeded: "Confirm no live attenuated vaccine within 30 days before the first dose.",
    },
    {
      id: "NCT06533826-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal or ocular surface disease appears in the history.",
      actionNeeded: "Baseline ophthalmology exam if the protocol requires it for Dato-DXd ocular monitoring.",
    },
    {
      id: "NCT06533826-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "He has never received T-DXd or Dato-DXd and has no recorded drug allergies.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT06533826-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No hypersensitivity to monoclonal antibodies is recorded; he receives denosumab every 4 weeks without reported reaction.",
      evidence: [
        { quote: "ALLERGIES: NKDA" },
        { quote: "denosumab 120 mg SC q4 weeks", source: MEDS },
      ],
    },
    {
      id: "NCT06533826-exc-7",
      status: "pass",
      rationale: "Surgical history is the 2021 mastectomy/ALND and a 2005 vasectomy; no surgery in the past 2 weeks.",
      evidence: [{ quote: "PSH: as above. Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06533826-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Intercurrent conditions are controlled hypertension (BP 138/82 on lisinopril) and hyperlipidaemia; no active infection or psychiatric illness recorded.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "No pneumonitis/ILD history, and CT 2026-09-11 reports nodules and a hilar node without interstitial change; the mild dry cough accompanies progressing lung metastases.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
        { quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "No COPD, asthma, pulmonary embolism, effusion or pneumonectomy is recorded; SpO2 96% on room air. He is a former 20 pack-year smoker without a COPD diagnosis.",
      evidence: [
        { quote: "No VTE. No DM.", source: NOTE },
        { quote: "SH: Former smoker, 20 pack-yrs, quit 2010.", source: NOTE },
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT06533826-exc-11",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG is documented, so QTcF cannot be assessed against the male threshold.",
      actionNeeded: "Obtain 12-lead ECG; QTcF must be ≤ 450 ms (male threshold).",
    },
    {
      id: "NCT06533826-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No coronary revascularisation, MI, angina, heart failure or stroke is recorded; cardiac history is hypertension and hyperlipidaemia only.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT06533826-exc-13",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Prostate adenocarcinoma Gleason 3+3=6 (GG1), diagnosed 11/2023, is untreated on active surveillance: within 3 years and not disease-free, so the low-risk pathway requires discussion with the study PI.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Discuss with the study PI: GG1 prostate cancer on active surveillance (dx 11/2023); provide the latest urology note/MRI.",
    },
    {
      id: "NCT06533826-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection is recorded; the exclusion applies only to known, poorly controlled HIV. Serology is not on file.",
    },
    {
      id: "NCT06533826-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No hepatitis B or C is recorded and liver tests are normal (AST 26, ALT 31, bilirubin 0.7); the exclusion applies to known active infection.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT06533826-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection is documented and no antimicrobials are listed; TB testing follows local practice.",
      actionNeeded: "Complete TB screening if required by local practice.",
    },
    {
      id: "NCT06533826-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "Nothing in the record suggests a condition or lab abnormality that would confound the study; final judgment rests with the investigator.",
    },
    {
      id: "NCT06533826-exc-18",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding exclusions apply to women; he is a 61-year-old man.",
    },
  ],
);
