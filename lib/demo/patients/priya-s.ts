import type { DemoPatient } from "../patients";

/**
 * Priya S. — fictional demo patient. Newly diagnosed, treatment-naive HR+/HER2+
 * stage IIIA right breast cancer; neoadjuvant planning while an oocyte
 * cryopreservation cycle is under way and a contralateral MRI finding awaits biopsy.
 */
export const PATIENT: DemoPatient = {
  id: "priya-s",
  label: "Priya S.",
  subtitle: "HR+/HER2+ stage IIIA · treatment-naive · neoadjuvant planning",
  age: 34,
  sex: "F",
  tags: ["HR+/HER2+", "Early, neoadjuvant", "L breast bx pending"],
  record: `MEDICAL ONCOLOGY NEW PATIENT CONSULT
Pt: Priya S. | MRN: 00-demo-6 | DOB: 1992 (34 yo F)
Date of service: 9/23/2026
Attending: J. Okafor MD (Breast Med Onc)

CC: newly dx R breast ca, triple positive, neoadj tx planning.

HPI: 34 yo premenopausal F, G0, self-palpated R breast lump early Aug 2026. Dx mammo/US 8/28/26: 5.2 cm irregular mass R breast 10 o'clock + 2 abnormal R axillary LNs. US-guided core bx 9/3/26: IDC grade 3, ER 60% moderate, PR 20%, HER2 IHC 3+, Ki-67 45%; R axillary LN FNA + for carcinoma, clips placed. Breast MRI 9/11: R mass 5.4 cm, no skin/chest wall involvement, 3 abnl level I nodes; ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending. PET/CT 9/15: FDG-avid R breast mass + R axillary nodes, no distant mets. Echo 9/17 LVEF 63%. Germline panel sent 9/10 (mother breast ca at 52) - pending.
No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.

Fertilty: wants biological children. Seen by REI 9/16; oocyte cryopreservation cycle in progress (letrozole + gonadotropins, random start 9/21), retrieval planned ~10/5. Wants to start neoadj tx wk of 10/12. LMP 9/8/2026. Contraception: condoms.

Oncologic hx: s/p R lumpectomy + SLNB, on adjuvant therapy - see prior notes.

PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.
PSH: none.
FHx: mother breast ca at 52 (alive). No known ovarian ca.
SH: software engineer, never smoker, rare EtOH.

EXAM: ECOG 0. BP 116/72 HR 74 afebrile. R breast 5 cm firm mobile mass 10 o'clock, no skin changes, no nipple retraction. Palpable mobile R axillary node ~1.5 cm. No supraclav/cervical nodes. L breast no palpable mass. Lungs clear. Abd benign.

A/P:
1. R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.
- Standard option: neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery, adj tx per path response.
- Pt interested in trials (neoadj de-escalation or novel anti-HER2 agent) - referred to research coordinator. Stim cycle may affect trial start/washout timing.
- L breast BI-RADS 4 focus: MRI bx 9/30; contralateral bx + germline result will inform surgical planning.
- Port placement to be scheduled.
- Hep B/C + HIV serologies sent 9/22 - pending.
2. Fertility: coordinate w/ REI, start tx after retrieval.
3. Asthma: stable.
RTC 10/7 to finalize plan. 9/23 JO.

PATHOLOGY REPORT - FINAL
Specimen: A. Right breast 10 o'clock, US-guided core biopsy; B. Right axillary lymph node, FNA
Collected: 2026-09-03 | Reported: 2026-09-08
DIAGNOSIS:
A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.
B. Positive for metastatic carcinoma, c/w breast primary.
ER: positive, 60% of tumor cells, moderate intensity
PR: positive, 20% of tumor cells, weak to moderate intensity
HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells
HER2 ISH: not performed (IHC 3+)
Ki-67: 45%

GENETICS
Germline multigene panel (blood) sent 09/10/2026 - RESULT PENDING.

IMAGING
DIAGNOSTIC MAMOGRAM + US - 08/28/2026: R breast 10:00 5.2 cm irregular hypoechoic mass, BI-RADS 5. Two R axillary LNs w/ cortical thickening. L breast negative.

MRI BREASTS BILATERAL W/ AND W/O CONTRAST - Sept 11, 2026
IMPRESSION:
1. Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place. No skin, nipple, pectoralis or chest wall involvement.
2. Three abnormal R level I axillary nodes. No internal mammary or supraclavicular adenopathy.
3. L breast upper inner quadrant 6 mm enhancing focus, plateau kinetics, indeterminate. BI-RADS 4. MRI-guided biopsy recommended.

PET/CT - 09/15/26
FDG-avid R breast mass (SUVmax 9.8) and R axillary nodes (SUVmax 5.1). No FDG-avid distant metastases. L breast focus not FDG-avid (below PET resolution).

ECHO 9/17/2026: LVEF 63%, normal LV size and function.
ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.

LABS 2026-09-22
WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255
Cr 0.6 | Na 140 | K 4.0
AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4
hCG (serum) negative
HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending

MEDICATIONS
- albuterol HFA 2 puffs q4-6h prn wheeze
- letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026
- follitropin alfa + menotropins SC nightly - ovarian stimulation per REI
- prenatal vitamin PO daily

ALLERGIES: NKDA`,
};
