import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trial Matcher",
    template: "%s · Trial Matcher",
  },
  description:
    "Reads the patient record, screens ClinicalTrials.gov criterion by criterion, and hands the clinician a ranked, explained shortlist.",
  applicationName: "Trial Matcher",
};

export const viewport: Viewport = {
  themeColor: "#f5f6f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink-800">
        <div className="color-field" aria-hidden="true">
          <i />
        </div>
        {children}
      </body>
    </html>
  );
}
