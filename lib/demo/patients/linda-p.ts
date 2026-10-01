import type { DemoPatient } from "../patients";

/**
 * Linda P. (fictional) — HR+/HER2-negative (IHC 0) invasive lobular carcinoma,
 * bone-only metastatic disease, ESR1 Y537S on ctDNA after first-line AI + CDK4/6i.
 * Not RECIST-measurable; borderline QTcF on escitalopram; no LVEF, no germline testing.
 * The A/P carries one stale copy-forward line ("Continue ribociclib ...") although
 * letrozole/ribociclib were stopped on 9/14/2026 for progression.
 */
export const PATIENT: DemoPatient = {
  id: "linda-p",
  label: "Linda P.",
  subtitle: "HR+/HER2- lobular · bone-only metastatic · ESR1 Y537S after CDK4/6i",
  age: 67,
  sex: "F",
  tags: ["HR+/HER2-", "Bone-only metastatic", "ESR1 Y537S"],
  record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Linda P. | MRN: 00-demo-5 | DOB: 1959 (67 yo F)
Date of service: 25-Sep-2026
Attending: J. Okafor MD (Breast Med Onc)

CC: bone PD on letrozole/ribociclib, ctDNA back, 2L planning.

HPI: 67 yo postmenopausal F w/ hx L breast ILC (classic) dx 7/2017, stage IIB (pT2 pN1mi), grade 2, ER 95% PR 40% HER2 0. s/p L mastectomy + SLNB 8/2017, Oncotype RS 14 -> no chemo, no PMRT. Adj anastrozole 10/2017-10/2022 (5 yrs completed). May 2024 hip/back pain -> bone scan + CT: multiple bone mets (T/L spine, pelvis, ribs, L prox femur), no visceral dz. CT-guided L iliac bx 5/2024 c/w met lobular ca, ER 90% PR 5% HER2 0. Palliative RT L hip 8 Gy x1 7/2024. 1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia) + zoledronic acid, best response SD.

Interval hx: Rising CA 27.29 + worse back pain -> PET/CT 9/9/26 w/ bone PD (new T10, sacrum, R acetabulum), no visceral dz. Ribociclib/letrozole stopped 9/14/26 (~27 mo). Pain L hip/low back 3-4/10, tramadol 1-2x/day, walking limited to ~2 blocks, cane outdoors, independant in ADLs. No new weakness, numbness or bowel/bladder sx. No HA or visual chnages.

PMH: CKD 3a, T2DM diet-controlled (A1c 6.4% 8/2026), osteoporosis (DEXA 2021 T-score -2.6), depression.
FHx: mother colon ca at 80. No known breast/ovarian ca. Germline genetic testing never done.
SH: widowed, lives alone, never smoker, no EtOH.

EXAM: ECOG 1. BP 136/82 HR 70. Wt 66 kg. L mastectomy scar healed, no chest wall nodules. No axillary/supraclav LAD. Tender over L iliac crest + lower T-spine. Antalgic gait. LE strength 5/5, no sensory level.

A/P:
1. Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only, ESR1 Y537S on ctDNA, PD on 1L AI + CDK4/6i after ~27 mo.
- Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only). Mixed lytic/sclerotic lesions; L iliac lytic component 2.3 cm, no soft tissue mass.
- No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.
- Options: elacestrant (ESR1m, >12 mo on prior CDK4/6i) vs fulvestrant-based combination vs clinical trial of next-gen oral SERD. Pt prefers oral tx, open to trials -> research coordinator.
- Continue ribociclib 400 mg 3 wks on/1 off + letrozole, ECG next cycle.
- PIK3CA/AKT1/PTEN neg on ctDNA only; bone bx decalcified, no tissue NGS.
- No brain imaging to date (asymptomatic); MRI if trial requires.
- Germline testing offered, pt agreeable, will send.
2. Bone mets: zoledronic acid q12 wks (last 8/14/26) + Ca/vit D. No ONJ.
3. QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram. K/Mg ok. If trial requires QTcF <450 consider switch to sertraline.
4. CKD 3a - eGFR 52, stable. 5. T2DM diet-controlled. 6. Depression - escitalopram 10 mg, stable.
RTC 2 wks. 9/25 JO.

PATHOLOGY REPORT - FINAL
Specimen: Bone, left iliac, CT-guided core biopsy (decalcified)
Collected: 05/21/2024 | Reported: 05/29/2024
DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.
IHC: GATA3+, CK7+, E-cadherin negative.
ER: positive, 90%, strong
PR: positive, 5%, weak
HER2 IHC: 0 (negative)

PRIOR PATHOLOGY (summary): L mastectomy + SLNB 08/2017: invasive lobular carcinoma, classic type, grade 2, 3.4 cm, margins neg, 1/3 SLN micromet (1.2 mm). pT2 pN1mi. E-cadherin negative. ER 95% strong, PR 40%, HER2 IHC 0. Oncotype DX RS 14.

MOLECULAR - Guardant360 CDx (ctDNA), collected 2026-09-16, reported 2026-09-23:
ESR1 p.Y537S, VAF 2.1%
CDH1 p.Q706*, VAF 1.8%
PIK3CA, AKT1, PTEN: not detected
ERBB2: no alterations detected
BRCA1/BRCA2: not detected

IMAGING
FDG PET/CT - 09/09/2026
Comparison: CT CAP + bone scan 04/2026
IMPRESSION:
1. Progression of osseous metastases: new FDG-avid sclerotic/mixed lesions at T10, sacrum and R acetabulum; increased uptake in known L1, L4, L ilium and L 7th rib lesions.
2. Mixed lytic/sclerotic L iliac lesion, lytic component 2.3 cm, no extraosseous soft tissue component.
3. No FDG-avid visceral, nodal or soft tissue disease.

ECG 9/17/2026: NSR 68, QTcF 462 ms.
No echocardiogram on file.

LABS 2026-09-22
WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168
Cr 1.1 | eGFR 52 (L) | K 4.2 | Mg 1.9 | Ca 9.4
AST 24 | ALT 19 | T bili 0.5 | Alk phos 162 (H) | Albumin 3.8
CA 27.29 142 (H) (06/2026: 88)
HbA1c 6.4% (08/2026)

MEDICATIONS
- zoledronic acid 3.5 mg IV q12 weeks (renal dose)
- tramadol 50 mg PO q6h prn pain
- escitalopram 10 mg PO daily
- calcium + vitamin D3 daily
- letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)

ALLERGIES: codeine (nausea)`,
};
