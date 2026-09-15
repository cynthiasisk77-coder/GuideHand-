import { ArticleStatus, Priority } from "@/content/categories";

export const STATUS_LABEL: Record<ArticleStatus, string> = {
  verified: "VERIFIED",
  specialist: "SPECIALIST",
  partial: "PARTIAL",
  pending: "PENDING",
  new: "NEW",
};

export const STATUS_EXPLANATION: Record<ArticleStatus, string> = {
  verified: "Checked against a government agency, recognized professional body, or established nonprofit.",
  specialist: "Drafted from good sources but needs a licensed professional's review before it's final.",
  partial: "Real guidance exists but sourcing or detail is incomplete — treat with extra care.",
  pending: "Identified as needed; not yet researched or written.",
  new: "Newly added to the plan; research hasn't started.",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  P0: "Life-threatening — act immediately",
  P1: "Time-critical",
  P2: "Property / mechanical",
  P3: "Planning / reference",
};

type PriorityColors = {
  danger: string;
  priorityUrgent: string;
  priorityImportant: string;
  priorityGoodToKnow: string;
};

// P0 (life-threatening) keeps the reserved red — never used anywhere else.
// P1-P3 step down through a soft blue/green/yellow ladder, deliberately kept
// apart from the deep blue used for header blocks so the two never look alike.
export function priorityColor(priority: Priority, c: PriorityColors): string {
  switch (priority) {
    case "P0":
      return c.danger;
    case "P1":
      return c.priorityUrgent;
    case "P2":
      return c.priorityImportant;
    case "P3":
      return c.priorityGoodToKnow;
  }
}

// P3's soft yellow is too light for white text; every other tier stays white.
export function priorityTextColor(priority: Priority, ink: string): string {
  return priority === "P3" ? ink : "#FFFFFF";
}
