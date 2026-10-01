import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const NGS = "Tissue NGS 2025-02-12";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07287917",
  "Excluded: prior doxorubicin (ddAC-T 2021) and no PIK3CA/AKT1/PTEN alteration for Cohort 1",
  "He would enter Cohort 1 (ER+/HER2- breast cancer on fulvestrant + capivasertib) and meets the setting, endocrine-history, ECOG and lab requirements; his GG1 prostate cancer falls within the protocol's low-risk exception. Two documented blockers remain: the protocol allows no prior Adriamycin and he received adjuvant ddAC-T in 2021, and Cohort 1 requires an actionable PIK3CA/AKT1/PTEN alteration whereas his 2025 tissue NGS was wild-type for all three. A new alteration on ctDNA would not overcome the doxorubicin exclusion.",
  [
    {
      id: "NCT07287917-inc-1",
      status: "fail",
      confidence: "medium",
      rationale:
        "Fragment of a criterion requiring standard-of-care therapy applicable to the diagnosis. Cohort 1's backbone is fulvestrant + capivasertib, and capivasertib is indicated only for PIK3CA/AKT1/PTEN-altered disease; his tumor is wild-type for all three.",
      evidence: [
        { quote: "PIK3CA: no alterations detected (wild-type)", source: NGS },
        { quote: "AKT1/PTEN: no alterations detected", source: NGS },
      ],
      actionNeeded: "Confirm the full criterion text with the sponsor; capivasertib eligibility would need a new PIK3CA/AKT1/PTEN alteration.",
    },
    {
      id: "NCT07287917-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Informed consent and willingness to follow study procedures are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-3",
      status: "pass",
      rationale: "Age 61 (born 1965), well above the 18-year minimum.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-4",
      status: "fail",
      rationale:
        "ER+/HER2-low metastatic disease, biopsy-proven, recurring on adjuvant tamoxifen satisfies the setting and endocrine-history arms, but Cohort 1 also requires an actionable PIK3CA/AKT1/PTEN alteration and tissue NGS of the lung metastasis (Feb 2025) found none.",
      evidence: [
        { quote: "PIK3CA: no alterations detected (wild-type)", source: NGS },
        { quote: "AKT1/PTEN: no alterations detected", source: NGS },
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
      ],
      actionNeeded: "Only a new PIK3CA/AKT1/PTEN alteration on ctDNA or re-biopsy at progression could change this (ctDNA considered, not yet sent).",
    },
    {
      id: "NCT07287917-inc-5",
      status: "not-applicable",
      rationale:
        "The premenopausal ovarian-suppression provision does not apply to a man (he is on leuprolide for testicular suppression), and the melanoma checkpoint-toxicity terms apply to Cohort 2 only.",
    },
    {
      id: "NCT07287917-inc-6",
      status: "not-applicable",
      rationale: "Melanoma diagnosis and prior checkpoint/BRAF-inhibitor requirements apply to Cohort 2 (melanoma) only; he would enter Cohort 1.",
    },
    {
      id: "NCT07287917-inc-7",
      status: "pass",
      rationale:
        "Measurable disease by RECIST 1.1: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11. The melanoma line-of-therapy text applies to Cohort 2.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases: asymptomatic with a nonfocal neurological exam, though the brain has never been imaged. The target lesions are right-sided, outside the 2021 left chest-wall radiation field.",
      evidence: [
        { quote: "No HA, visual change or focal weakness.", source: NOTE },
        { quote: "Has never had brain imaging.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging.",
    },
    {
      id: "NCT07287917-inc-9",
      status: "pass",
      confidence: "low",
      rationale:
        "Willingness for a fresh biopsy is confirmed at consent. The only archival tissue (LLL core, 2025-01-22) is over a year old and would not qualify, but lack of a biopsy does not preclude enrollment.",
      evidence: [{ quote: "Collected: 2025-01-22 | Reported: 2025-01-27", source: PATH }],
    },
    {
      id: "NCT07287917-inc-10",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "Life expectancy well beyond 12 weeks is implied: ECOG 1, low-volume lung/nodal progression without organ dysfunction, and stable bone disease.",
      evidence: [
        { quote: "EXAM: ECOG 1.", source: NOTE },
        { quote: "Bone mets stable.", source: NOTE },
      ],
    },
    {
      id: "NCT07287917-inc-12",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Labs 2026-09-22 meet the count and chemistry limits (ANC 1.7, platelets 190, Hgb 11.8, AST 26, ALT 31, bilirubin 0.7) with no G-CSF or transfusion recorded, but aPTT/PTT has not been measured.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
      actionNeeded: "Obtain aPTT/PTT; must be ≤ 1.5 × ULN.",
    },
    {
      id: "NCT07287917-inc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Creatinine 1.1 mg/dL (eGFR 74) is within ≤ 1.5 × ULN; no thyroid disease is listed, so he is presumed clinically euthyroid; no grade ≥ 3 lab abnormality on 2026-09-22. The Gilbert's clause does not apply.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
      actionNeeded: "Check TSH at screening if the protocol requires biochemical confirmation of euthyroid status.",
    },
    {
      id: "NCT07287917-inc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last myelosuppressive chemotherapy was adjuvant ddAC-T ending 10/2021; no growth factor or anti-neoplastic biologic is recorded; abemaciclib diarrhea resolved after it was stopped on 2026-09-15.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "Diarrhea resolved off abema.", source: NOTE },
      ],
    },
    {
      id: "NCT07287917-inc-15",
      status: "pass",
      confidence: "low",
      rationale:
        "Applies when a biologic with late adverse events was given; he has received no anti-neoplastic biologic. Ongoing denosumab (supportive bone therapy) can be raised with the medical monitor.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: MEDS }],
      actionNeeded: "Confirm with the medical monitor that ongoing denosumab is acceptable.",
    },
    {
      id: "NCT07287917-inc-16",
      status: "pass",
      confidence: "medium",
      rationale:
        "No anti-cancer monoclonal antibody has been given. He receives denosumab 120 mg q4w for bone metastases, a supportive antibody that is generally allowed but should be confirmed.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: MEDS }],
      actionNeeded: "Confirm continued denosumab is permitted under the monoclonal-antibody washout.",
    },
    {
      id: "NCT07287917-inc-17",
      status: "pass",
      rationale: "Only radiation was post-mastectomy chest-wall RT in Nov–Dec 2021, about 57 months ago, far beyond the 8–12 week minimum.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or solid organ transplant appears anywhere in the history.",
    },
    {
      id: "NCT07287917-inc-19",
      status: "not-applicable",
      rationale: "Neuropathy and endocrine-AE allowance applies to the pembrolizumab (melanoma) cohort only.",
    },
    {
      id: "NCT07287917-inc-20",
      status: "pass",
      rationale:
        "His only other cancer is prostate adenocarcinoma Gleason 3+3=6 (GG1), PSA 4.6 at diagnosis, on active surveillance, which matches exception (c): low-risk prostate cancer with Gleason < 7 and PSA < 10 ng/mL.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
    },
    {
      id: "NCT07287917-inc-21",
      status: "pass",
      confidence: "low",
      rationale: "Compliance and proximity are judged by the investigator at screening; he is due back with the research coordinator in 1–2 weeks.",
      evidence: [{ quote: "RTC 1-2 wks w/ research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to highly effective contraception is confirmed at screening; he had a vasectomy in 2005, though partner status is not documented.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07287917-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "Took oral abemaciclib and letrozole for about 19 months alongside other daily oral medications; no swallowing problem recorded.",
      evidence: [{ quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT07287917-exc-1",
      status: "not-applicable",
      rationale: "Header statement rather than a criterion; each exclusion is judged separately below (exc-7, prior doxorubicin, is triggered).",
    },
    {
      id: "NCT07287917-exc-2",
      status: "not-applicable",
      rationale:
        "Listed for patients with melanoma (Cohort 2) only. In any case he has had no radiation since 2021 and no biologic cancer therapy.",
    },
    {
      id: "NCT07287917-exc-3",
      status: "pass",
      rationale: "No corticosteroid or immunosuppressant on the medication list (leuprolide, denosumab, lisinopril, rosuvastatin, calcium/vitamin D).",
    },
    {
      id: "NCT07287917-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "No intolerance to fulvestrant, capivasertib or the study drugs is recorded (none previously given); he tolerated letrozole + abemaciclib for 19 months and has no drug allergies.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT07287917-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "No epilepsy, stroke, dementia or other CNS disorder in the PMH and no known CNS metastases; neurologically nonfocal, but the brain has never been imaged.",
      evidence: [
        { quote: "Neuro nonfocal.", source: NOTE },
        { quote: "Has never had brain imaging.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if baseline CNS imaging is required.",
    },
    {
      id: "NCT07287917-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory neurological disorder (Guillain-Barré, ALS, MS) appears in the history; neurological exam nonfocal.",
      evidence: [{ quote: "Neuro nonfocal.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-7",
      status: "fail",
      rationale:
        "He received dose-dense doxorubicin (Adriamycin) + cyclophosphamide → paclitaxel as adjuvant therapy in June–October 2021, and the protocol allows no prior Adriamycin. No radiation, surgery or chemotherapy in the last 4 weeks.",
      evidence: [{ quote: "adj ddAC-T 6/2021-10/2021", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-8",
      status: "pass",
      rationale:
        "Abemaciclib was stopped 2026-09-15, 13 days before 2026-09-28, so the 7-day small-molecule window has passed; no chemotherapy since 2021. The A/P line to 'continue' abemaciclib is a stale carry-forward.",
      evidence: [
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
        { quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS },
      ],
    },
    {
      id: "NCT07287917-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease or immunosuppressive treatment appears in the problem or medication lists.",
    },
    {
      id: "NCT07287917-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "Cardiac history is limited to treated hypertension and hyperlipidaemia; no coronary disease, arrhythmia or heart failure recorded. LVEF, ECG and cardiac markers are judged under the specific items below.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-11",
      status: "unknown",
      confidence: "medium",
      rationale:
        "BP 138/82 on lisinopril is below the 150/100 limit and no atherosclerotic events or revascularisation are recorded, but troponin I and BNP/NT-proBNP have not been measured.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE },
      ],
      actionNeeded: "Obtain troponin I and BNP or NT-proBNP at screening; both must be ≤ ULN.",
    },
    {
      id: "NCT07287917-exc-12",
      status: "unknown",
      confidence: "medium",
      rationale: "No heart-failure symptoms, but the only LVEF on record is 60% from 2021, before doxorubicin, and is about 5 years old.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram; LVEF ≥ 50% required.",
    },
    {
      id: "NCT07287917-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No arrhythmia, pacemaker or ICD recorded; heart rate 72 at the 2026-09-25 visit.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic disease with cardiac involvement (SLE, rheumatoid arthritis, systemic sclerosis) appears in the history.",
    },
    {
      id: "NCT07287917-exc-15",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG is documented, so QTcF and conduction abnormalities cannot be assessed.",
      actionNeeded: "Obtain 12-lead ECG; QTcF ≤ 450 ms with no bundle branch or fascicular block or 2nd/3rd-degree AV block.",
    },
    {
      id: "NCT07287917-exc-16",
      status: "pass",
      rationale: "Surgical history is the 2021 mastectomy/ALND and a 2005 vasectomy; no surgery in the past 4 weeks.",
      evidence: [{ quote: "PSH: as above. Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No infection requiring systemic therapy is documented; the mild dry cough accompanies progressing lung disease and no antimicrobials are listed.",
      evidence: [{ quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-18",
      status: "not-applicable",
      rationale: "Pregnancy, lactation and childbearing-potential rules apply to women; he is a 61-year-old man.",
    },
    {
      id: "NCT07287917-exc-19",
      status: "not-applicable",
      rationale: "FSH thresholds defining postmenopausal status apply to women only.",
    },
    {
      id: "NCT07287917-exc-20",
      status: "not-applicable",
      rationale: "HRT and postmenopausal-status provisions apply to women only.",
    },
    {
      id: "NCT07287917-exc-21",
      status: "not-applicable",
      rationale: "Documentation of surgical sterilisation (hysterectomy, oophorectomy, salpingectomy) applies to women only.",
    },
    {
      id: "NCT07287917-exc-22",
      status: "pass",
      rationale:
        "No unresolved toxicity above grade 1: abemaciclib diarrhea resolved after it was stopped, and no neuropathy from 2021 paclitaxel is recorded.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-23",
      status: "pass",
      confidence: "low",
      rationale: "Willingness and ability to comply with procedures are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-24",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Liver tests are normal (AST 26, ALT 31, bilirubin 0.7 on 2026-09-22) and no liver disease is listed, but hepatitis A IgM, HBsAg and HCV antibody have not been tested.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
      actionNeeded: "Obtain HAV IgM, HBsAg and HCV antibody (reflex HCV RNA); active hepatitis excludes.",
    },
    {
      id: "NCT07287917-exc-25",
      status: "pass",
      confidence: "medium",
      rationale: "Non-malignant conditions are hypertension and hyperlipidaemia, both controlled on medication; nothing likely to compromise protocol objectives.",
      evidence: [{ quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-26",
      status: "pass",
      confidence: "medium",
      rationale: "All prior therapy is standard (ddAC-T, PMRT, tamoxifen, letrozole + leuprolide + abemaciclib); no investigational agent is recorded.",
    },
    {
      id: "NCT07287917-exc-27",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease or resection affecting absorption; abdomen benign and he took oral abemaciclib and letrozole for about 19 months.",
      evidence: [{ quote: "Abd benign.", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies, and he has never received AMXT 1501, DFMO, fulvestrant or capivasertib.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT07287917-exc-29",
      status: "unknown",
      confidence: "medium",
      rationale:
        "He remains on leuprolide (3-month depot last given 2026-08-14) and whether it continues is undecided; the exception covers LHRH agonists only for premenopausal women, not testicular suppression in a man on fulvestrant.",
      evidence: [{ quote: "3. Continue leuprolide 22.5 mg q3 mo for now; testosterone castrate.", source: NOTE }],
      actionNeeded: "Ask the sponsor whether continued leuprolide is permitted for a man in Cohort 1; otherwise give no further depot after 8/14/2026.",
    },
    {
      id: "NCT07287917-exc-30",
      status: "pass",
      confidence: "medium",
      rationale: "Supplements listed are calcium and vitamin D only; no biotin-containing product is recorded.",
      evidence: [{ quote: "calcium 600 mg + vitamin D3 800 IU daily", source: MEDS }],
      actionNeeded: "Confirm no over-the-counter biotin or multivitamin supplying more than 30 μg/day.",
    },
    {
      id: "NCT07287917-exc-31",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled or acute infection is documented and no antimicrobials are listed.",
    },
    {
      id: "NCT07287917-exc-32",
      status: "pass",
      confidence: "medium",
      rationale: "This exception only relaxes the infection exclusion for well-controlled HIV. No HIV infection is recorded; serology is not on file.",
    },
    {
      id: "NCT07287917-exc-33",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease, active or past, appears in the problem list.",
    },
    {
      id: "NCT07287917-exc-34",
      status: "pass",
      confidence: "medium",
      rationale:
        "Low-risk prostate cancer (GG1) is on active surveillance and has never been treated; no progression is reported, though PSA is suppressed by leuprolide and the surveillance MRI results are not in the record.",
      evidence: [{ quote: "4. Prostate ca on AS: PSA suppressed on leuprolide; urology following w/ MRI.", source: NOTE }],
      actionNeeded: "Obtain the latest urology note or prostate MRI to confirm no progression.",
    },
    {
      id: "NCT07287917-exc-35",
      status: "not-applicable",
      rationale: "Pembrolizumab hypersensitivity applies to the melanoma cohort, which receives pembrolizumab; Cohort 1 receives fulvestrant + capivasertib.",
    },
    {
      id: "NCT07287917-exc-36",
      status: "pass",
      rationale: "Only thoracic radiation was post-mastectomy RT in Nov–Dec 2021, nearly 5 years ago, well outside the 6-month window.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT07287917-exc-37",
      status: "pass",
      confidence: "medium",
      rationale:
        "No pneumonitis or ILD in the history, and CT 2026-09-11 describes nodules, a hilar node and bone metastases without interstitial change.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
      ],
    },
    {
      id: "NCT07287917-exc-38",
      status: "pass",
      confidence: "medium",
      rationale: "No allogeneic stem cell or solid organ transplant appears in the history.",
    },
    {
      id: "NCT07287917-exc-39",
      status: "pass",
      confidence: "medium",
      rationale: "No radiation pneumonitis is recorded after the 2021 post-mastectomy radiation, and there is no recent radiotherapy or steroid requirement.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
  ],
);
