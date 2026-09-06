import type { Category } from "@/types/resource";
import { slugify } from "@/lib/utils";

export const categories: Category[] = [
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description:
      "Notes, guides and interview prep covering modern JavaScript fundamentals and advanced patterns.",
    icon: "Code2",
  },
  {
    id: "react",
    name: "React",
    slug: "react",
    description:
      "Practical React resources for components, hooks, state management and common pitfalls.",
    icon: "Atom",
  },
  {
    id: "nextjs",
    name: "Next.js",
    slug: "nextjs",
    description:
      "Guides for building production apps with the Next.js App Router and modern tooling.",
    icon: "Layers",
  },
  {
    id: "typescript",
    name: "TypeScript",
    slug: "typescript",
    description:
      "Cheat sheets and notes to write safer, more maintainable TypeScript code.",
    icon: "FileType",
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "nodejs",
    description:
      "Backend-focused notes covering Node.js fundamentals, APIs and beginner mistakes.",
    icon: "Server",
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    slug: "html-css",
    description:
      "Layout, styling and modern CSS techniques for polished frontend interfaces.",
    icon: "Palette",
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    slug: "git-github",
    description:
      "Essential Git commands, workflows and collaboration tips for everyday development.",
    icon: "GitBranch",
  },
  {
    id: "interview-preparation",
    name: "Interview Preparation",
    slug: "interview-preparation",
    description:
      "Curated interview questions and answers to help you prepare with confidence.",
    icon: "MessageSquare",
  },
  {
    id: "cheat-sheets",
    name: "Cheat Sheets",
    slug: "cheat-sheets",
    description:
      "Quick-reference sheets you can keep open while coding or revising.",
    icon: "Sheet",
  },
  {
    id: "roadmaps",
    name: "Roadmaps",
    slug: "roadmaps",
    description:
      "Clear learning paths to go from beginner to job-ready developer.",
    icon: "Map",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(
    (category) => category.name.toLowerCase() === name.toLowerCase(),
  );
}

/** Resolve a category from a free-text name (static catalog or dynamic). */
export function categoryFromName(name: string): Category {
  const existing = getCategoryByName(name);
  if (existing) return existing;

  const slug = slugify(name);
  return {
    id: slug || "category",
    name: name.trim(),
    slug: slug || "category",
    description: `Resources in ${name.trim()}.`,
    icon: "Code2",
  };
}

/**
 * Resolve a category page by URL slug, using static catalog first,
 * then matching against category names present on resources.
 */
export function resolveCategoryBySlug(
  slug: string,
  resourceCategoryNames: string[] = [],
): Category | undefined {
  const staticCategory = getCategoryBySlug(slug);
  if (staticCategory) return staticCategory;

  const match = resourceCategoryNames.find(
    (name) => slugify(name) === slug.toLowerCase(),
  );
  return match ? categoryFromName(match) : undefined;
}
