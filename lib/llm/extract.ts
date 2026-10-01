/**
 * Record structuring: free-text oncology record → PatientProfile, via Claude
 * structured outputs. The record text is only ever sent to the model; it is
 * never logged.
 */
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { PatientProfile } from "@/lib/types";
import { ProfileOutputSchema, stripNulls } from "@/lib/schemas";
import { EXTRACT_EFFORT, EngineError, MODEL_ID, getClient, refusalError, toEngineError } from "@/lib/llm/client";
import { alignEvidence } from "@/lib/llm/evidence";

/** Stable across calls so the prefix can be served from the prompt cache. */
export const EXTRACT_SYSTEM_PROMPT = `You are an expert oncology clinical-abstraction assistant. You read a patient's multi-document oncology record (clinic notes, pathology, imaging, labs, medication lists) and produce a structured patient profile that a clinician will use to screen clinical trials. The profile must be faithful to the record and fully traceable to it.

Principles
- Extract only what is documented. Never invent a value or fill one in from typical practice. Distinguish "negative" (the record documents a negative result) from "not documented" (leave the field null and, where trials commonly need it, list it in openQuestions).
- Read the whole record before answering; later documents can update or contradict earlier ones. Prefer the most recent documented value and note the change in \`note\` when it matters (for example a receptor conversion on a metastatic biopsy).
- Every evidence quote must be an exact verbatim substring of the record: copy characters exactly, keep abbreviations, typos and punctuation, do not paraphrase, and keep each quote at or under 200 characters. Use \`source\` to name the document or section (e.g. "Pathology 2024-11-02"). One or two precise quotes per value are better than a long passage.
- Confidence: "high" when the record states the value explicitly; "medium" when it is inferred from strong context; "low" when it is a guess. Explain inferences in \`note\`.
- Dates: normalize to ISO — YYYY-MM-DD when the day is known, otherwise YYYY-MM. Resolve relative dates ("3 weeks ago", "last month") against the date of the note that mentions them and say so in \`note\`.
- Expand abbreviations into clinician language in values (the quote keeps the original). Common ones: IDC/ILC (invasive ductal/lobular carcinoma), ER/PR/HER2, IHC/FISH/ISH, Ki-67, TNBC, HR+, T-DXd (trastuzumab deruxtecan), T-DM1 (trastuzumab emtansine), THP/HP (docetaxel + trastuzumab + pertuzumab / trastuzumab + pertuzumab), AC-T, ddAC (dose-dense doxorubicin + cyclophosphamide), TCbP/TCHP (docetaxel + carboplatin + pertuzumab ± trastuzumab), KN-522 (KEYNOTE-522 pembrolizumab regimen), NAC (neoadjuvant chemotherapy), SLNB/ALND (sentinel node biopsy / axillary dissection), XRT/PMRT (radiotherapy / post-mastectomy radiotherapy), SRS/GK (stereotactic radiosurgery / Gamma Knife), ECOG, LVEF, mets, s/p (status post), c/w (consistent with), w/u (work-up), f/u (follow-up), PD/SD/PR/CR (response categories), pCR, RCB, ypT/ypN, CDK4/6i, AI (aromatase inhibitor), tam (tamoxifen), OFS (ovarian function suppression), gBRCA (germline BRCA), ctDNA, ILD, PN (peripheral neuropathy), DM2, A1c, CrCl.

What to capture
- Demographics: age, sex, menopausal status.
- Diagnosis: primary diagnosis in clinician language, histology, grade, laterality, diagnosis date, stage and TNM at diagnosis, current stage, disease setting, subtype, metastatic sites, RECIST-measurable disease if stated, CNS status.
  - \`setting\` is the single most important routing field: "metastatic" (distant disease, de novo or recurrent), "locally-advanced" (unresectable or inflammatory disease without distant metastases), "recurrent" (locoregional recurrence without distant disease), "early" (curative-intent early-stage disease, including patients still on adjuvant therapy), "unknown".
  - \`subtype\` derives from the most recent receptor results: "HER2+" (IHC 3+ or ISH-amplified) takes precedence; "TNBC" (ER < 1%, PR < 1%, HER2-negative); "HR+/HER2-low" (ER and/or PR ≥ 1% with HER2 IHC 1+ or IHC 2+/ISH-negative); "HR+/HER2-" (HR+ with HER2 IHC 0, or HER2-negative without a documented IHC score). Record HER2 IHC 2+ without ISH as "equivocal".
- Biomarkers: one entry per result (ER, PR, HER2, Ki-67, PIK3CA, ESR1, BRCA1/BRCA2/gBRCA, PD-L1, AKT1, PTEN, MSI, TMB, ...) with status, detail (percentage, IHC score, variant), method, date and specimen. Keep germline, tissue and ctDNA results as separate entries.
- Treatments in chronological order, oldest first: name, agents (lowercase generic names), category, intent, line number in the metastatic setting (1 = first line for metastatic disease; neoadjuvant and adjuvant therapy have no line number), start and end dates, status, best response, reason stopped.
- Performance status (ECOG, Karnofsky) and key labs with date and unit: ANC, hemoglobin, platelets, creatinine or CrCl/eGFR, AST, ALT, total bilirubin, LVEF, HbA1c. Flag abnormal values.
- Comorbidities, allergies, and concurrent medications relevant to eligibility (anticoagulants, systemic steroids, strong CYP3A4 inhibitors or inducers, QT-prolonging drugs, antidiabetics).
- Key dates: initial diagnosis, surgery, metastatic recurrence, last imaging, last dose of systemic therapy, and any other date that decides a washout or line count.
- \`openQuestions\`: things trials commonly require that this record does not answer or that are stale — LVEF within the last 12 months, HbA1c, ESR1/ctDNA status, brain imaging, RECIST-measurable disease, hepatitis B/C and HIV serology, pregnancy status when relevant, recent labs, current ECOG. Be specific (e.g. "LVEF last documented 2023-02, older than 12 months").
- \`summary\`: two to three sentences a treating oncologist would write, covering subtype, setting, treatment history and current status.

Use null for any optional field the record does not support, and use "unknown" for an enumerated value only when the record addresses the topic but is unclear.`;

/** The per-record user message. The reference date lets the model judge staleness. */
export function buildExtractUserMessage(text: string, today: Date = new Date()): string {
  return `Reference date (today): ${today.toISOString().slice(0, 10)}\n\n<record>\n${text}\n</record>\n\nExtract the structured patient profile from this record.`;
}

/**
 * Structure a free-text record with the configured model.
 *
 * Uses `client.beta.messages.parse` so the request can carry the server-side
 * refusal fallback (`fallbacks: "default"` under `server-side-fallback-2026-07-01`);
 * no `thinking` parameter is sent because Claude Opus 5.5 always thinks and
 * `output_config.effort` is the control.
 */
export async function extractProfile(text: string): Promise<PatientProfile> {
  const activity = "structuring the record";
  try {
    const message = await getClient().beta.messages.parse({
      model: MODEL_ID,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: EXTRACT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: buildExtractUserMessage(text) }],
      output_config: { format: zodOutputFormat(ProfileOutputSchema), effort: EXTRACT_EFFORT },
    });

    if (message.stop_reason === "refusal") {
      throw refusalError(message.stop_details?.category, activity);
    }
    if (message.stop_reason === "max_tokens") {
      throw new EngineError(
        "The record is too long to structure in one pass. Trim documents that are not relevant to eligibility and try again.",
        502,
      );
    }
    const parsed = message.parsed_output;
    if (!parsed) {
      throw new EngineError("The model returned no structured profile. Try again.", 502);
    }

    const aligned = alignEvidence(stripNulls(parsed), text);
    return {
      id: crypto.randomUUID(),
      ...aligned,
      extractedAt: new Date().toISOString(),
      source: "llm",
      // `message.model` names the model that actually produced the output (a fallback model after a refusal).
      modelId: message.model || MODEL_ID,
    };
  } catch (error) {
    throw toEngineError(error, activity);
  }
}
