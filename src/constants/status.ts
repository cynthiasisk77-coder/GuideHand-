import { ArticleStatus, Priority } from "@/content/categories";

export const STATUS_LABEL: Record<ArticleStatus, string> = {
  verified: "VERIFIED",
  specialist: "SPECIALIST",
  partial: "PARTIAL",
  pending: "PENDING",
  new: "NEW",
};

export const STATUS_COLOR: Record<ArticleStatus, string> = {
  verified: "#16A34A",
  specialist: "#7C3AED",
  partial: "#D97706",
  pending: "#6B7280",
  new: "#2563EB",
};

export const STATUS_EXPLANATION: Record<ArticleStatus, string> = {
  verified: "Checked against a government agency, recognized professional body, or established nonprofit.",
  specialist: "Drafted from good sources but needs a licensed professional's review before it's final.",
  partial: "Real guidance exists but sourcing or detail is incomplete — treat with extra care.",
  pending: "Identified as needed; not yet researched or written.",
  new: "Newly added to the plan; research hasn't started.",
};

export const PRIORITY_COLOR: Record<Priority, string> = {
  P0: "#DC2626",
  P1: "#EA580C",
  P2: "#CA8A04",
  P3: "#6B7280",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  P0: "Life-threatening — act immediately",
  P1: "Time-critical",
  P2: "Property / mechanical",
  P3: "Planning / reference",
};
