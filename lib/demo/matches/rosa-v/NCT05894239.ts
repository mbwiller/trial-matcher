import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05894239",
  "Excluded: first-line maintenance trial; she is HER2-refractory, beyond first line, on metformin",
  "This trial adds inavolisib to Phesgo maintenance after first-line induction in previously untreated, PIK3CA-mutated HER2-positive disease. Rosa progressed on first-line HP maintenance in March 2025 and on T-DXd in July 2026, her type 2 diabetes requires ongoing metformin (an exclusion because of inavolisib-related hyperglycaemia), and PIK3CA has never been tested. None of these can be remedied, so the trial is not an option.",
  [
    {
      id: "NCT05894239-inc-1",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-24 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05894239-inc-2",
      status: "pass",
      rationale: "Invasive ductal carcinoma (adenocarcinoma) of the right breast, de novo metastatic and never resected.",
      evidence: [
        { quote: "Right breast core: Invasive ductal carcinoma, grade 3 (Nottingham 9/9).", source: "Pathology 2024-01-19" },
        { quote: "PSH: port 2/2024. No breast surgery.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05894239-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "HER2 IHC 3+ locally on both breast and liver tissue (2024); central confirmation has not been done but is expected to agree.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" }],
      actionNeeded: "Submit tumor tissue for central HER2 testing",
    },
    {
      id: "NCT05894239-inc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "PIK3CA status has never been assessed: there is no tissue or ctDNA NGS on file.",
      evidence: [{ quote: "No NGS on file.", source: "Pathology" }],
      actionNeeded: "Central tumor-tissue PIK3CA mutation testing required",
    },
    {
      id: "NCT05894239-inc-5",
      status: "not-applicable",
      rationale: "De novo metastatic disease; she never received (neo)adjuvant therapy.",
    },
    {
      id: "NCT05894239-inc-6",
      status: "pass",
      rationale: "LVEF 55% on echo 2026-09-10.",
      evidence: [{ quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" }],
    },
    {
      id: "NCT05894239-inc-7",
      status: "pass",
      rationale: "Labs 2026-09-22: ANC 3.1, platelets 165, Hgb 10.9, bilirubin 0.8, AST 1.3 × ULN with liver metastases, CrCl ~62 mL/min.",
      evidence: [
        { quote: "WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT05894239-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No PI3K, AKT or mTOR inhibitor exposure: her prior agents were docetaxel, trastuzumab, pertuzumab and T-DXd.",
    },
    {
      id: "NCT05894239-exc-2",
      status: "fail",
      rationale: "Her first-line induction (THP) was in 2024, and she has since received HP maintenance to progression and second-line T-DXd for metastatic disease; the trial is for previously untreated patients entering first-line maintenance.",
      evidence: [
        { quote: "1L THP (docetaxel x6, 2/2024-6/2024) then HP maint (Phesgo), best response PR", source: "Onc note 2026-09-24" },
        { quote: "2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026)", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05894239-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease is recorded in her past medical history.",
    },
    {
      id: "NCT05894239-exc-4",
      status: "fail",
      rationale: "She progressed while receiving HER2-targeted therapy twice: on trastuzumab/pertuzumab maintenance (03/2025) and on T-DXd (07/2026).",
      evidence: [
        { quote: "PD 3/2025 w/ new liver lesions.", source: "Onc note 2026-09-24" },
        { quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" },
      ],
    },
    {
      id: "NCT05894239-exc-5",
      status: "fail",
      rationale: "Type 2 diabetes on ongoing metformin 1000 mg twice daily (HbA1c 6.9%, 07/2026).",
      evidence: [
        { quote: "T2DM: metformin 1000 mg BID, A1c 6.9", source: "Onc note 2026-09-24" },
        { quote: "metformin 1000 mg PO BID", source: "Medications" },
      ],
    },
    {
      id: "NCT05894239-exc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis B status is not documented; her transaminase rise is explained by liver metastases.",
      actionNeeded: "Obtain HBsAg and anti-HBc (HBV DNA if positive); active HBV excludes",
    },
    {
      id: "NCT05894239-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Liver test abnormalities (AST 1.3 × ULN, alk phos 130) reflect hepatic metastases; bilirubin and albumin are normal, she does not drink alcohol, and no cirrhosis or hepatitis is recorded.",
      evidence: [
        { quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8 | Alk phos 130 (H) | Albumin 3.6", source: "Labs 2026-09-22" },
        { quote: "SH: lives w/ daughter, no EtOH.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05894239-exc-8",
      status: "pass",
      rationale: "No cough or dyspnoea and no ILD/pneumonitis at any point on T-DXd; CT 07/20/2026 shows no interstitial change.",
      evidence: [
        { quote: "no ILD/pneumonitis at any point (serial CT chest w/o interstitial changes)", source: "Onc note 2026-09-24" },
        { quote: "No cough/SOB.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05894239-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is described on brain MRI; her brain metastases are parenchymal and treated.",
      evidence: [{ quote: "Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05894239-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No serious infection or intravenous antibiotic use is documented.",
    },
    {
      id: "NCT05894239-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No ocular condition is recorded in her past medical history.",
      actionNeeded: "Confirm eye history at screening, including diabetic eye examination status",
    },
    {
      id: "NCT05894239-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No ocular inflammation, infection or uveitis is recorded.",
    },
  ],
);
