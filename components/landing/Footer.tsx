import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1180px] px-6 pb-8">
      <div className="hairline-t flex flex-col gap-2 pt-6 text-[13px] leading-snug text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>Trial Matcher · Prototype · Data from ClinicalTrials.gov · Not a medical device</p>
        <Link
          href="/styleguide"
          className="w-fit rounded-sm transition-colors duration-150 hover:text-ink-700 sm:text-right"
        >
          Styleguide
        </Link>
      </div>
    </footer>
  );
}
