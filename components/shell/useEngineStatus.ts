"use client";

import { useEffect, useState } from "react";
import type { EngineStatus } from "@/lib/types";

const OFFLINE: EngineStatus = { llm: false, modelId: "", liveRegistry: false };

/** One request per page load, shared by everything that needs to know which engine is answering. */
let pending: Promise<EngineStatus> | undefined;

function loadStatus(): Promise<EngineStatus> {
  pending ??= fetch("/api/status")
    .then((r) => (r.ok ? (r.json() as Promise<EngineStatus>) : OFFLINE))
    .catch(() => OFFLINE);
  return pending;
}

/** The engine's capabilities from /api/status; `null` until known. */
export function useEngineStatus(): EngineStatus | null {
  const [status, setStatus] = useState<EngineStatus | null>(null);
  useEffect(() => {
    let active = true;
    void loadStatus().then((s) => {
      if (active) setStatus(s);
    });
    return () => {
      active = false;
    };
  }, []);
  return status;
}
