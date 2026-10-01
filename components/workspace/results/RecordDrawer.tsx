"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Eyebrow, IconButton } from "@/components/ui";
import { countDocuments, formatInt } from "../labels";
import { RecordViewer } from "../RecordViewer";
import { useWorkspace } from "../store";

/**
 * The source record, docked on the left so it can be read beside the verdicts.
 * Opening it from a quote scrolls to that passage and highlights it.
 * Non-modal on purpose: the dashboard stays usable while it is open.
 */
export function RecordDrawer() {
  const open = useWorkspace((s) => s.recordOpen);
  const recordText = useWorkspace((s) => s.recordText);
  const activeEvidence = useWorkspace((s) => s.activeEvidence);
  const closeRecord = useWorkspace((s) => s.closeRecord);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRecord();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeRecord]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          aria-label="Source record"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="fixed bottom-4 left-4 top-[72px] z-40 flex w-[min(480px,calc(100vw-2rem))] flex-col rounded-panel glass-strong shadow-float"
        >
          <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4 hairline-b">
            <div className="min-w-0">
              <Eyebrow>Source record</Eyebrow>
              <div className="mt-1 font-mono text-[11.5px] tnum text-ink-400">
                {formatInt(recordText.length)} characters · {countDocuments(recordText)} documents
                {activeEvidence && activeEvidence.length > 0 && <span className="text-accent-700"> · passage highlighted</span>}
              </div>
            </div>
            <IconButton label="Close source record" size="sm" onClick={closeRecord}>
              <X />
            </IconButton>
          </div>
          <RecordViewer text={recordText} activeEvidence={activeEvidence} className="min-h-0 flex-1 px-5 py-4" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
