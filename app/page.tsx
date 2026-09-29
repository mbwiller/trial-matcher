import { TopBar } from "@/components/shell";
import {
  ButtonLink,
  FeatureCards,
  Footer,
  Hero,
  HowItWorks,
  HowItWorksLink,
  ShortlistPreview,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar
        variant="transparent"
        right={
          <>
            <HowItWorksLink />
            <ButtonLink href="/workspace" size="sm">
              Open workspace
            </ButtonLink>
          </>
        }
      />

      <main className="flex-1 pb-24">
        <Hero />

        <section aria-labelledby="preview-title" className="mx-auto w-full max-w-[1180px] px-6">
          <h2 id="preview-title" className="sr-only">
            Shortlist preview
          </h2>
          <ShortlistPreview />
          <p className="mt-4 text-center text-[13px] text-ink-400">
            The shortlist stage, shown with a bundled sample patient. Verdicts are illustrative.
          </p>
        </section>

        <FeatureCards className="mt-20 md:mt-24" />
        <HowItWorks className="mt-20 md:mt-24" />
      </main>

      <Footer />
    </div>
  );
}
