import type {
  DifficultyLevel,
  Resource,
  ResourceType,
} from "@/types/resource";

export type ResourceRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  category: string;
  difficulty: string;
  pages: number | null;
  type: string;
  featured: boolean;
  thumbnail: string | null;
  pdf_url: string;
  pdf_path: string | null;
  tags: string[] | null;
  highlights: string[] | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type ResourceInput = {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  difficulty: DifficultyLevel | string;
  pages?: number | null;
  type: ResourceType | string;
  featured?: boolean;
  thumbnail?: string;
  pdfUrl: string;
  pdfPath?: string | null;
  tags?: string[];
  highlights?: string[];
  published?: boolean;
  publishedAt?: string;
};

export function mapResourceRow(row: ResourceRow): Resource {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.long_description ?? undefined,
    category: row.category,
    difficulty: row.difficulty as Resource["difficulty"],
    pages: row.pages ?? undefined,
    type: row.type as Resource["type"],
    featured: row.featured,
    thumbnail: row.thumbnail ?? undefined,
    pdfUrl: row.pdf_url,
    tags: row.tags ?? [],
    publishedAt: row.published_at,
    highlights: row.highlights ?? undefined,
  };
}

export function toResourceInsert(input: ResourceInput) {
  return {
    title: input.title,
    slug: input.slug,
    description: input.description,
    long_description: input.longDescription ?? null,
    category: input.category,
    difficulty: input.difficulty,
    pages: input.pages ?? null,
    type: input.type,
    featured: input.featured ?? false,
    thumbnail: input.thumbnail ?? null,
    pdf_url: input.pdfUrl,
    pdf_path: input.pdfPath ?? null,
    tags: input.tags ?? [],
    highlights: input.highlights ?? [],
    published: input.published ?? true,
    published_at: input.publishedAt ?? new Date().toISOString().slice(0, 10),
  };
}
