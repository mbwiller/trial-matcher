import type { DemoPatient } from "../patients";

/**
 * Aisha K. — de novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), progressed on
 * first-line pembrolizumab + gemcitabine/carboplatin; ADC-naive; anti-HBc
 * positive on entecavir. Fictional. The A/P carries one stale copy-forward line
 * ("C9 D1 pembro/gem/carbo today ... continue") that the profile must not trust.
 */
export const PATIENT: DemoPatient = {
  id: "aisha-k",
  label: "Aisha K.",
  subtitle: "TNBC metastatic · PD-L1 CPS 15 · progressed on pembrolizumab + chemo",
  age: 46,
  sex: "F",
  tags: ["TNBC", "Metastatic", "ADC-naive"],
  record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Aisha K. | MRN: 00-demo-4 | DOB: 1980 (46 yo F)
Date of service: 9/25/26
Attending: J. Okafor MD (Breast Med Onc)

Reason: PD on 1L pembro + gem/carbo; 2L planning, trials.

HPI: 46 yo premenopausal F (s/p BTL 2014) w/ de novo metastatic L breast IDC, grade 3, ER 0%/PR 0%/HER2 IHC 0 (TNBC, not HER2-low), dx Nov 2025. Staging 11/2025: L breast mass 5.6 cm, bilat lung nodules, mediastinal/hilar lymphadenopthy, lytic T11 + L iliac lesions (cT3 cN2 M1). RLL nodule bx 11/20/25 c/w met TNBC, PD-L1 (22C3) CPS 15. Germline panel neg. 1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025, w/ denosumab + entecavir ppx. Best response PR (CT 3/2026). irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis. 1u PRBC 7/2026 for chemo-related anemia.

Interval hx: Last gem/carbo 8/26/26. Pembro deferred 1 wk for AST/ALT ~2x ULN (HBV DNA neg), last dose 9/2/26. CT CAP 9/15/26 w/ PD: new 2.1 cm seg VI liver lesion, RLL nodule 1.2 -> 1.8 cm, bones stable. All tx on hold since. G1 fatigue, works part-time from home. No cough/hemoptysis. No HA, no visual chnages, no focal weakness. Wt down 1 kg. Minimal bone pain.

PMH: irAE hypothyroidism, HBV core Ab+ (HBsAg neg). No autoimmune dz prior to pembro. No DM, no cardiac hx.
SH: accountant, 2 kids, never smoker.

EXAM: ECOG 1. BP 118/72 HR 88 SpO2 98% RA. Wt 68.4 kg. L breast 2.5 cm UOQ mass. No supraclav nodes. Lungs clear. Abd soft, nontender. Neuro nonfocal.

A/P:
1. De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met. PD on 1L pembro + gem/carbo after ~9 mo. Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.
- No prior taxane, anthracycline, ADC or PARP inhibitor.
- Discussed 2L sacituzumab govitecan (ASCENT) vs clinical trial of novel ADC. Pt interested in trials, hopes to start within 3-4 wks. Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.
- C9 D1 pembro/gem/carbo today, tolerating, plts ok, continue q3w.
- UGT1A1 genotype not done - will send.
- No echo or ECG on file; order if trial requires.
- No brain imaging since baseline 11/2025; asymptomatic.
2. irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.
3. HBV (anti-HBc+, HBsAg neg): entecavir ppx, HBV DNA undetectable 8/2026. Continue >=12 mo after last tx.
4. AST/ALT ~1.5x ULN, bili nl: likely liver met, no features of immune hepatitis.
5. Anemia (chemo-related): Hgb 9.8, no bleeding.
6. Bone mets: denosumab 120 mg q4w + Ca/vit D.
RTC 1 wk w/ research coordinator. 9/25 JO.

PATHOLOGY REPORT - FINAL
Specimen: Lung, right lower lobe nodule, CT-guided core biopsy
Collected: 11/20/2025 | Reported: 11/25/2025
DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).
ER: negative (0%)
PR: negative (0%)
HER2 IHC: 0 (no staining observed) - not HER2-low
PD-L1 IHC (22C3 pharmDx): CPS 15
PRIOR PATHOLOGY: L breast core bx 11/12/2025: IDC, grade 3 (Nottingham 9/9), ER 0%, PR 0%, HER2 IHC 0, Ki-67 80%.
Note: no re-biopsy at progression; receptor status per 2025 tissue.

MOLECULAR - Tissue NGS (RLL core bx), reported 2025-12-12:
TP53 p.R248Q (c.743G>A), VAF 41% - pathogenic
PIK3CA: no alterations detected (wild-type)
BRCA1/BRCA2: no alterations detected
TMB: 4 mut/Mb (low). MSI: stable (MSS).

GENETICS - Germline panel (blood), reported 12/09/2025: NEGATIVE (BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM).

IMAGING
CT CHEST/ABDOMEN/PELVIS W/ CONTRAST - 2026-09-15
Comparison: CT 2026-06-11
IMPRESSION:
1. New 2.1 cm hypoattenuating lesion in hepatic segment VI, consistent with metastasis.
2. Right lower lobe nodule increased from 1.2 cm to 1.8 cm. Other pulmonary nodules and mediastinal/hilar nodes stable.
3. Sclerotic (treated) T11 and left iliac lesions, unchanged.
4. No interstitial lung disease or pneumonitis.
MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.

LABS 2026-09-23
WBC 3.9 (L) | ANC 1.6 | Hgb 9.8 (L) | Plt 132 (L)
Cr 0.7
AST 58 (H, 1.5x ULN) | ALT 61 (H, 1.5x ULN) | T bili 0.9 | Alk phos 162 (H) | Albumin 3.7
TSH 2.2
HBV DNA 08/28/2026: not detected
Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg

MEDICATIONS
- levothyroxine 88 mcg PO daily
- entecavir 0.5 mg PO daily (HBV ppx)
- denosumab 120 mg SC q4 weeks
- ondansetron 8 mg PO q8h prn nausea
- calcium carbonate 600 mg / vitamin D3 800 IU daily
- pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)

ALLERGIES: penicillin (hives)`,
};
