import { ARTICLE_BODIES } from "@/content/articleBodies";
import { CATEGORIES, Category, Topic } from "@/content/categories";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
    writtenCount: cat.topics.filter((t) => ARTICLE_BODIES[t.title]).length,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => slugify(c.name) === slug);
}

export interface TopicWithMeta extends Topic {
  slug: string;
  hasBody: boolean;
}

export function getTopicsForCategory(slug: string): TopicWithMeta[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return category.topics.map((t) => ({
    ...t,
    slug: slugify(t.title),
    hasBody: Boolean(ARTICLE_BODIES[t.title]),
  }));
}

export function getTopic(categorySlug: string, topicSlug: string): TopicWithMeta | undefined {
  return getTopicsForCategory(categorySlug).find((t) => t.slug === topicSlug);
}

export function getArticleBody(title: string) {
  return ARTICLE_BODIES[title];
}

export interface SearchResult {
  categorySlug: string;
  categoryName: string;
  topic: TopicWithMeta;
}

export function searchTopics(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];
  for (const cat of CATEGORIES) {
    const categorySlug = slugify(cat.name);
    for (const t of cat.topics) {
      if (t.title.toLowerCase().includes(q)) {
        results.push({
          categorySlug,
          categoryName: cat.name,
          topic: { ...t, slug: slugify(t.title), hasBody: Boolean(ARTICLE_BODIES[t.title]) },
        });
      }
    }
  }
  return results;
}
