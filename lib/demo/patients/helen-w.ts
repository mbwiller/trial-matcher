import type { DemoPatient } from "../patients";

/**
 * Helen W. (fictional) — early-stage, high-risk, node-positive HR+/HER2-low
 * breast cancer after upfront mastectomy and adjuvant TC; radiation ongoing,
 * deciding between adjuvant CDK4/6 inhibition and a clinical trial.
 */
export const PATIENT: DemoPatient = {
  id: "helen-w",
  label: "Helen W.",
  subtitle: "HR+/HER2-low stage IIIA · node-positive, high risk · adjuvant planning",
  age: 72,
  sex: "F",
  tags: ["HR+/HER2-low", "Early, high risk", "AF on apixaban"],
  record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Helen W. | MRN: 00-demo-8 | DOB: 1954 (72 yo F)
Date of service: 9/25/2026
Attending: J. Okafor MD (Breast Med Onc)

Reason: f/u after adj TC, on PMRT; adj CDK4/6i vs trial.

HPI: 72 yo postmenopausal F (menopause ~50, no HRT) w/ R breast IDC w/ lobular features, grade 3, found on screening mammo 4/2026, core bx 4/14/26. R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA. ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low), Ki-67 35%. Staging CT CAP + bone scan 5/2026 neg. Germline panel neg. Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26 - anthracycline avoided given pAF + LVEF 52%. Letrozole 2.5 mg started 9/8/26. PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.

Interval hx: Fatigue improving. G1 PN fingertps (numbness, buttons ok). Mild chest wall pinkness on RT, no desquamation. Mild hand stiffness since letrozole. No palpitatons, no bleeding on apixaban. No bone pain, cough, HA. No R arm swelling.

PMH: paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol; HTN; CKD 3a (baseline Cr 1.0-1.1); provoked DVT L leg 2019 after L TKA, completed 3 mo anticoagulation; osteopenia (DEXA 2025 T-score -2.1); HLD on atorvastatin.
PSH: L TKA 2019. R MRM 5/2026.
FHx: sister breast ca at 66.
SH: retired bookkeeper, lives w/ husband, never smoker, rare EtOH.

EXAM: ECOG 1. BP 136/78 HR 64 reg. Wt 68 kg. R chest wall: MRM scar healed, G1 RT erythema. No axillary/supraclav adenopathy. No R arm lymphedema. L breast no masses. Lungs clear. Heart RRR. Neuro: decr light touch fingertips.

A/P:
1. R breast ca, stage IIIA (pT2 pN2a), HR+/HER2-low, gr 3, Ki-67 35%, s/p MRM + adj TC x4, on PMRT + letrozole. NED.
- High risk: meets monarchE criteria (>=4 LN+) and NATALEE (stage III). Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial (e.g. adjuvant oral SERD or other escalation study). Would start after RT.
- Abemaciclib: VTE hx a concern (already on apixaban); diarrhea; Cr rise w/ CKD. Ribociclib: QTcF 448 borderline (<450 to start); CYP3A4 interaction w/ apixaban -> pharmacy review.
- Pt keen to hear about trials before deciding -> research coordinator. MRM blocks available.
- ctDNA (Signatera) not sent; would send if trial requires. Oncotype not done (N2).
- TC C3 today, counts ok, proceed; pegfilgrastim D2.
2. pAF: apixaban 5 mg BID, metoprolol succ. SR on ECG.
3. Bone health: zoledronic acid q6mo after RT, dental clearance pending. Vit D 24 -> D3 2000 IU.
4. CKD 3a stable. HTN on amlodipine (lisinopril - cough). Anemia Hgb 11.1 post-chemo, monitor.
RTC 4 wks (after RT) w/ research coordinator. 9/25 JO.

PATHOLOGY REPORT - FINAL
Specimen: Right breast and axillary contents, modified radical mastectomy
Procedure date: 05/12/2026 | Reported: 05/19/2026
DIAGNOSIS: Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm. E-cadherin positive.
Lymphovascular invasion: present. Margins: negative (closest deep 6 mm).
Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.
Pathologic stage (AJCC 8th): pT2 pN2a
Biomarkers (core bx 04/14/2026):
ER: positive, 90%, strong intensity
PR: positive, 5%, weak intensity
HER2 IHC: 2+ (equivocal)
HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low
Ki-67: 35%

GENETICS - Germline multigene panel (blood), reported 2026-06-09:
No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).

IMAGING
Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.
CT CHEST/ABDOMEN/PELVIS W/ CONTRAST + BONE SCAN - 2026-05-21
IMPRESSION: Post-mastectomy changes. No evidence of distant metastatic disease. Mild degenerative changes of the spine.

ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.
ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.

LABS 2026-09-23
WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201
Cr 1.1 | eGFR 49 (L)
AST 22 | ALT 18 | T bili 0.6 | Alk phos 84 | Ca 9.2
25-OH vitamin D 24 (L)

MEDICATIONS
- letrozole 2.5 mg PO daily (started 9/8/2026)
- apixaban 5 mg PO BID
- metoprolol succinate 50 mg PO daily
- amlodipine 5 mg PO daily
- atorvastatin 20 mg PO nightly
- calcium carbonate 600 mg / vitamin D3 800 IU daily
- docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)
- zoledronic acid 4 mg IV q6 mo - PLANNED after RT

ALLERGIES: lisinopril (cough)`,
};
