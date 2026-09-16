// The in-memory view of whatever packs are installed right now.
//
// Content resolution across the app is synchronous — screens call
// getArticleBody(title) during render. Reading packs off disk is not. This
// registry bridges the two: packs are loaded once, asynchronously, at startup,
// and parked here where the synchronous lookups can see them.
//
// Everything here is additive. If no pack ever loads, every lookup falls
// through to the articles compiled into the app and the whole thing behaves
// exactly as it did before packs existed.

import { ArticleBody } from "@/content/articleBodies";
import { ContentPack, PackArticle } from "@/lib/packTypes";

export interface PackTopicRef {
  packId: string;
  packName: string;
  article: PackArticle;
}

let bodiesByTitle: Record<string, ArticleBody> = {};
let topicsByCategory: Record<string, PackTopicRef[]> = {};
let allTopics: PackTopicRef[] = [];

// Bumped whenever the registry changes, so screens can re-render when packs
// finish loading after first paint.
let version = 0;
const listeners = new Set<() => void>();

/** Replaces the registry with the given packs. */
export function registerPacks(packs: ContentPack[]): void {
  const nextBodies: Record<string, ArticleBody> = {};
  const nextByCategory: Record<string, PackTopicRef[]> = {};
  const nextAll: PackTopicRef[] = [];

  for (const pack of packs) {
    for (const article of pack.articles) {
      const ref: PackTopicRef = { packId: pack.id, packName: pack.name, article };
      // A later pack wins a title collision, which makes reinstalling an updated
      // pack behave the way a person expects.
      nextBodies[article.title] = { sources: article.sources, guidance: article.guidance };
      (nextByCategory[article.category] ??= []).push(ref);
      nextAll.push(ref);
    }
  }

  bodiesByTitle = nextBodies;
  topicsByCategory = nextByCategory;
  allTopics = nextAll;
  version += 1;
  listeners.forEach((fn) => fn());
}

/** Drops all pack content, leaving only what ships with the app. */
export function clearPacks(): void {
  registerPacks([]);
}

export function getPackBody(title: string): ArticleBody | undefined {
  return bodiesByTitle[title];
}

export function getPackTopicsForCategory(categoryName: string): PackTopicRef[] {
  return topicsByCategory[categoryName] ?? [];
}

export function getAllPackTopics(): PackTopicRef[] {
  return allTopics;
}

export function getPackCategoryNames(): string[] {
  return Object.keys(topicsByCategory);
}

export function getPackContentVersion(): number {
  return version;
}

export function subscribeToPackContent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
