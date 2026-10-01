import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06324357",
  "Fits a post-T-DXd HER2+ breast cohort · QTcF and QT-risk screen not yet done",
  "Rosa would enter one of the T-DXd-pretreated breast cohorts (D, H, I or J): HER2 IHC 3+ on breast and liver tissue, progression on THP/HP and then on T-DXd in July 2026, measurable liver disease and ECOG 1. She has never had a HER2 TKI, T-DM1 or capecitabine, so the cohort D/H prior-therapy restrictions do not apply, and her SRS-treated brain metastases are stable off steroids. Outstanding are a screening ECG (mean QTcF ≤ 470 msec) with potassium/magnesium and a QT-risk history, a repeat echo if randomization falls after 8 October, and confirmation that the 2024 archival blocks are available; the full protocol lists further exclusions.",
  [
    {
      id: "NCT06324357-inc-1",
      status: "pass",
      rationale: "She is 66 years old, well above the age of consent.",
      evidence: [{ quote: "66 yo postmenopausal F", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT06324357-inc-2",
      status: "pass",
      rationale: "HER2-positive metastatic breast cancer: IHC 3+ on the January 2024 breast core and on the liver metastasis biopsy (2024-01-23), with lung, nodal, liver and brain metastases.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology 2024-01-19" },
      ],
    },
    {
      id: "NCT06324357-inc-3",
      status: "not-applicable",
      rationale: "Applies to the colorectal cancer cohorts (L, L-ext, M and N) only; she has HER2-positive metastatic breast cancer.",
      evidence: [],
    },
    {
      id: "NCT06324357-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Archival tissue exists from the January 2024 breast core, axillary node core and liver biopsy, none from an irradiated site (SRS was to the brain only); block availability is not documented and the requirement is 'if possible'.",
      evidence: [
        { quote: "Specimen: Right breast mass core biopsy; right axillary LN core biopsy", source: "Pathology 2024-01-19" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology 2024-01-19" },
      ],
      actionNeeded: "Request the 2024 breast core and liver biopsy blocks from pathology and confirm sufficient tissue for submission",
    },
    {
      id: "NCT06324357-inc-5",
      status: "pass",
      rationale: "Two palliative lines for de novo stage IV disease: first-line THP then trastuzumab/pertuzumab maintenance (2/2024–3/2025) and second-line T-DXd (4/2025–7/2026).",
      evidence: [{ quote: "PD on 1L THP/HP and 2L T-DXd", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT06324357-inc-6",
      status: "pass",
      rationale: "Progressed on first-line trastuzumab/pertuzumab (new liver lesions 3/2025) and then on T-DXd, with hepatic progression on CT 7/20/2026 and new brain metastases, meeting the T-DXd-pretreated requirement of cohorts D, H, I and J.",
      evidence: [
        { quote: "PD 3/2025 w/ new liver lesions.", source: "Clinic note 2026-09-24" },
        { quote: "2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026)", source: "Clinic note 2026-09-24" },
        { quote: "Progression of hepatic metastases", source: "CT CAP 2026-07-20" },
      ],
    },
    {
      id: "NCT06324357-inc-7",
      status: "not-applicable",
      rationale: "Applies to the colorectal cancer cohorts (L, L-ext, M and N) only; her eligibility runs through the HER2-positive breast cohorts.",
      evidence: [],
    },
    {
      id: "NCT06324357-inc-8",
      status: "pass",
      rationale: "Liver metastases of 2.8 cm (segment VII) and 2.2 cm (segment V) on CT 7/20/2026 are RECIST 1.1-measurable; that scan is 10 weeks old, so baseline imaging must be repeated.",
      evidence: [{ quote: "Measurable liver dz: seg VII 2.8 cm, seg V 2.2 cm.", source: "Clinic note 2026-09-24" }],
      actionNeeded: "Repeat CT chest/abdomen/pelvis within the protocol's baseline imaging window",
    },
    {
      id: "NCT06324357-inc-9",
      status: "pass",
      rationale: "ECOG 1 at the 9/24/2026 visit, with mild fatigue and a steady gait.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT06324357-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Tucatinib, lapatinib, neratinib and T-DM1 were never given, and capecitabine is absent from her documented history (THP, HP, T-DXd), so the cohort D/H bars do not apply; prior T-DXd excludes only cohorts E and F, which she would not enter.",
      evidence: [{ quote: "No prior tucatinib, T-DM1, lapatinib or neratinib.", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT06324357-exc-2",
      status: "pass",
      rationale: "Three brain metastases treated with Gamma Knife SRS on 8/7/2026 are smaller on MRI 9/12/2026 with no new lesions or edema; headaches resolved, no deficits, dexamethasone off since 8/30 (29 days). No leptomeningeal disease reported.",
      evidence: [
        { quote: "Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids.", source: "Clinic note 2026-09-24" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
        { quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Clinic note 2026-09-24" },
      ],
    },
    {
      id: "NCT06324357-exc-3",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG or QTc measurement is on file; resting heart rate was 82 and there is no cardiac history beyond treated hypertension.",
      evidence: [],
      actionNeeded: "Obtain triplicate resting ECG at screening; mean QTcF must be ≤ 470 msec",
    },
    {
      id: "NCT06324357-exc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "No heart failure (LVEF 55%, asymptomatic, no CAD), but potassium is not in the 9/22 panel and family history of long QT or sudden death is not recorded; olanzapine appears only in a stale copy-forward line, not on the medication list.",
      evidence: [{ quote: "LVEF 55% on 9/10/26 echo (baseline 62% in 2024), asymptomatic.", source: "Clinic note 2026-09-24" }],
      actionNeeded: "Check K+ and Mg2+, take a family history of long QT or sudden death under 40, and confirm no current olanzapine or other QT-prolonging drug",
    },
    {
      id: "NCT06324357-exc-5",
      status: "pass",
      rationale: "LVEF 55% by biplane Simpson's on 9/10/2026 (62% in 01/2024, 58% in 03/2025), above 50%; the echo is 18 days old and leaves the 28-day window after 10/8/2026.",
      evidence: [{ quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" }],
      actionNeeded: "Repeat echocardiogram if randomization is after 2026-10-08; LVEF ≥ 50% and ≥ institutional LLN required",
    },
    {
      id: "NCT06324357-exc-6",
      status: "pass",
      rationale: "No ILD or pneumonitis at any point during 15 months of T-DXd, and CT 7/20/2026 shows no interstitial abnormality or ground-glass opacity; screening CT will need to confirm.",
      evidence: [
        { quote: "no ILD/pneumonitis at any point (serial CT chest w/o interstitial changes)", source: "Clinic note 2026-09-24" },
        { quote: "No interstitial lung abnormality or ground-glass opacity.", source: "CT CAP 2026-07-20" },
      ],
    },
  ],
);
