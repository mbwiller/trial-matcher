import Link from "next/link";
import { TopBar } from "@/components/shell";
import { EmptyState, GlassPanel } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar variant="transparent" />
      <main className="mx-auto flex w-full max-w-[640px] flex-1 items-center px-6 py-16">
        <GlassPanel className="w-full" padding="none">
          <EmptyState
            title="That page does not exist"
            description="The workspace is the only place to be."
            action={
              <Link
                href="/workspace"
                className="inline-flex h-10 items-center rounded-chip bg-accent-600 px-4 text-[14px] font-medium text-white hover:bg-accent-700"
              >
                Open workspace
              </Link>
            }
          />
        </GlassPanel>
      </main>
    </div>
  );
}
