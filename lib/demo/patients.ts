/**
 * Bundled demo patient records (fictional).
 *
 * Each record is what a clinician would paste from the EHR: several documents
 * concatenated (latest clinic note first, then pathology, molecular, imaging,
 * labs, medications, allergies). They are deliberately messy — telegraphic
 * shorthand, inconsistent date formats, copy-forward lines from earlier visits
 * and a few harmless typos — because that is the input the LLM engine must
 * structure before matching. Names and MRNs are fictional.
 *
 * Keep the exported shape stable: `DEMO_PROFILES` and `DEMO_MATCHES` are keyed
 * by `DemoPatient.id`, and every evidence quote in `DEMO_PROFILES` must be a
 * verbatim substring of `record` (enforced by profiles.test.ts).
 */
export interface DemoPatient {
  /** Stable id, also the key into DEMO_PROFILES and DEMO_MATCHES. */
  id: string;
  /** Display name, e.g. "Margaret H." (fictional). */
  label: string;
  /** One-line clinical summary for the sample chip, e.g. "HR+/HER2-low metastatic · PIK3CA H1047R". */
  subtitle: string;
  /** The raw multi-document record exactly as it would be pasted from an EHR. */
  record: string;
}

export const DEMO_PATIENTS: DemoPatient[] = [
  {
    id: "margaret-h",
    label: "Margaret H.",
    subtitle: "HR+/HER2-low metastatic · PIK3CA H1047R · progressed on CDK4/6i",
    record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Margaret H. | MRN: 00-demo-1 | DOB: 1968 (58 yo F)
Date of service: 09/18/2026
Attending: J. Okafor MD (Breast Med Onc)

CC: f/u metastatic breast ca, PD on CDK4/6i, tx planning.

HPI: 58 yo postmenopausal F (natural menopause ~51) w/ hx L breast IDC dx 3/2019, ER+/PR+/HER2 neg (IHC 1+ on original path), stage IIB (pT2 pN1a), s/p lumpectomy + ALND 4/2019, adj ddAC-T 5/2019-9/2019, whole breast RT 10-11/2019, then adj anastrozole 12/2019 until recurrence. Feb 2025 presented w/ worsening low back pain -> bone scan + CT: sclerotic bone mets (T8, L3, R ilium) + 2 liver lesions. Liver bx 2/19/25 c/w met breast ca, ER 90% PR 10% HER2 1+/ISH neg (HER2-low). Tissue NGS: PIK3CA H1047R, ESR1 WT. Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.

Interval hx: CT 8/14/26 w/ PD in liver (new seg IV lesion 1.8 cm, seg VI lesion now 3.2 cm), bone dz stable. Palbo/letrozole stopped 8/20/26. Since then moderate fatigue (still does own shopping/housework), low back pain controlled on oxycodone 5 mg BID prn. No HA, no visual changes, no focal weakness, no N/V. Denies neuro sx. Has never had brain imaging. Appetite ok, wt stable. Tolerating denosumab, no dental isues.

PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.
PSH: as above. Port 2019, removed 2020.
FHx: no breast/ovarian ca in 1st degree relatives. Germline panel 2019 negative.
SH: retired teacher, never smoker, wine socially.

EXAM: ECOG 1. BP 132/78 HR 76 afebrile. Wt 71.2 kg. L breast post-surgical/RT changes, no local recurrence, no palpable nodes. Lungs CTA. Abd soft, mild RUQ fullness, nontender. Spine nontender to percusion. Neuro grossly nonfocal.

A/P:
1. Metastatic HR+/HER2-low breast ca, PIK3CA H1047R, ESR1 WT, PD on 1L AI + CDK4/6i after ~17 mo. Liver-dominant, measurable disease (seg VI 3.2 cm). Bone mets stable.
- Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial. Reviewed hyperglycemia/rash risk. Pt interested in trials, wants to hear options before deciding.
- Cycle 17 D1 today, ANC adequate, continue letrozole/palbociclib, RTC 4 wks.
- Needs HbA1c prior to any PI3K/AKT inhibitor - fasting glucose 104 on 9/15 labs, A1c not on file, will add to next draw.
- Echo: last TTE was pre-AC 2019 (LVEF 62%). Will order repeat if trial requires.
- No brain MRI at this time (asymptomatic); would obtain if required for trial baseline.
2. Bone mets: continue denosumab 120 mg q4w + Ca/vit D. Pain controlled.
3. HTN - amlodipine, controlled. 4. HLD - atorvastatin.
RTC 2 wks w/ research coordinator. Sept 18 - JO.

PATHOLOGY REPORT - FINAL
Specimen: Liver, segment VI, core needle biopsy
Collected: 2025-02-19 | Reported: 2025-02-24
DIAGNOSIS: Metastatic adenocarcinoma, consistent with breast primary.
IHC: GATA3+, mammaglobin+, CK7+/CK20-.
ER: positive, 90% of tumor cells, strong intensity
PR: positive, 10% of tumor cells, weak to moderate intensity
HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)
HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)

PRIOR PATHOLOGY (summary): L breast lumpectomy + ALND 04/2019: IDC, grade 2 (Nottingham 6/9), 2.4 cm, margins negative, LVI present, 2/14 LNs positive (largest 0.8 cm, no ENE). pT2 pN1a. ER 95% strong, PR 60%, HER2 IHC 1+ (negative), Ki-67 22%.

MOLECULAR - Tissue NGS (liver core bx), reported 2025-03-10:
PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic
ESR1: no alterations detected (wild-type)
TP53: no alterations detected
BRCA1/BRCA2: no alterations detected
TMB: 3.2 mut/Mb (low). MSI: stable.

IMAGING
CT CHEST/ABDOMEN/PELVIS W/ CONTRAST - 2026-08-14
Comparison: CT 2026-05-02
IMPRESSION:
1. Interval progression of hepatic metastases: new 1.8 cm hypoattenuating lesion in segment IV; segment VI lesion increased from 2.4 cm to 3.2 cm; segment VIII lesion 1.5 cm (previously 1.4 cm).
2. Sclerotic osseous metastases at T8, L3 and right iliac wing, unchanged.
3. No new pulmonary nodules. No adenopathy.

LABS 2026-09-15
WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210
Cr 0.8 | Na 139 | K 4.1
AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9
Glucose (fasting) 104 (H)
CA 15-3 68 (H)

MEDICATIONS
- denosumab 120 mg SC q4 weeks
- oxycodone 5 mg PO BID prn pain
- amlodipine 10 mg PO daily
- atorvastatin 20 mg PO nightly
- calcium carbonate 600 mg / vitamin D3 800 IU daily
- letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)

ALLERGIES: sulfa (rash)`,
  },
  {
    id: "danielle-r",
    label: "Danielle R.",
    subtitle: "TNBC · residual disease after neoadjuvant chemo-immunotherapy · gBRCA1",
    record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Danielle R. | MRN: 00-demo-2 | DOB: 1987 (39 yo F)
Date of service: 2026-09-22
Attending: J. Okafor MD (Breast Med Onc)

Reason: adj pembro C4; discuss adj olaparib vs cape.

HPI: 39 yo premenopausal F, G2P2, LNG-IUD in place, w/ R breast IDC grade 3, TNBC, cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB, dx 11/2025. Germline BRCA1 pathogenic variant (c.68_69delAG) 12/2025. Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026). Tox: G2 PN on paclitaxel, now G1 (toes); irAE hypothyroidism G2 -> levothyroxine, TSH now nl. Echo 3/4/26 pre-AC LVEF 60%. Surgery 6/11/26: bilateral mastectomy (L risk-reducing) + R ALND -> ypT1c (1.2 cm) ypN1a (2/11), RCB class II (RCB 2.6), margins neg. Post-op CT CAP 7/9/26 NED. Adj pembro started 7/21/26 (9 cycles planned). PMRT 7/20/26-8/28/26, completed.

Interval hx: Doing well. Fatigue improving since RT. R chest wall mild residual erythma. PN stable G1, no functional limitation. No new lumps, bone pain, HA or cough. Mood ok on sertraline. Menses irregular since chemo, last spotting ~8/26. Not pregnant, not breastfeeding. No lymphedma.

Discussed adj olaparib x1 yr (OlympiA) vs capecitabine (CREATE-X) for residual dz w/ gBRCA1. Pt leaning olaparib but wants to hear about trials for residual disease first. Signatera (ctDNA) sent 8/25/26 - result pending.

PMH: irAE hypothyroidism (on levo), anxiety (sertraline). No DM. No autoimmune dz prior to pembro.
FHx: mother breast ca at 44 (deceased), maternal aunt ovarian ca.
SH: RN, 2 kids, never smoker, no EtOH.

EXAM: ECOG 0. Vitals wnl. Mastectomy scars well healed, no chest wall nodularity. No cervical/supraclav/axillary adenopathy. Lungs clear. Abd benign. Neuro: decreased vibration sense toes bilat.

A/P:
1. R breast TNBC, stage IIB (cT2N1), gBRCA1+, s/p neoadj KN-522 w/ residual disease (RCB-II, ypT1c ypN1a), s/p bilat mastectomy + R ALND, PMRT complete. Currently NED. Adj pembro C4 of 9 today.
- Adj olaparib vs cape: pt to decide by next visit. ANC 1.9 today, borderline, recheck.
- Neoadj: continue weekly paclitaxel/carbo + pembro, next dose in 1 wk, counsel re neuropathy, CBC weekly.
- Signatera pending; if positive would change urgency and trial options.
- Trials: referred to research coordinator re: post-neoadjuvant residual disease trials. Archival tissue available (surgical specimen 6/2026).
2. irAE hypothyroidism G2 - levothyroxine 75 mcg, TSH 3.1, continue.
3. PN G1 - stable, no intervention.
4. Anxiety - sertraline 50 mg, stable.
5. Contraception: LNG-IUD, counseled.
RTC 3 wks for C5.

PATHOLOGY REPORT - FINAL
Specimen: A. Right breast, total mastectomy; B. Right axillary contents, level I-II; C. Left breast, total mastectomy (risk-reducing)
Procedure date: 2026-06-11 | Report date: 2026-06-17
DIAGNOSIS:
A. Right breast: residual invasive ductal carcinoma, grade 3, single focus 1.2 cm with treatment effect. Margins negative (closest deep 4 mm).
B. Right axillary nodes: 2 of 11 lymph nodes positive for metastatic carcinoma with treatment effect, no extranodal extension.
C. Left breast: benign breast tissue, no atypia, no carcinoma.
Pathologic stage (AJCC 8th): ypT1c ypN1a
Residual Cancer Burden: RCB class II (RCB score 2.6)
Receptors repeated on residual tumor: ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.

PRIOR PATHOLOGY (core bx, R breast 10 o'clock + R axillary node, 11/2025): IDC, grade 3 (Nottingham 9/9), ER 0%, PR 0%, HER2 IHC 0 (negative), Ki-67 75%. PD-L1 (22C3) CPS 8. Axillary node core: metastatic carcinoma.

GENETICS - Germline multigene panel (blood), reported 2025-12-15:
BRCA1 c.68_69delAG (p.Glu23ValfsTer17) - PATHOGENIC
No other pathogenic variants (BRCA2, PALB2, TP53, CHEK2, ATM, PTEN negative).

IMAGING
CT CHEST/ABDOMEN/PELVIS W/ CONTRAST - 07/09/2026
IMPRESSION: Post-surgical changes bilat mastectomy/R ALND. No evidence of metastatic disease in the chest, abdomen or pelvis. Port in situ.
Baseline staging 11/2025: CT CAP + bone scan without distant disease.

ECHO 03/04/2026: LVEF 60%, normal LV size and function.

LABS 2026-09-19
WBC 3.4 (L) | ANC 1.9 | Hgb 12.4 | Plt 180
Cr 0.7
AST 22 | ALT 25 | T bili 0.5 | Alk phos 71
TSH 3.1 | free T4 1.1
hCG (serum) negative

MEDICATIONS
- pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)
- levothyroxine 75 mcg PO daily
- sertraline 50 mg PO daily
- levonorgestrel IUD (placed 2023)

ALLERGIES: NKDA`,
  },
  {
    id: "rosa-v",
    label: "Rosa V.",
    subtitle: "HER2+ metastatic · treated brain metastases · progressed on T-DXd",
    record: `MEDICAL ONCOLOGY FOLLOW-UP NOTE
Pt: Rosa V. | MRN: 00-demo-3 | DOB: 1960 (66 yo F)
Date of service: Sept 24, 2026
Attending: J. Okafor MD (Breast Med Onc)

Reason: PD on T-DXd, s/p GK SRS brain mets; tx planning.

HPI: 66 yo postmenopausal F w/ de novo metastatic R breast IDC, grade 3, ER-/PR-/HER2 3+, dx Jan 2024 (cT3 cN2 M1: bilat lung nodules, mediastinal LN, solitary liver lesion). 1L THP (docetaxel x6, 2/2024-6/2024) then HP maint (Phesgo), best response PR; PD 3/2025 w/ new liver lesions. 2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026), PR, no ILD/pneumonitis at any point (serial CT chest w/o interstitial changes). 7/2026: PD in liver + new HA -> MRI brain 7/22/26 w/ 3 new brain mets (largest 1.4 cm R frontal). No seizures. GK SRS to all 3 lesions 8/7/26 (20 Gy). Dex tapered off, last dose 8/30/26. MRI brain 9/12/26: treated lesions smaller, no new lesions, no edema.

Interval hx: HA resolved since SRS. No seizures, no focal deficits. Off dex ~3.5 wks, no rebound sx. Mild fatigue. Residual G2 PN hands/feet from docetaxel (numbnes, drops small objects, no falls). Mild RUQ discomfort, no jaundice. Wt down 2 kg over 2 mo. No cough/SOB.
- T-DXd C14 D1 today, tolerating well, mild nausea controlled w/ olanzapine, no cough/dyspnea, continue q3w.

PMH: T2DM (metformin, A1c 6.9% 7/2026), HTN (lisinopril), hypothyroidism (levothyroxine). No CAD. Never smoker.
PSH: port 2/2024. No breast surgery.
SH: lives w/ daughter, no EtOH.

EXAM: ECOG 1. BP 128/74 HR 82 SpO2 97% RA. Wt 64 kg. Alert, CN II-XII intact, no drift, gait steady. R breast 5 cm UOQ mass, unchanged. R axillary adenopathy. Lungs clear, no crakles. Liver edge palpable, mildly tender. Decreased sensation fingertips/toes.

A/P:
1. Metastatic HER2+ (IHC 3+) HR-negative breast ca, de novo stage IV, PD on 1L THP/HP and 2L T-DXd. Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids. Measurable liver dz: seg VII 2.8 cm, seg V 2.2 cm.
- No prior tucatinib, T-DM1, lapatinib or neratinib.
- Discussed 3L tucatinib + trastuzumab + capecitabine (HER2CLIMB) vs clinical trial. Pt open to trial if screening within 3-4 wks.
- LVEF 55% on 9/10/26 echo (baseline 62% in 2024), asymptomatic.
2. Brain mets s/p SRS: f/u MRI q2-3 mo. No seizure ppx. Dex off since 8/30.
3. G2 PN (docetaxel): stable, gabapentin 300 mg qhs.
4. T2DM: metformin 1000 mg BID, A1c 6.9, glucose higher on dex, settling.
5. HTN: lisinopril 20 mg. 6. Hypothyroid: levothyroxine 100 mcg, TSH 2.4 (7/2026).
7. Mild anemia Hgb 10.9, chronic, no bleeding.
RTC 1-2 wks after trial screening. 9/24 JO.

PATHOLOGY REPORT - FINAL (original diagnosis)
Specimen: Right breast mass core biopsy; right axillary LN core biopsy
Collected: 01/16/2024 | Reported: 01/19/2024
DIAGNOSIS: Right breast core: Invasive ductal carcinoma, grade 3 (Nottingham 9/9).
Right axillary LN core: metastatic carcinoma.
ER: negative (0%)
PR: negative (0%)
HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells
Ki-67: 60%
Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.
Note: no repeat biopsy at progression on T-DXd; HER2 status per 2024 tissue. No NGS on file.

IMAGING
MRI BRAIN W/ AND W/O CONTRAST - 2026-09-12
IMPRESSION:
1. Three treated metastases (right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm), all decreased, consistent with treatment response.
2. No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.

CT CHEST/ABDOMEN/PELVIS W/ CONTRAST - 07/20/2026
IMPRESSION:
1. Progression of hepatic metastases: segment VII lesion 2.8 cm (previously 1.6 cm), segment V lesion 2.2 cm (previously 1.1 cm), two new subcentimeter lesions.
2. Stable bilateral pulmonary nodules (largest 7 mm) and mediastinal nodes. Right breast primary stable.
3. No interstitial lung abnormality or ground-glass opacity.

ECHO 2026-09-10: LVEF 55% (biplane Simpson's). No pericardial effusion. Prior LVEF 62% (01/2024), 58% (03/2025).

LABS 2026-09-22
WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165
Cr 0.9 | est CrCl ~62 mL/min (CG)
AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8 | Alk phos 130 (H) | Albumin 3.6
HbA1c 6.9% (07/2026)

MEDICATIONS
- metformin 1000 mg PO BID
- lisinopril 20 mg PO daily
- levothyroxine 100 mcg PO daily
- gabapentin 300 mg PO qhs
- dexamethasone - taper COMPLETED, last dose 08/30/2026
- trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)

ALLERGIES: NKDA`,
  },
];

export function getDemoPatient(id: string): DemoPatient | undefined {
  return DEMO_PATIENTS.find((p) => p.id === id);
}
