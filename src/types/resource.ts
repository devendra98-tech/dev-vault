export type ResourceType = "PDF" | "Cheat Sheet" | "Roadmap" | "Guide";

export type DifficultyLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Beginner → Intermediate"
  | "Beginner → Advanced"
  | "Intermediate → Advanced";

export type Resource = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: DifficultyLevel;
  pages?: number;
  type: ResourceType;
  featured?: boolean;
  thumbnail?: string;
  pdfUrl: string;
  tags: string[];
  publishedAt: string;
  highlights?: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};
