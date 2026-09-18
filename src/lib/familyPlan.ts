// The plan the whole household agrees on, and a way to get it onto every phone.
//
// Not a live-tracking app. Nothing here needs a server, an account or a signal:
// one person writes the plan, shares a file, and everyone else opens it once.
// After that it is on their phone and stays there — which is the only kind of
// family plan that still works on day four of an outage.
//
// Medical details are deliberately opt-in per person and per field. A plan gets
// texted, emailed, and left on other people's phones, so anything that rides
// along by default eventually ends up somewhere nobody chose.

import { deflateSync, inflateSync, strFromU8, strToU8 } from 'fflate';

export const FAMILY_PLAN_KEY = 'guidehand.family-plan.v1';

export const PLAN_FORMAT = 'guidehand-family-plan';
export const PLAN_VERSION = 1;

export interface MedicalCard {
  allergies?: string;
  medications?: string;
  conditions?: string;
  bloodType?: string;
  /** Off unless the person turns it on. Nothing medical travels by accident. */
  share: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  phone?: string;
  /** What this person does when it starts: "gets the kids", "shuts off the gas". */
  job?: string;
  /** Where they usually are on a weekday — school, work, a job site. */
  usuallyAt?: string;
  medical?: MedicalCard;
}

export interface OutOfAreaContact {
  name: string;
  phone: string;
  /** Which town or state, so people know it is genuinely out of the area. */
  where: string;
}

export interface FamilyPlan {
  householdName: string;
  members: FamilyMember[];
  /**
   * The single most useful phone number in a disaster. Local lines and towers
   * jam or fail first, while long distance often still goes through — so
   * everyone calls one person far away and that person relays. It is standard
   * Red Cross and Ready.gov guidance, and it is the field people skip.
   */
  outOfArea?: OutOfAreaContact;
  /** Free text: where the water, the go-bags, the spare keys are. */
  suppliesAt?: string;
  /** Anything the household wants written down that has no other field. */
  notes?: string;
  updatedAt: number;
}

export const EMPTY_PLAN: FamilyPlan = {
  householdName: '',
  members: [],
  updatedAt: 0,
};

export function newMemberId(): string {
  return `member-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyMember(): FamilyMember {
  return { id: newMemberId(), name: '' };
}

// ---------------------------------------------------------------------------
// What actually gets shared
// ---------------------------------------------------------------------------

export interface SharedPlanFile {
  format: typeof PLAN_FORMAT;
  version: number;
  sharedAt: string;
  plan: FamilyPlan;
}

/**
 * Strips every field nobody agreed to share. Done here rather than at the UI so
 * there is exactly one place that decides what leaves the phone, and it cannot
 * be forgotten by a screen that adds a field later.
 */
export function planForSharing(plan: FamilyPlan): FamilyPlan {
  return {
    ...plan,
    members: plan.members.map((member) => {
      if (!member.medical?.share) {
        const { medical: _dropped, ...rest } = member;
        return rest;
      }
      return member;
    }),
  };
}

export function buildShareFile(plan: FamilyPlan): string {
  const file: SharedPlanFile = {
    format: PLAN_FORMAT,
    version: PLAN_VERSION,
    sharedAt: new Date().toISOString(),
    plan: planForSharing(plan),
  };
  return JSON.stringify(file, null, 2);
}

export type ReadResult =
  | { ok: true; plan: FamilyPlan; sharedAt?: string }
  | { ok: false; reason: string };

/**
 * Reads a shared plan back. Tolerant about what it accepts and strict about
 * what it trusts: anything unrecognised is refused rather than half-imported,
 * because a plan that is silently missing half a household is worse than no
 * plan at all.
 */
export function readShareFile(text: string): ReadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: "That file isn't a GuideHand family plan." };
  }

  const file = parsed as Partial<SharedPlanFile>;
  if (file?.format !== PLAN_FORMAT) {
    return { ok: false, reason: "That file isn't a GuideHand family plan." };
  }
  if (typeof file.version !== 'number' || file.version > PLAN_VERSION) {
    return {
      ok: false,
      reason: 'That plan was made by a newer version of GuideHand. Update the app and try again.',
    };
  }

  const plan = file.plan as Partial<FamilyPlan> | undefined;
  if (!plan || !Array.isArray(plan.members)) {
    return { ok: false, reason: 'That plan file is damaged — there are no people in it.' };
  }

  const members: FamilyMember[] = [];
  for (const raw of plan.members) {
    const member = raw as Partial<FamilyMember>;
    if (typeof member?.name !== 'string' || !member.name.trim()) continue;
    members.push({
      id: typeof member.id === 'string' ? member.id : newMemberId(),
      name: member.name.trim(),
      phone: str(member.phone),
      job: str(member.job),
      usuallyAt: str(member.usuallyAt),
      medical: readMedical(member.medical),
    });
  }

  if (members.length === 0) {
    return { ok: false, reason: 'That plan file is damaged — there are no people in it.' };
  }

  return {
    ok: true,
    sharedAt: typeof file.sharedAt === 'string' ? file.sharedAt : undefined,
    plan: {
      householdName: str(plan.householdName) ?? '',
      members,
      outOfArea: readContact(plan.outOfArea),
      suppliesAt: str(plan.suppliesAt),
      notes: str(plan.notes),
      updatedAt: typeof plan.updatedAt === 'number' ? plan.updatedAt : Date.now(),
    },
  };
}

function str(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function readMedical(value: unknown): MedicalCard | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const card = value as Partial<MedicalCard>;
  const allergies = str(card.allergies);
  const medications = str(card.medications);
  const conditions = str(card.conditions);
  const bloodType = str(card.bloodType);
  if (!allergies && !medications && !conditions && !bloodType) return undefined;
  // It arrived, so it was shared. Keeping the flag true means it stays visible
  // to the person who received it rather than quietly disappearing.
  return { allergies, medications, conditions, bloodType, share: true };
}

function readContact(value: unknown): OutOfAreaContact | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const contact = value as Partial<OutOfAreaContact>;
  const name = str(contact.name);
  const phone = str(contact.phone);
  if (!name || !phone) return undefined;
  return { name, phone, where: str(contact.where) ?? '' };
}

// ---------------------------------------------------------------------------
// Merging someone else's plan into yours
// ---------------------------------------------------------------------------

export interface MergeResult {
  plan: FamilyPlan;
  added: number;
  updated: number;
}

/**
 * Takes the incoming plan as the shared truth while keeping anyone the
 * receiver has that the sender did not. Matching is by name, because two
 * phones that never synced have no shared ids — and a household that ends up
 * with "Mom" twice has a plan nobody trusts.
 */
export function mergePlans(mine: FamilyPlan, theirs: FamilyPlan): MergeResult {
  const byName = new Map(mine.members.map((m) => [m.name.trim().toLowerCase(), m]));
  let added = 0;
  let updated = 0;

  const members: FamilyMember[] = theirs.members.map((incoming) => {
    const existing = byName.get(incoming.name.trim().toLowerCase());
    if (existing) {
      updated += 1;
      byName.delete(incoming.name.trim().toLowerCase());
      // Their copy wins on the shared fields; anything they left blank keeps
      // what this phone already knew rather than being wiped.
      return {
        ...existing,
        ...incoming,
        id: existing.id,
        medical: incoming.medical ?? existing.medical,
      };
    }
    added += 1;
    return incoming;
  });

  for (const leftover of byName.values()) members.push(leftover);

  return {
    added,
    updated,
    plan: {
      householdName: theirs.householdName || mine.householdName,
      members,
      outOfArea: theirs.outOfArea ?? mine.outOfArea,
      suppliesAt: theirs.suppliesAt ?? mine.suppliesAt,
      notes: theirs.notes ?? mine.notes,
      updatedAt: Date.now(),
    },
  };
}

export function planFileName(plan: FamilyPlan, date: Date = new Date()): string {
  const household = (plan.householdName || 'family')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const day = date.toISOString().slice(0, 10);
  return `${household}-plan-${day}.json`;
}

/** How complete the plan is, so the screen can nudge toward what is missing. */
export function planGaps(plan: FamilyPlan): string[] {
  const gaps: string[] = [];
  if (plan.members.length === 0) gaps.push('Nobody is in the plan yet');
  if (!plan.outOfArea) gaps.push('No out-of-area contact — the number that works when local lines jam');
  if (plan.members.length > 0 && plan.members.every((m) => !m.job)) {
    gaps.push('Nobody has a job yet — who gets the kids, who shuts off the gas');
  }
  if (plan.members.some((m) => !m.phone)) gaps.push('Somebody has no phone number');
  if (!plan.suppliesAt) gaps.push('No note about where the supplies are');
  return gaps;
}

// ---------------------------------------------------------------------------
// Sharing by code
// ---------------------------------------------------------------------------

/**
 * A QR code holds far less than a file does. Version 40 at the lowest error
 * correction tops out near 2,950 bytes, and a code that dense is miserable to
 * scan off a phone screen in poor light — which is the only light this is
 * likely to be used in. Below this a code stays readable; above it the file is
 * the honest answer and the screen says so rather than showing a wall of dots
 * nobody's camera will lock onto.
 */
export const PLAN_CODE_LIMIT = 1400;

// The old code. Still read, never written: codes already on people's screens
// and in their photos keep working.
const PLAN_CODE_PREFIX = "guidehand-plan:";

/**
 * Where a plan code points. "The QR code says no usable data is found when
 * you scan it." It did: the code was a GuideHand-only string, and a phone's
 * camera only knows what to do with web links, contacts, Wi-Fi and the like.
 * So the code is now a link. A camera opens it; the app claims this exact
 * path, so on a phone with GuideHand it opens straight into the app; on one
 * without, a small page explains what it is. The plan rides in the # part of
 * the link, which browsers never send to the server — so nothing personal
 * leaves the phone even when it is opened in a browser.
 */
export const PLAN_LINK_BASE = "https://cynthiasisk77-coder.github.io/GuideHand-/plan/";
const PLAN_LINK_PATH = "/GuideHand-/plan";

// Base64url without Buffer or atob, which neither Hermes nor the web build can
// be relied on to share. Alphabet from RFC 4648 §5; no padding, so the payload
// is clean in a URL fragment and in a QR byte stream.
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function toBase64Url(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
    const n = (a << 16) | ((b ?? 0) << 8) | (c ?? 0);
    out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
    out += b === undefined ? "" : B64[(n >> 6) & 63];
    out += c === undefined ? "" : B64[n & 63];
  }
  return out;
}
function fromBase64Url(text: string): Uint8Array | undefined {
  const clean = text.replace(/[^A-Za-z0-9\-_]/g, "");
  if (clean.length % 4 === 1) return undefined;
  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    const v = [0, 1, 2, 3].map((k) => (i + k < clean.length ? B64.indexOf(clean[i + k]) : -1));
    if (v[0] < 0 || v[1] < 0) return undefined;
    const n = (v[0] << 18) | (v[1] << 12) | ((v[2] < 0 ? 0 : v[2]) << 6) | (v[3] < 0 ? 0 : v[3]);
    bytes.push((n >> 16) & 255);
    if (v[2] >= 0) bytes.push((n >> 8) & 255);
    if (v[3] >= 0) bytes.push(n & 255);
  }
  return Uint8Array.from(bytes);
}

/** The compact payload: the plan, deflated, as base64url. */
function encodePlanPayload(plan: FamilyPlan): string {
  const json = JSON.stringify(planForSharing(plan));
  return toBase64Url(deflateSync(strToU8(json), { level: 9 }));
}
function decodePlanPayload(payload: string): string | undefined {
  const bytes = fromBase64Url(payload);
  if (!bytes || bytes.length === 0) return undefined;
  try {
    return strFromU8(inflateSync(bytes));
  } catch {
    return undefined;
  }
}

/**
 * The plan as a scannable code — compact, and carrying only what the file
 * would carry. planForSharing still decides what leaves the phone, so medical
 * details nobody switched on do not travel here either.
 */
export function buildPlanCode(plan: FamilyPlan): string {
  return `${PLAN_LINK_BASE}#${encodePlanPayload(plan)}`;
}

/** Whether that code is small enough to be worth showing. */
export function planCodeFits(plan: FamilyPlan): boolean {
  return buildPlanCode(plan).length <= PLAN_CODE_LIMIT;
}

/**
 * Reads a scanned plan back. Returns undefined for anything that is not one of
 * our plan codes, so the scanner can tell a plan from a meeting place without
 * guessing.
 */
export function parsePlanCode(raw: string): FamilyPlan | undefined {
  const text = raw.trim();
  if (!text) return undefined;

  let body: string | undefined;
  if (text.startsWith(PLAN_CODE_PREFIX)) {
    // The old code, still honoured.
    body = text.slice(PLAN_CODE_PREFIX.length);
  } else if (text.includes(PLAN_LINK_PATH) && text.includes("#")) {
    // The link a camera reads, or the app is opened with.
    body = decodePlanPayload(text.slice(text.indexOf("#") + 1));
  } else if (/^[A-Za-z0-9\-_]{16,}$/.test(text)) {
    // Just the payload — what the app hands itself after being opened by
    // the link, with the address already stripped off.
    body = decodePlanPayload(text);
  }
  if (!body) return undefined;

  // Reuse the file reader's validation rather than trusting a second path:
  // one definition of what a real plan looks like, not two that can drift.
  const result = readShareFile(
    JSON.stringify({ format: PLAN_FORMAT, version: PLAN_VERSION, plan: JSON.parse(safeJson(body)) })
  );
  return result.ok ? result.plan : undefined;
}

/** Keeps a malformed scan from throwing out of parsePlanCode. */
function safeJson(body: string): string {
  try {
    JSON.parse(body);
    return body;
  } catch {
    return "null";
  }
}
