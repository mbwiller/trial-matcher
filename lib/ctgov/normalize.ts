import type { Trial, TrialLocation, TrialStatus } from "@/lib/types";
import { parseCriteria } from "./criteria";

/* eslint-disable @typescript-eslint/no-explicit-any */

const MAX_LOCATIONS = 12;

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function asStatus(v: unknown): TrialStatus {
  const s = str(v);
  const known: TrialStatus[] = [
    "RECRUITING",
    "NOT_YET_RECRUITING",
    "ACTIVE_NOT_RECRUITING",
    "ENROLLING_BY_INVITATION",
    "COMPLETED",
    "SUSPENDED",
    "TERMINATED",
    "WITHDRAWN",
  ];
  return (known as string[]).includes(s ?? "") ? (s as TrialStatus) : "UNKNOWN";
}

function asSex(v: unknown): Trial["sex"] {
  const s = (str(v) ?? "ALL").toUpperCase();
  return s === "FEMALE" || s === "MALE" ? s : "ALL";
}

/**
 * Convert a ClinicalTrials.gov API v2 study object (`{ protocolSection: … }`)
 * into the app's `Trial` shape, including parsed criteria.
 */
export function normalizeStudy(study: any): Trial {
  const p = study?.protocolSection ?? {};
  const idm = p.identificationModule ?? {};
  const status = p.statusModule ?? {};
  const sponsor = p.sponsorCollaboratorsModule ?? {};
  const desc = p.descriptionModule ?? {};
  const cond = p.conditionsModule ?? {};
  const design = p.designModule ?? {};
  const arms = p.armsInterventionsModule ?? {};
  const elig = p.eligibilityModule ?? {};
  const contacts = p.contactsLocationsModule ?? {};

  const nctId: string = str(idm.nctId) ?? "UNKNOWN";
  const allLocations: any[] = Array.isArray(contacts.locations) ? contacts.locations : [];
  const locations: TrialLocation[] = allLocations.slice(0, MAX_LOCATIONS).map((l) => ({
    facility: str(l.facility),
    city: str(l.city),
    state: str(l.state),
    country: str(l.country),
    status: str(l.status),
  }));

  const countries = [...new Set(allLocations.map((l) => str(l.country)).filter((c): c is string => Boolean(c)))];

  const interventions = (Array.isArray(arms.interventions) ? arms.interventions : [])
    .map((i: any) => ({ type: str(i.type) ?? "OTHER", name: str(i.name) ?? "" }))
    .filter((i: { name: string }) => i.name);

  const eligibilityText: string = str(elig.eligibilityCriteria) ?? "";

  return {
    nctId,
    title: str(idm.briefTitle) ?? str(idm.officialTitle) ?? nctId,
    officialTitle: str(idm.officialTitle),
    summary: (str(desc.briefSummary) ?? "").replace(/\s+\n/g, "\n").trim(),
    phases: Array.isArray(design.phases) ? design.phases.map(String) : [],
    status: asStatus(status.overallStatus),
    studyType: str(design.studyType) ?? "UNKNOWN",
    primaryPurpose: str(design.designInfo?.primaryPurpose),
    conditions: Array.isArray(cond.conditions) ? cond.conditions.map(String) : [],
    interventions,
    sponsor: str(sponsor.leadSponsor?.name) ?? "Unknown sponsor",
    sex: asSex(elig.sex),
    minimumAge: str(elig.minimumAge),
    maximumAge: str(elig.maximumAge),
    startDate: str(status.startDateStruct?.date),
    primaryCompletionDate: str(status.primaryCompletionDateStruct?.date),
    enrollment: typeof design.enrollmentInfo?.count === "number" ? design.enrollmentInfo.count : undefined,
    locations,
    locationCount: allLocations.length,
    countries,
    eligibilityText,
    criteria: parseCriteria(nctId, eligibilityText),
    keywords: Array.isArray(cond.keywords) ? cond.keywords.map(String) : undefined,
    url: `https://clinicaltrials.gov/study/${nctId}`,
    lastUpdated: str(status.lastUpdatePostDateStruct?.date),
  };
}
