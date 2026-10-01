"use client";

import { AnimatePresence, motion } from "motion/react";
import { useWorkspace } from "./store";
import { RunView } from "./run/RunView";
import { ResultsView } from "./results/ResultsView";

/**
 * Stage 3 has two faces: the screening run (how the list was made, replayable)
 * and the results dashboard (what to do with it).
 */
export function TrialsStage() {
  const view = useWorkspace((s) => s.view);
  const runId = useWorkspace((s) => s.runId);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        {/* Keyed by run so a new search replays from the start. */}
        {view === "run" ? <RunView key={runId} /> : <ResultsView />}
      </motion.div>
    </AnimatePresence>
  );
}
