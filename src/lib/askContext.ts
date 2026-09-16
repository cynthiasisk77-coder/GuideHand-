// Turning a question into something a small language model can answer safely.
//
// This is the whole reason the AI in this app is not a liability. A small
// quantized model asked "how much ibuprofen for a 6 year old" from its own
// memory will answer, fluently, and may be wrong. Asked the same question with
// GuideHand's own sourced article pasted in front of it, and told to use only
// that, it becomes something much narrower and much more useful: a thing that
// reads you your own vetted page in the words you asked in.
//
// So the model never answers from what it knows. It answers from what we hand
// it, it names which article each part came from, and when we have nothing
// relevant to hand it we do not ask it at all.

import { ARTICLE_BODIES } from "@/content/articleBodies";
import { getPackBody } from "@/lib/packRegistry";
import { search, SearchDoc } from "@/lib/search";

/** One article handed to the model as source material. */
export interface SourceArticle {
  title: string;
  categoryName: string;
  categorySlug: string;
  topicSlug: string;
  priority?: string;
  guidance: string[];
  sources: string[];
}

export interface AskContext {
  question: string;
  articles: SourceArticle[];
  /** The text handed to the model. Empty when there is nothing to answer from. */
  prompt: string;
  /** True when nothing relevant was found, so the model must not be asked. */
  empty: boolean;
}

// Enough articles to cover a question, few enough to fit a small model's
// context window without the important one falling off the end.
const MAX_ARTICLES = 4;
const MAX_BULLETS_PER_ARTICLE = 10;
// Roughly four characters per token; small models here run about 2k context.
const MAX_CONTEXT_CHARS = 4200;

function bodyFor(title: string): { guidance: string[]; sources: string[] } | undefined {
  const own = ARTICLE_BODIES[title];
  if (own) return own;
  const fromPack = getPackBody(title);
  return fromPack ?? undefined;
}

function toSourceArticle(doc: SearchDoc): SourceArticle | undefined {
  const body = bodyFor(doc.title);
  if (!body || body.guidance.length === 0) return undefined;
  return {
    title: doc.title,
    categoryName: doc.categoryName,
    categorySlug: doc.categorySlug,
    topicSlug: doc.topicSlug,
    priority: doc.priority,
    guidance: body.guidance.slice(0, MAX_BULLETS_PER_ARTICLE),
    sources: body.sources,
  };
}

/**
 * The standing instruction. Deliberately blunt and repetitive: small models
 * drift, and the one thing that must not drift is "do not make up medicine."
 */
export const SYSTEM_PROMPT = [
  "You are GuideHand, an offline emergency reference on someone's phone.",
  "",
  "Answer ONLY using the numbered articles provided below. They are the app's own",
  "verified, sourced guidance.",
  "",
  "Rules you must follow exactly:",
  "- Never add medical facts, doses, times, or measurements that are not written in the articles.",
  "- If the articles do not answer the question, say so plainly. Do not guess.",
  "- Cite the article you used by its number, like [1].",
  "- Be brief. Short sentences. The person may be frightened or in a hurry.",
  "- Put the most urgent action first.",
  "- Do not assume emergency services can be reached. The grid may be down.",
].join("\n");

function buildPrompt(question: string, articles: SourceArticle[]): string {
  const parts: string[] = [];
  let budget = MAX_CONTEXT_CHARS;

  articles.forEach((article, i) => {
    const header = `[${i + 1}] ${article.title}`;
    const bullets: string[] = [];
    for (const line of article.guidance) {
      if (header.length + line.length + 3 > budget) break;
      bullets.push(`- ${line}`);
      budget -= line.length + 3;
    }
    if (bullets.length > 0) {
      parts.push(`${header}\n${bullets.join("\n")}`);
      budget -= header.length;
    }
  });

  return [
    SYSTEM_PROMPT,
    "",
    "ARTICLES:",
    parts.join("\n\n"),
    "",
    `QUESTION: ${question.trim()}`,
    "",
    "ANSWER (using only the articles above, citing them by number):",
  ].join("\n");
}

/**
 * Finds the articles that answer a question and builds the grounded prompt.
 * Returns empty when nothing relevant was found — the caller must then show
 * that honestly rather than letting the model improvise.
 */
export function buildAskContext(question: string): AskContext {
  const trimmed = question.trim();
  if (trimmed.length < 2) {
    return { question: trimmed, articles: [], prompt: "", empty: true };
  }

  const results = search(trimmed, { limit: MAX_ARTICLES * 2 });
  const articles: SourceArticle[] = [];
  for (const hit of results.articles) {
    const article = toSourceArticle(hit.doc);
    if (article) articles.push(article);
    if (articles.length >= MAX_ARTICLES) break;
  }

  if (articles.length === 0) {
    return { question: trimmed, articles: [], prompt: "", empty: true };
  }

  return {
    question: trimmed,
    articles,
    prompt: buildPrompt(trimmed, articles),
    empty: false,
  };
}

/**
 * Pulls the [n] citations out of an answer so the UI can show the articles it
 * actually leaned on, as tappable links back to the real thing.
 */
export function citedArticles(answer: string, articles: SourceArticle[]): SourceArticle[] {
  const cited = new Set<number>();
  for (const match of answer.matchAll(/\[(\d+)\]/g)) {
    const index = Number(match[1]) - 1;
    if (index >= 0 && index < articles.length) cited.add(index);
  }
  // No citations at all usually means the model ignored the instruction, so
  // show everything it was given rather than implying it used nothing.
  if (cited.size === 0) return articles;
  return [...cited].sort((a, b) => a - b).map((i) => articles[i]);
}
