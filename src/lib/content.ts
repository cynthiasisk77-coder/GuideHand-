import { ARTICLE_BODIES, ArticleBody } from "@/content/articleBodies";
import { CATEGORIES, Category, Topic } from "@/content/categories";
import { QUICK_ARTICLE_MAP } from "@/content/quickLinks";

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
  return mapped ? { body: mapped, sourceTitle: primary } : undefined;
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
    topicCount: cat.topics.length,
    writtenCount: cat.topics.filter((t) => getArticleBody(t.title)).length,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => slugify(c.name) === slug);
}

export interface TopicWithMeta extends Topic {
  slug: string;
  hasBody: boolean;
}

function withMeta(t: Topic): TopicWithMeta {
  return { ...t, slug: slugify(t.title), hasBody: Boolean(getArticleBody(t.title)) };
}

export function getTopicsForCategory(slug: string): TopicWithMeta[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return category.topics.map(withMeta);
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
  for (const cat of CATEGORIES) {
    const categorySlug = slugify(cat.name);
    for (const t of cat.topics) {
      if (t.title.toLowerCase().includes(q)) {
        results.push({ categorySlug, categoryName: cat.name, topic: withMeta(t) });
      }
    }
  }
  return results;
}
