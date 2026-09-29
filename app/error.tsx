"use client";

import { TopBar } from "@/components/shell";
import { Button, EmptyState, GlassPanel } from "@/components/ui";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar variant="transparent" />
      <main className="mx-auto flex w-full max-w-[640px] flex-1 items-center px-6 py-16">
        <GlassPanel className="w-full" padding="none">
          <EmptyState
            title="Something went wrong"
            description={error.message || "An unexpected error interrupted the workspace."}
            action={
              <Button variant="secondary" onClick={reset}>
                Try again
              </Button>
            }
          />
        </GlassPanel>
      </main>
    </div>
  );
}
