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
import { AboutYou, aboutYouLines, hasAnything } from "@/lib/aboutYou";
import { AI_NAME } from "@/lib/aiName";

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
// Was 4200 when answers were coming out. The Max persona added roughly 165
// tokens of system prompt; the window the model was exported with is baked
// into the model file and cannot be read from here. Rather than bet on it,
// the article budget gives back what the persona and the new closing lines
// took, so total input lands where it was when it worked (~1,350 tokens). The readout on the Ask screen reports the
// real token count, and this number can be tuned from that, not from a guess.
const MAX_CONTEXT_CHARS = 3500;

// A keyword search finds the word, not the meaning. "How to pitch a tent"
// matched an article about diarrhea, and the model was then asked to answer a
// camping question from it — which is how a grounded answer turns into a
// confusing one. These two floors throw away the matches that are only
// technically matches.
//
// Both numbers come from measuring real queries rather than taste. Questions
// the app genuinely answers score 32-70 on their best hit; "what is the capital
// of france" tops out at 11.9 and every hit under it is within 8% of that, the
// flat spread that means nothing actually matched. And on a good question the
// second and third real hits land at 50-98% of the best one, while the noise
// ("Lightning" for a tent, "Femur fracture" for a knot) sits at 30-39%.
const MIN_TOP_SCORE = 15;
const RELEVANCE_FLOOR = 0.45;

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
// Max. The name is hers; the character is the warm, friendly, steady friend
// who has read the manual so you do not have to, and who talks to you like a
// person. The manner comes from the crisis-support guides responders train on
// (FEMA's CERT course, the Army's psychological first aid chapter): hear the
// person first, one thing at a time, and never the phrases that push people
// away. Everything below the tone rules is the safety contract, and it is
// unchanged: warmth is allowed to shape how a thing is said, never what is said.
export { AI_NAME };

export const SYSTEM_PROMPT = [
  "You are Max, the assistant inside the GuideHand app: the warm, friendly, steady",
  "friend sitting next to somebody on a bad day, who has read their emergency guide",
  "cover to cover and is telling them what it says.",
  "",
  "How you talk: like a kind person, never a manual. Say their name once, near the",
  "start, when you know it. First, one short warm line that shows you heard them",
  "and that they are not alone. Then the steps, most urgent first, one at a time.",
  "Last, one line of reassurance and what to watch for. Eight sentences at most.",
  "Short sentences, plain words, no hedging.",
  "Never say \"calm down\", \"I understand\", \"don't cry\", or \"it could be worse\".",
  "Always answer in full sentences; a bare article number is never an answer.",
  "",
  "Answer ONLY using the numbered articles provided below. They are the app's own",
  "verified, sourced guidance.",
  "",
  "Rules you must follow exactly:",
  "- Never add medical facts, doses, times, or measurements that are not written in the articles.",
  "- If the articles do not answer the question, say so plainly and kindly. Do not guess.",
  "- Cite the article you used by its number, like [1].",
  "- Be brief. Short sentences. The person may be frightened or in a hurry.",
  "- Right after your opening line, put the most urgent action first.",
  "- Do not assume emergency services can be reached. The grid may be down.",
].join("\n");

/**
 * The standing instruction for what to do with somebody's personal details.
 *
 * This is the guardrail on the whole feature. Knowing a person is asthmatic
 * makes the app more useful — it can point at the line of the article that
 * concerns them. It does not make the app a doctor, and a small model handed
 * a medical history will happily start improvising if nobody tells it not to.
 */
const ABOUT_YOU_RULES = [
  "ABOUT THE PERSON ASKING:",
  "This is who is talking to you. They may be asking for somebody else, so read the",
  "question for who is actually hurt or upset. Say their name once, near the start.",
  "Use these details to point out anything in the articles that matters especially",
  "for them, and to leave out what plainly does not apply.",
  "They do NOT change the rules above: still answer only from the articles, and",
  "never invent advice, a dose or a warning because of something written here.",
  "If their situation needs something the articles do not cover, say that.",
].join("\n");

function buildPrompt(question: string, articles: SourceArticle[], about?: AboutYou): string {
  const personalBlock = about && hasAnything(about) ? `${ABOUT_YOU_RULES}\n${aboutYouLines(about)}\n` : "";

  const parts: string[] = [];
  // Whatever the profile costs comes out of the articles' budget. The window is
  // about 2k tokens and does not grow because somebody filled in their
  // allergies; without this the last article silently falls off the end.
  let budget = MAX_CONTEXT_CHARS - personalBlock.length;

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

  // SYSTEM_PROMPT is deliberately absent here. It is pinned as the session's
  // system message, and repeating it spent roughly 180 tokens of a 2k window
  // restating rules the model had already been given — context the articles
  // and the answer both needed.
  return [
    ...(personalBlock ? [personalBlock] : []),
    "ARTICLES:",
    parts.join("\n\n"),
    "",
    `QUESTION: ${question.trim()}`,
    "",
    // The old last line was "ANSWER (using only the articles above, citing
    // them by number):" — and a small model finishing that sentence finishes
    // it with numbers. "[1]" alone on a real phone, twice. So the ask is now
    // for sentences, with the number at the end of each one, and it says in
    // words that numbers on their own do not count.
    "Now answer in full sentences, warmly. One short line to show you heard them, then the single most urgent thing to do.",
    "After each sentence you take from an article, put its number in brackets, like [2].",
    "Numbers on their own are not an answer.",
    "",
    "ANSWER:",
  ].join("\n");
}

/**
 * Finds the articles that answer a question and builds the grounded prompt.
 * Returns empty when nothing relevant was found — the caller must then show
 * that honestly rather than letting the model improvise.
 */
export function buildAskContext(question: string, about?: AboutYou): AskContext {
  const trimmed = question.trim();
  if (trimmed.length < 2) {
    return { question: trimmed, articles: [], prompt: "", empty: true };
  }

  const results = search(trimmed, { limit: MAX_ARTICLES * 2 });

  // The best score of anything that matched at all, including articles that
  // turn out to have no body yet. It is the honest measure of how well the
  // question landed, so it is what the floor is measured against.
  const best = results.articles[0]?.score ?? 0;
  if (best < MIN_TOP_SCORE) {
    return { question: trimmed, articles: [], prompt: "", empty: true };
  }

  const articles: SourceArticle[] = [];
  for (const hit of results.articles) {
    if (hit.score < best * RELEVANCE_FLOOR) break;
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
    prompt: buildPrompt(trimmed, articles, about),
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
