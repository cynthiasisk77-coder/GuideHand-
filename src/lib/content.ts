import { ARTICLE_BODIES, ArticleBody } from "@/content/articleBodies";
import { CATEGORIES, Category, Topic } from "@/content/categories";
import { QUICK_ARTICLE_MAP } from "@/content/quickLinks";
import {
  getAllPackTopics,
  getPackBody,
  getPackCategoryNames,
  getPackTopicsForCategory,
  PackTopicRef,
} from "@/lib/packRegistry";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface ResolvedBody {
  body: ArticleBody;
  // Set when the steps come from a full article with a different title.
  sourceTitle?: string;
}

export function resolveArticleBody(title: string): ResolvedBody | undefined {
  const own = ARTICLE_BODIES[title];
  if (own) return { body: own };
  const primary = QUICK_ARTICLE_MAP[title]?.primary;
  const mapped = primary ? ARTICLE_BODIES[primary] : undefined;
  if (mapped) return { body: mapped, sourceTitle: primary };
  // Installed packs come last: the app's own verified articles always win, so a
  // downloaded file can never quietly replace one of them.
  const fromPack = getPackBody(title);
  return fromPack ? { body: fromPack } : undefined;
}

export function getArticleBody(title: string): ArticleBody | undefined {
  return resolveArticleBody(title)?.body;
}

export interface CategorySummary {
  slug: string;
  name: string;
  note?: string;
  topicCount: number;
  writtenCount: number;
}

export function getCategorySummaries(): CategorySummary[] {
  return CATEGORIES.map((cat) => ({
    slug: slugify(cat.name),
    name: cat.name,
    note: cat.note,
    topicCount: cat.topics.length + getPackTopicsForCategory(cat.name).length,
    writtenCount:
      cat.topics.filter((t) => getArticleBody(t.title)).length +
      getPackTopicsForCategory(cat.name).length,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => slugify(c.name) === slug);
}

export interface TopicWithMeta extends Topic {
  slug: string;
  hasBody: boolean;
  /** Set when this topic came from a downloaded pack rather than the app itself. */
  fromPack?: string;
}

function withMeta(t: Topic): TopicWithMeta {
  return { ...t, slug: slugify(t.title), hasBody: Boolean(getArticleBody(t.title)) };
}

function packTopicToMeta(ref: PackTopicRef): TopicWithMeta {
  return {
    title: ref.article.title,
    status: "verified",
    priority: ref.article.priority,
    note: ref.packName,
    slug: slugify(ref.article.title),
    hasBody: true,
    fromPack: ref.packName,
  };
}

// A pack article is skipped when the app already carries that title, so an
// overlapping pack adds depth without producing a duplicate row.
function mergePackTopics(existing: TopicWithMeta[], packTopics: TopicWithMeta[]): TopicWithMeta[] {
  const seen = new Set(existing.map((t) => t.slug));
  return [...existing, ...packTopics.filter((t) => !seen.has(t.slug))];
}

export function getTopicsForCategory(slug: string): TopicWithMeta[] {
  const category = getCategoryBySlug(slug);
  if (!category) {
    // A pack can name a category the app itself doesn't have. Serve those
    // topics anyway, so a search result never leads to an empty screen.
    const packCategory = getPackCategoryNames().find((name) => slugify(name) === slug);
    return packCategory ? getPackTopicsForCategory(packCategory).map(packTopicToMeta) : [];
  }
  const own = category.topics.map(withMeta);
  const fromPacks = getPackTopicsForCategory(category.name).map(packTopicToMeta);
  return mergePackTopics(own, fromPacks);
}

/** The display name for a category slug, including pack-only categories. */
export function getCategoryNameBySlug(slug: string): string | undefined {
  const own = getCategoryBySlug(slug);
  if (own) return own.name;
  return getPackCategoryNames().find((name) => slugify(name) === slug);
}

export function getTopic(categorySlug: string, topicSlug: string): TopicWithMeta | undefined {
  return getTopicsForCategory(categorySlug).find((t) => t.slug === topicSlug);
}

export interface TopicRef {
  categorySlug: string;
  categoryName: string;
  topic: TopicWithMeta;
}

export function findTopicByTitle(title: string): TopicRef | undefined {
  for (const cat of CATEGORIES) {
    const topic = cat.topics.find((t) => t.title === title);
    if (topic) {
      return { categorySlug: slugify(cat.name), categoryName: cat.name, topic: withMeta(topic) };
    }
  }
  return undefined;
}

export function getRelatedTopics(title: string): TopicRef[] {
  const related = QUICK_ARTICLE_MAP[title]?.related ?? [];
  return related.map(findTopicByTitle).filter((r): r is TopicRef => Boolean(r));
}

// Every genuinely life-threatening (P0) topic from a given set of category
// names, regardless of which category "owns" it — used by the emergency
// fan-out so someone can find their crisis by type without knowing which of
// 20+ categories it's filed under.
export function getP0TopicsForCategories(categoryNames: string[]): TopicRef[] {
  const results: TopicRef[] = [];
  for (const cat of CATEGORIES) {
    if (!categoryNames.includes(cat.name)) continue;
    const categorySlug = slugify(cat.name);
    for (const t of cat.topics) {
      if (t.priority === "P0") {
        results.push({ categorySlug, categoryName: cat.name, topic: withMeta(t) });
      }
    }
  }
  return results;
}

export type SearchResult = TopicRef;

export function searchTopics(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];
  const seen = new Set<string>();
  for (const cat of CATEGORIES) {
    const categorySlug = slugify(cat.name);
    for (const t of cat.topics) {
      if (t.title.toLowerCase().includes(q)) {
        seen.add(slugify(t.title));
        results.push({ categorySlug, categoryName: cat.name, topic: withMeta(t) });
      }
    }
  }
  for (const ref of getAllPackTopics()) {
    if (!ref.article.title.toLowerCase().includes(q)) continue;
    if (seen.has(slugify(ref.article.title))) continue;
    seen.add(slugify(ref.article.title));
    results.push({
      categorySlug: slugify(ref.article.category),
      categoryName: ref.article.category,
      topic: packTopicToMeta(ref),
    });
  }
  return results;
}
