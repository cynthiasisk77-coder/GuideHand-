// Types and validation for downloadable content packs.
//
// The app ships with its own articles compiled in, and those always work with
// no network and no download. Packs are extra depth on top of that — bigger
// reference material that would bloat the install if it were bundled. Nothing
// in the base app depends on a pack being present.
//
// A downloaded pack is untrusted input: it arrived over a network, from a file
// that could be truncated, stale, or malformed. Everything here validates
// before it is believed, and rejects rather than guesses.

export type PackPriority = "P0" | "P1" | "P2" | "P3";

/** One article inside a pack. Mirrors the shape of the app's own articles. */
export interface PackArticle {
  title: string;
  /** Category name. Matches an existing category when it can, otherwise the pack's own. */
  category: string;
  priority: PackPriority;
  sources: string[];
  guidance: string[];
}

/** What the catalog knows about a pack without having downloaded it. */
export interface PackListing {
  id: string;
  name: string;
  summary: string;
  /** Bumped when the pack's content changes, so installs can offer an update. */
  version: number;
  /** Download size in bytes, for showing the cost before committing to it. */
  bytes: number;
  articleCount: number;
  /** Plain-language licence line, shown in the UI. Not decoration — see README note. */
  license: string;
  attribution?: string;
  icon: string;
  /** Where the full pack file lives. */
  url: string;
  /**
   * False while a pack is announced but its file is not hosted yet. The screen
   * shows it greyed out instead of offering a button that can only fail.
   */
  published: boolean;
}

/** The catalog of packs available to download. */
export interface PackCatalog {
  catalogVersion: number;
  packs: PackListing[];
}

/** A downloaded pack: its listing metadata plus the actual articles. */
export interface ContentPack {
  id: string;
  name: string;
  version: number;
  license: string;
  attribution?: string;
  articles: PackArticle[];
}

/** Bookkeeping for one installed pack. */
export interface InstalledPack {
  id: string;
  name: string;
  version: number;
  license: string;
  attribution?: string;
  articleCount: number;
  /** Bytes actually written to disk, which may differ from the listing's estimate. */
  bytes: number;
  installedAt: number;
}

const PRIORITIES: PackPriority[] = ["P0", "P1", "P2", "P3"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Validates one article. Returns undefined for anything malformed rather than
 * repairing it — a half-read first-aid article is worse than no article.
 */
export function parsePackArticle(raw: unknown): PackArticle | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.title)) return undefined;
  if (!isNonEmptyString(r.category)) return undefined;
  if (!isStringArray(r.guidance) || r.guidance.length === 0) return undefined;
  if (!isStringArray(r.sources)) return undefined;

  const priority = PRIORITIES.includes(r.priority as PackPriority)
    ? (r.priority as PackPriority)
    : "P2";

  return {
    title: r.title.trim(),
    category: r.category.trim(),
    priority,
    sources: r.sources,
    guidance: r.guidance,
  };
}

/**
 * Validates a whole downloaded pack. A pack with some unreadable articles still
 * installs with the ones that are good; a pack with no readable articles at all,
 * or no identity, is rejected.
 */
export function parseContentPack(raw: unknown): ContentPack | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.id)) return undefined;
  if (!isNonEmptyString(r.name)) return undefined;
  if (typeof r.version !== "number" || !Number.isFinite(r.version)) return undefined;
  if (!Array.isArray(r.articles)) return undefined;

  const articles = r.articles
    .map(parsePackArticle)
    .filter((a): a is PackArticle => a !== undefined);
  if (articles.length === 0) return undefined;

  return {
    id: r.id.trim(),
    name: r.name.trim(),
    version: r.version,
    license: isNonEmptyString(r.license) ? r.license.trim() : "Licence not stated",
    attribution: isNonEmptyString(r.attribution) ? r.attribution.trim() : undefined,
    articles,
  };
}

/** Validates one catalog entry. */
export function parsePackListing(raw: unknown): PackListing | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.id)) return undefined;
  if (!isNonEmptyString(r.name)) return undefined;
  if (!isNonEmptyString(r.url)) return undefined;
  if (typeof r.version !== "number" || !Number.isFinite(r.version)) return undefined;

  const bytes = typeof r.bytes === "number" && r.bytes >= 0 ? r.bytes : 0;
  const articleCount = typeof r.articleCount === "number" && r.articleCount >= 0 ? r.articleCount : 0;

  return {
    id: r.id.trim(),
    name: r.name.trim(),
    summary: isNonEmptyString(r.summary) ? r.summary.trim() : "",
    version: r.version,
    bytes,
    articleCount,
    license: isNonEmptyString(r.license) ? r.license.trim() : "Licence not stated",
    attribution: isNonEmptyString(r.attribution) ? r.attribution.trim() : undefined,
    icon: isNonEmptyString(r.icon) ? r.icon.trim() : "plan",
    url: r.url.trim(),
    // Absent means published — a hand-written catalog shouldn't have to opt in.
    published: r.published !== false,
  };
}

/** Validates a catalog. Bad entries are dropped; a catalog with none is rejected. */
export function parsePackCatalog(raw: unknown): PackCatalog | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;
  if (!Array.isArray(r.packs)) return undefined;

  const packs = r.packs.map(parsePackListing).filter((p): p is PackListing => p !== undefined);
  if (packs.length === 0) return undefined;

  const catalogVersion =
    typeof r.catalogVersion === "number" && Number.isFinite(r.catalogVersion) ? r.catalogVersion : 1;

  return { catalogVersion, packs };
}

/** "1.4 MB" — download sizes in units a person can weigh against their storage. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
  const gb = mb / 1024;
  return `${gb < 10 ? gb.toFixed(1) : Math.round(gb)} GB`;
}
