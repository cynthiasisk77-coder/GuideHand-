// Search that understands what a person actually types.
//
// The old search matched article titles as exact substrings. "burn" found the
// burn articles; "how do I treat a burn" found nothing at all, because no
// title contains that sentence. That is a search box that works for people who
// already know what the article is called — which is nobody who needs it.
//
// This indexes the full text of every article, strips the words that carry no
// meaning, and scores by relevance. It runs entirely on the phone, needs no
// download, and cannot invent anything: every result is an article that was
// already written and already sourced.

import { ARTICLE_BODIES } from "@/content/articleBodies";
import { CATEGORIES } from "@/content/categories";
import { getAllPackTopics, getPackContentVersion } from "@/lib/packRegistry";
import { PHRASE_HINTS, stem, STOPWORDS, ToolTarget, TOOL_TARGETS, tokenize } from "@/lib/searchTerms";

export interface SearchDoc {
  title: string;
  categoryName: string;
  categorySlug: string;
  topicSlug: string;
  priority?: string;
  fromPack?: string;
  /** Stemmed title words, for the heavier title weighting. */
  titleTerms: Set<string>;
  /** Stemmed body words to how often each appears. */
  bodyTerms: Map<string, number>;
  bodyLength: number;
  lowerTitle: string;
}

export interface ArticleHit {
  kind: "article";
  doc: SearchDoc;
  score: number;
}

export interface ToolHit {
  kind: "tool";
  tool: ToolTarget;
  score: number;
}

export type SearchHit = ArticleHit | ToolHit;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// The index
// ---------------------------------------------------------------------------

interface SearchIndex {
  docs: SearchDoc[];
  /** How many documents each term appears in, for weighting rare words higher. */
  docFrequency: Map<string, number>;
  averageLength: number;
  /** Which pack registry version this was built against. */
  packVersion: number;
}

let cached: SearchIndex | undefined;

function buildDoc(
  title: string,
  categoryName: string,
  bodyText: string,
  priority?: string,
  fromPack?: string
): SearchDoc {
  const titleTerms = new Set(tokenize(title));
  const bodyTerms = new Map<string, number>();
  let bodyLength = 0;
  for (const term of tokenize(bodyText)) {
    bodyTerms.set(term, (bodyTerms.get(term) ?? 0) + 1);
    bodyLength += 1;
  }
  return {
    title,
    categoryName,
    categorySlug: slugify(categoryName),
    topicSlug: slugify(title),
    priority,
    fromPack,
    titleTerms,
    bodyTerms,
    bodyLength,
    lowerTitle: title.toLowerCase(),
  };
}

/**
 * Builds the index. Done once, lazily, on the first search — not at startup,
 * so opening the app stays instant.
 */
function buildIndex(): SearchIndex {
  const docs: SearchDoc[] = [];
  const seen = new Set<string>();

  for (const category of CATEGORIES) {
    for (const topic of category.topics) {
      const slug = slugify(topic.title);
      if (seen.has(slug)) continue;
      seen.add(slug);
      const body = ARTICLE_BODIES[topic.title];
      const bodyText = body ? [...body.guidance, ...body.sources].join(" ") : "";
      docs.push(buildDoc(topic.title, category.name, bodyText, topic.priority));
    }
  }

  for (const ref of getAllPackTopics()) {
    const slug = slugify(ref.article.title);
    if (seen.has(slug)) continue;
    seen.add(slug);
    const bodyText = [...ref.article.guidance, ...ref.article.sources].join(" ");
    docs.push(
      buildDoc(ref.article.title, ref.article.category, bodyText, ref.article.priority, ref.packName)
    );
  }

  const docFrequency = new Map<string, number>();
  let totalLength = 0;
  for (const doc of docs) {
    totalLength += doc.bodyLength;
    const inThisDoc = new Set<string>([...doc.titleTerms, ...doc.bodyTerms.keys()]);
    for (const term of inThisDoc) {
      docFrequency.set(term, (docFrequency.get(term) ?? 0) + 1);
    }
  }

  return {
    docs,
    docFrequency,
    averageLength: docs.length > 0 ? totalLength / docs.length : 1,
    packVersion: getPackContentVersion(),
  };
}

function getIndex(): SearchIndex {
  // Installing or removing a pack changes what there is to search, so the
  // index is rebuilt when the registry moves rather than going stale.
  if (!cached || cached.packVersion !== getPackContentVersion()) {
    cached = buildIndex();
  }
  return cached;
}

/** Test seam, and a way to force a rebuild if content ever changes at runtime. */
export function resetSearchIndex(): void {
  cached = undefined;
}

// ---------------------------------------------------------------------------
// Querying
// ---------------------------------------------------------------------------

export interface ParsedQuery {
  /** What the person typed, lowercased, for exact-phrase matching. */
  phrase: string;
  /** Stemmed words from the query itself. */
  terms: string[];
  /** Extra terms suggested by the everyday-phrasing map. */
  hintTerms: string[];
  /** True when the question names a human being rather than a thing. */
  aboutAPerson: boolean;
}

export function parseQuery(raw: string): ParsedQuery {
  const phrase = raw.trim().toLowerCase();
  const terms = tokenize(raw);
  // Read this off the raw words, before tokenising strips them — most of them
  // are stopwords and would be gone by the time terms exist.
  const aboutAPerson = phrase
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .some((word) => PERSON_WORDS.has(word));

  const hintTerms: string[] = [];
  for (const hint of PHRASE_HINTS) {
    if (hint.match.test(phrase)) {
      for (const term of hint.terms) {
        const stemmed = stem(term.toLowerCase());
        if (!terms.includes(stemmed) && !hintTerms.includes(stemmed)) hintTerms.push(stemmed);
      }
    }
  }

  // A single meaningful word that is all stopwords still deserves a try.
  if (terms.length === 0 && phrase.length > 1) {
    const bare = phrase.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).map(stem);
    return { phrase, terms: bare, hintTerms, aboutAPerson };
  }

  return { phrase, terms, hintTerms, aboutAPerson };
}

// Rare words say more about what someone means than common ones. A document
// containing "tourniquet" is a stronger match than one containing "water".
function inverseDocumentFrequency(term: string, index: SearchIndex): number {
  const df = index.docFrequency.get(term) ?? 0;
  if (df === 0) return 0;
  return Math.log(1 + index.docs.length / df);
}

const TITLE_WEIGHT = 6;
const BODY_WEIGHT = 1;
// Hints are real but second-hand: they came from a phrase map, not the person.
const HINT_SCALE = 0.55;
const EXACT_PHRASE_BONUS = 40;
const TITLE_PREFIX_BONUS = 12;

// When someone is searching in an emergency, the life-threatening article
// should not sit below a general-interest one that happened to score a shade
// higher on word overlap.
const PRIORITY_BONUS: Record<string, number> = { P0: 8, P1: 3, P2: 0, P3: 0 };

// Words that say the question is about a human being.
//
// This exists because of a real failure. Somebody typed "Someone overheating"
// while a person was overheating in front of them, and the top result — the
// one the model answered from — was "Vehicle overheating". A car article, for
// heat stroke. "Someone" was being discarded as a stopword, which made the
// query identical to "overheating", and the vehicle article wins that on an
// exact title match.
//
// The subject of the sentence is not noise. It is often the only thing
// separating a medical emergency from a mechanical one.
const PERSON_WORDS = new Set([
  "someone", "somebody", "person", "people", "anyone", "man", "woman", "guy",
  "kid", "kids", "child", "children", "baby", "infant", "toddler", "teen",
  "he", "she", "him", "her", "they", "them", "his", "hers",
  "my", "mom", "mother", "dad", "father", "husband", "wife", "son", "daughter",
  "grandma", "grandpa", "granny", "friend", "neighbour", "neighbor",
  "patient", "victim", "i'm", "im", "me", "myself",
]);

// Where a question about a person should be looking.
const HUMAN_CATEGORIES = new Set([
  "Medical & First Aid",
  "What To Do In An Emergency",
  "Family & Caregiving",
]);

// And where it should not. These are machines and buildings — genuinely useful
// categories, and exactly the wrong shelf when somebody is describing a body.
const NOT_ABOUT_PEOPLE = new Set([
  "Vehicles & Mechanics",
  "Home Systems",
  "Power & Lighting",
  "Tools & Repairs",
]);

function scoreDoc(doc: SearchDoc, query: ParsedQuery, index: SearchIndex): number {
  let score = 0;

  const scoreTerm = (term: string, scale: number) => {
    const idf = inverseDocumentFrequency(term, index);
    if (idf === 0) return;
    if (doc.titleTerms.has(term)) score += TITLE_WEIGHT * idf * scale;
    const tf = doc.bodyTerms.get(term);
    if (tf) {
      // Diminishing returns: the tenth mention says little more than the third.
      const saturated = tf / (tf + 2);
      // Normalise by length so a long article isn't favoured for being long.
      const lengthFactor = index.averageLength / (index.averageLength + doc.bodyLength * 0.35);
      score += BODY_WEIGHT * idf * saturated * lengthFactor * scale * 3;
    }
  };

  for (const term of query.terms) scoreTerm(term, 1);
  for (const term of query.hintTerms) scoreTerm(term, HINT_SCALE);

  if (score === 0) return 0;

  if (query.phrase.length > 2) {
    if (doc.lowerTitle.includes(query.phrase)) score += EXACT_PHRASE_BONUS;
    else if (doc.lowerTitle.startsWith(query.phrase.split(" ")[0])) score += TITLE_PREFIX_BONUS;
  }

  // Every query word appearing in the title is a strong signal.
  const meaningful = query.terms.filter((t) => !STOPWORDS.has(t));
  if (meaningful.length > 0 && meaningful.every((t) => doc.titleTerms.has(t))) {
    score += 15;
  }

  score += PRIORITY_BONUS[doc.priority ?? "P2"] ?? 0;

  // Somebody describing a person gets articles about people. A car article can
  // still appear — it is just no longer allowed to outrank heat stroke when the
  // question said "someone".
  if (query.aboutAPerson) {
    if (NOT_ABOUT_PEOPLE.has(doc.categoryName)) score *= 0.45;
    else if (HUMAN_CATEGORIES.has(doc.categoryName)) score *= 1.25;
  }

  return score;
}

function scoreTool(tool: ToolTarget, query: ParsedQuery): number {
  let score = 0;
  const label = tool.label.toLowerCase();
  const all = [...query.terms, ...query.hintTerms];

  for (const term of query.terms) {
    if (tool.keywords.some((k) => stem(k) === term)) score += 12;
    else if (tool.keywords.some((k) => stem(k).startsWith(term) && term.length >= 4)) score += 6;
  }
  for (const term of query.hintTerms) {
    if (tool.keywords.some((k) => stem(k) === term)) score += 4;
  }
  if (query.phrase.length > 2 && label.includes(query.phrase)) score += 25;
  if (all.length === 0) return 0;
  return score;
}

export interface SearchOptions {
  /** How many article results to return. */
  limit?: number;
}

export interface SearchResults {
  articles: ArticleHit[];
  tools: ToolHit[];
  /** True when the everyday-phrasing map contributed, so the UI can say why. */
  usedHints: boolean;
}

export function search(raw: string, options: SearchOptions = {}): SearchResults {
  const limit = options.limit ?? 25;
  const query = parseQuery(raw);
  if (query.terms.length === 0 && query.hintTerms.length === 0) {
    return { articles: [], tools: [], usedHints: false };
  }

  const index = getIndex();

  const articles: ArticleHit[] = [];
  for (const doc of index.docs) {
    const score = scoreDoc(doc, query, index);
    if (score > 0) articles.push({ kind: "article", doc, score });
  }
  articles.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));

  const tools: ToolHit[] = [];
  for (const tool of TOOL_TARGETS) {
    const score = scoreTool(tool, query);
    if (score > 0) tools.push({ kind: "tool", tool, score });
  }
  tools.sort((a, b) => b.score - a.score);

  return {
    articles: articles.slice(0, limit),
    tools: tools.slice(0, 3),
    usedHints: query.hintTerms.length > 0 && articles.length > 0,
  };
}
