import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07541079",
  "Excluded: needs ≥ 6 months of AI with grade 2–3 intolerance; she has had 3 weeks with mild stiffness",
  "novERA switches patients who cannot tolerate adjuvant aromatase inhibitor therapy to giredestrant. Helen fits the disease criteria (stage IIIA, ER 90%, HER2-negative, postmenopausal, ECOG 1), but she started letrozole only on 9/8/26 and reports mild hand stiffness, not grade 2–3 intolerance. The earliest she could meet the duration rules is 3/8/27 (≥ 6 months total, the last ≥ 3 consecutive), and only if AI side effects become intolerable; her paroxysmal AF would then need sponsor review under the cardiac exclusion. Worth revisiting if she develops significant AI arthralgia.",
  [
    {
      id: "NCT07541079-inc-1",
      status: "pass",
      rationale: "She is already on adjuvant endocrine therapy (letrozole since 9/8/26) for ER 90% disease.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS }],
    },
    {
      id: "NCT07541079-inc-2",
      status: "pass",
      rationale: "Histologically confirmed ER+/HER2-negative stage IIIA (pT2 pN2a) early breast cancer, high risk by nodal burden.",
      evidence: [
        { quote: "R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA.", source: NOTE },
        { quote: "ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low)", source: NOTE },
      ],
    },
    {
      id: "NCT07541079-inc-3",
      status: "pass",
      rationale: "ER positive in 90% of tumor cells, well above the ≥ 1% threshold.",
      evidence: [{ quote: "ER: positive, 90%, strong intensity", source: PATH }],
    },
    {
      id: "NCT07541079-inc-4",
      status: "pass",
      rationale: "HER2-negative by ASCO/CAP: IHC 2+ with ISH not amplified (ratio 1.3, copy number 3.4).",
      evidence: [{ quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: PATH }],
    },
    {
      id: "NCT07541079-inc-5",
      status: "pass",
      rationale: "Postmenopausal (natural menopause at about 50, now 72, no HRT).",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07541079-inc-6",
      status: "fail",
      rationale: "Adjuvant letrozole started 9/8/26, so she has about 3 weeks of AI exposure against the required ≥ 6 months total; earliest qualifying date 3/8/27.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS }],
    },
    {
      id: "NCT07541079-inc-7",
      status: "fail",
      rationale: "Only 20 days of continuous letrozole (since 9/8/26) versus the ≥ 3 consecutive months required immediately before consent (earliest 12/8/26).",
      evidence: [{ quote: "Letrozole 2.5 mg started 9/8/26.", source: NOTE }],
    },
    {
      id: "NCT07541079-inc-8",
      status: "fail",
      rationale: "Her only AI-related symptom is mild hand stiffness, and the plan is to continue the AI (with a CDK4/6 inhibitor); neither she nor her oncologist describes it as intolerable.",
      evidence: [
        { quote: "Mild hand stiffness since letrozole.", source: NOTE },
        { quote: "Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial", source: NOTE },
      ],
    },
    {
      id: "NCT07541079-inc-9",
      status: "fail",
      rationale: "No grade 2–3 AI-related adverse event is documented; mild hand stiffness corresponds to grade 1 joint stiffness/arthralgia.",
      evidence: [{ quote: "Mild hand stiffness since letrozole.", source: NOTE }],
    },
    {
      id: "NCT07541079-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Letrozole is her first AI and an adjuvant oral SERD trial is among the options discussed, so any switch would be her first; whether a switch is warranted is covered by the intolerance criteria.",
      evidence: [{ quote: "vs clinical trial (e.g. adjuvant oral SERD or other escalation study)", source: NOTE }],
    },
    {
      id: "NCT07541079-inc-11",
      status: "fail",
      confidence: "medium",
      rationale: "Adjuvant chemotherapy (completed 8/19/26) and mastectomy are done, but post-mastectomy radiation continues until about 10/20/26; met once radiation is complete.",
      evidence: [
        { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS },
        { quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE },
      ],
    },
    {
      id: "NCT07541079-inc-12",
      status: "pass",
      rationale: "ECOG 1 on 9/25/26, within the required 0–1.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07541079-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No participation in another interventional study or investigational adjuvant agent is recorded.",
    },
    {
      id: "NCT07541079-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No rheumatoid, psoriatic or other inflammatory arthritis in her history; the hand stiffness began with letrozole and is attributed to it.",
      evidence: [{ quote: "Mild hand stiffness since letrozole.", source: NOTE }],
    },
    {
      id: "NCT07541079-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Her only endocrine therapy has been letrozole since 9/8/26; no fulvestrant or oral SERD in her treatment history.",
      evidence: [{ quote: "Letrozole 2.5 mg started 9/8/26.", source: NOTE }],
    },
    {
      id: "NCT07541079-exc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "Paroxysmal AF (on apixaban and metoprolol, sinus rhythm 64 on 9/21/26) with low-normal LVEF 52% and mild LA enlargement; whether this counts as active cardiac disease is a sponsor judgment.",
      evidence: [
        { quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE },
        { quote: "ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", source: "Echo 2026-05-28" },
      ],
      actionNeeded: "Confirm with sponsor whether rate-controlled paroxysmal AF on a beta-blocker and LVEF 52% are acceptable",
    },
    {
      id: "NCT07541079-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No liver disease: AST 22, ALT 18, bilirubin 0.6 on 9/23/26, alcohol rare, no hepatitis or cirrhosis in her history (serology not on file).",
      evidence: [
        { quote: "AST 22 | ALT 18 | T bili 0.6", source: "Labs 2026-09-23" },
        { quote: "SH: retired bookkeeper, lives w/ husband, never smoker, rare EtOH.", source: NOTE },
      ],
    },
    {
      id: "NCT07541079-exc-6",
      status: "pass",
      rationale: "None of her medications (letrozole, apixaban, metoprolol, amlodipine, atorvastatin, calcium/vitamin D) is a strong CYP3A inhibitor or inducer.",
      evidence: [
        { quote: "apixaban 5 mg PO BID", source: MEDS },
        { quote: "amlodipine 5 mg PO daily", source: MEDS },
      ],
    },
    {
      id: "NCT07541079-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities (rate-controlled AF, stable CKD 3a with eGFR 49, treated HTN, post-chemotherapy Hgb 11.1) are controlled and unlikely to preclude safe participation.",
      evidence: [{ quote: "4. CKD 3a stable.", source: NOTE }],
    },
  ],
);
