import type { DemoPatient } from "../patients";

/**
 * James T. — fictional demo patient. Male breast cancer, HR+/HER2-low metastatic,
 * germline BRCA2, progressed on first-line AI + GnRH agonist + CDK4/6 inhibitor.
 * Second malignancy (low-risk prostate cancer on active surveillance) exercises
 * "other malignancy" exclusions; sex exercises female-only enrollment.
 */
export const PATIENT: DemoPatient = {
  id: "james-t",
  label: "James T.",
  subtitle: "Male breast cancer · HR+/HER2-low metastatic · germline BRCA2",
  age: 61,
  sex: "M",
  tags: ["HR+/HER2-low", "Metastatic", "Male · gBRCA2"],
  record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: James T. | MRN: 00-demo-7 | DOB: 1965 (61 yo M)
Date of service: 9/25/2026
Attending: J. Okafor MD (Breast Med Onc)

CC: f/u metastatic male breast ca, PD on 1L tx; 2L planning.

HPI: 61 yo M w/ hx L breast IDC dx 4/2021, grade 2, ER+/PR+/HER2 1+, stage IIB (pT2 pN1a), s/p L mastectomy + ALND 5/2021, adj ddAC-T 6/2021-10/2021, PMRT 11-12/2021, then adj tamoxifen from 1/2022. Germline BRCA2 pathogenic variant 6/2021. Jan 2025 (~3 yrs into tamoxifen) cough + back pain -> CT/bone scan: bilat lung nodules, bone mets (T6, L2, L iliac). CT-guided LLL bx 1/22/25 c/w met breast ca, ER 85% PR 30% HER2 1+/ISH neg (HER2-low). Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.

Interval hx: CT 9/11/26 w/ PD in chest (RUL nodule 1.1 -> 1.6 cm, new R hilar LN 1.7 cm SA), bone dz stable. Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26). Mild dry cough, no hemoptsis, no SOB. No HA, visual change or focal weakness. Has never had brain imaging. Diarrhea resolved off abema.

PMH: HTN, HLD. Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated. No VTE. No DM.
PSH: as above. Vasectomy 2005.
FHx: sister breast ca at 47. Daughter BRCA2+ (cascade testing).
SH: Former smoker, 20 pack-yrs, quit 2010. 1-2 beers/wk.

EXAM: ECOG 1. BP 138/82 HR 72 SpO2 96% RA. L chest wall healed, no nodularity. Lungs: few ronchi R upper field. Abd benign. Spine nontender. Neuro nonfocal.

A/P:
1. Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone), gBRCA2, PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo. Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA. Bone mets stable.
- No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.
- 2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later. Pt keen on trials. Many breast trials enroll women only - will ask research coordinator which studies accept men.
- Abemaciclib 150 mg BID C19, diarrhea G1 controlled w/ loperamide, continue.
- Consider ctDNA to reassess ESR1 at PD - not yet sent.
- Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.
- No brain MRI (asymptomatic); obtain if required for trial baseline.
2. Bone mets: continue denosumab 120 mg q4w + Ca/vit D.
3. Continue leuprolide 22.5 mg q3 mo for now; testosterone castrate.
4. Prostate ca on AS: PSA suppressed on leuprolide; urology following w/ MRI. ?exclusionary 2nd malignancy for trials.
5. HTN/HLD - lisinopril, rosuvastatin.
RTC 1-2 wks w/ research coordinator. 9/25 JO.

PATHOLOGY REPORT - FINAL
Specimen: Lung, left lower lobe nodule, CT-guided core biopsy
Collected: 2025-01-22 | Reported: 2025-01-27
DIAGNOSIS: Metastatic carcinoma, consistent with breast primary.
ER: positive, 85% of tumor cells, strong intensity
PR: positive, 30% of tumor cells, moderate intensity
HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)
HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)

PRIOR PATHOLOGY (summary): L mastectomy + ALND 05/2021: IDC, grade 2 (Nottingham 7/9), 2.6 cm, margins neg, 2/12 LNs positive (no ENE). pT2 pN1a. ER 90%, PR 70%, HER2 IHC 1+ (negative), Ki-67 15%.

GENETICS - Germline panel (blood), reported 06/2021:
BRCA2 c.5946delT (p.Ser1982ArgfsTer22) - PATHOGENIC
No other pathogenic variants (BRCA1, PALB2, CHEK2, ATM, TP53 negative).

MOLECULAR - Tissue NGS (LLL core bx), reported 2025-02-12:
BRCA2 c.5946delT, VAF 81% - germline variant w/ loss of heterozygosity
PIK3CA: no alterations detected (wild-type)
ESR1: no alterations detected (wild-type)
AKT1/PTEN: no alterations detected
TMB: 5 mut/Mb (low). MSI: stable.

IMAGING
CT CHEST/ABDOMEN/PELVIS W/ CONTRAST - 09/11/2026
Comparison: CT 06/04/2026
IMPRESSION:
1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.
2. Sclerotic osseous metastases T6, L2 and left iliac bone, unchanged.

LABS 2026-09-22
WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190
Cr 1.1 | eGFR 74
AST 26 | ALT 31 | T bili 0.7 | Alk phos 118
PSA 0.2 (pre-leuprolide 4.1, 12/2024)
Testosterone <20 ng/dL (castrate)

MEDICATIONS
- leuprolide 22.5 mg IM q3 months (last 08/14/2026)
- denosumab 120 mg SC q4 weeks
- lisinopril 20 mg PO daily
- rosuvastatin 10 mg PO daily
- calcium 600 mg + vitamin D3 800 IU daily
- abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)

ALLERGIES: NKDA`,
};
