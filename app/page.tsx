import { TopBar } from "@/components/shell";
import {
  ButtonLink,
  FinePrint,
  Footer,
  Hero,
  HowItWorks,
  HowItWorksLink,
  Problem,
  SamplePatients,
} from "@/components/landing";
import { landingData } from "@/components/landing/data";

export default function LandingPage() {
  // Computed on the server from the registry snapshot and the sample patient's reviews.
  const data = landingData();
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
        <Hero data={data} />
        <Problem data={data} />
        <FinePrint data={data} className="mt-24 md:mt-32" />
        <HowItWorks data={data} className="mt-24 md:mt-32" />
        <SamplePatients data={data} className="mt-24 md:mt-28" />
      </main>

      <Footer />
    </div>
  );
}
