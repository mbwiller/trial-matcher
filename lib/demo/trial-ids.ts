/**
 * Curated set of real, recruiting ClinicalTrials.gov studies bundled as the
 * offline fixture (`lib/demo/trials.json`, rebuilt with `npm run fixture`).
 *
 * The set is chosen so each demo patient has a spread of strong, possible and
 * ineligible results, and so the criteria engine is exercised on the messy
 * fine print that makes the public registry hard to read.
 */
export const DEMO_TRIAL_IDS: string[] = [
  // --- HR+/HER2-negative (incl. HER2-low) advanced disease, PIK3CA / post-CDK4/6 ---
  "NCT06982521", // RLY-2608 + fulvestrant vs capivasertib + fulvestrant, PIK3CA-mutant, post-CDK4/6 (Phase 3)
  "NCT07405801", // Inavolisib + ribociclib + fulvestrant, PIK3CA-mutated (Phase 2)
  "NCT07340541", // UNC evolutionary biomarker-driven SERD combinations (Phase 2)
  "NCT05933395", // Genetically-informed therapy for ER+ disease after CDK4/6 inhibitor (Phase 2)
  "NCT07198724", // ERADICATE: elacestrant + trastuzumab deruxtecan after CDK4/6 inhibitor (Phase 1b/2)
  "NCT07647328", // Camizestrant + ribociclib first-line (Phase 3b) — prior CDK4/6i in advanced setting excludes
  "NCT06790693", // Inavolisib + CDK4/6i + letrozole first-line (Phase 3) — first-line only
  "NCT05564377", // NCI ComboMATCH: targeted therapy directed by genetic testing (Phase 2)
  "NCT05774951", // CAMBRIA-2: camizestrant in ER+/HER2- EARLY breast cancer (Phase 3) — negative control for metastatic patients

  // --- Triple-negative: residual disease after neoadjuvant therapy, BRCA ---
  "NCT06393374", // Sacituzumab tirumotecan + pembrolizumab vs TPC in TNBC without pCR (Phase 3)
  "NCT07069595", // PREDICT-RD: ctDNA surveillance in TNBC with residual disease → datopotamab deruxtecan (Phase 2)
  "NCT06435351", // Personalised dendritic-cell vaccine after neoadjuvant therapy, high-risk TNBC (early Phase 1)
  "NCT04768426", // Serial ctDNA monitoring during adjuvant capecitabine, early TNBC (Phase 2)
  "NCT05633654", // Sacituzumab govitecan + pembrolizumab vs TPC, METASTATIC TNBC (Phase 3) — setting mismatch for early-stage patients
  "NCT06966700", // Sacituzumab tirumotecan in breast cancer (Phase 3)

  // --- HER2-positive advanced disease, prior T-DXd, treated brain metastases ---
  "NCT07413939", // RO7771950 vs tucatinib + trastuzumab + capecitabine, previously treated HER2+ (Phase 2/3)
  "NCT06435429", // Zanidatamab vs trastuzumab + physician's choice chemo after T-DXd (Phase 3)
  "NCT06324357", // Beamion BCGC-1: zongertinib ± HER2 ADCs (Phase 1/2)
  "NCT07136428", // Asciminib + trastuzumab in HER2+ brain metastases (Phase 1/2)
  "NCT06695845", // Zanidatamab in HER2-expressing tumours (Phase 2)
  "NCT07102381", // Neoadjuvant zanidatamab + chemotherapy (Phase 2) — early-stage only
  "NCT03418961", // S1501: carvedilol cardioprotection in metastatic HER2+ disease (Phase 3)
];
