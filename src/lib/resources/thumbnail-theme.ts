export type ThumbnailThemeId =
  | "react"
  | "javascript"
  | "nextjs"
  | "nodejs"
  | "typescript"
  | "git"
  | "docker"
  | "ai"
  | "cybersecurity"
  | "redis"
  | "frontend-roadmap"
  | "roadmap"
  | "system-design"
  | "express"
  | "auth"
  | "html"
  | "css"
  | "sql"
  | "backend"
  | "python"
  | "interview"
  | "default";

export type ThumbnailThemeInput = {
  title: string;
  category: string;
  type?: string;
  tags?: string[];
  slug?: string;
};

export type ThumbnailTheme = {
  id: ThumbnailThemeId;
  label: string;
  gradient: string;
};

const THEMES: Record<ThumbnailThemeId, ThumbnailTheme> = {
  react: {
    id: "react",
    label: "React",
    gradient: "from-[#082f49] via-[#155e75] to-[#22d3ee]",
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    gradient: "from-[#1c1403] via-[#854d0e] to-[#facc15]",
  },
  nextjs: {
    id: "nextjs",
    label: "Next.js",
    gradient: "from-[#020617] via-[#111827] to-[#475569]",
  },
  nodejs: {
    id: "nodejs",
    label: "Node.js",
    gradient: "from-[#052e16] via-[#166534] to-[#4ade80]",
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    gradient: "from-[#0b1b33] via-[#1e3a8a] to-[#38bdf8]",
  },
  git: {
    id: "git",
    label: "Git",
    gradient: "from-[#1c1917] via-[#9a3412] to-[#fb7185]",
  },
  docker: {
    id: "docker",
    label: "Docker",
    gradient: "from-[#082f49] via-[#0369a1] to-[#38bdf8]",
  },
  ai: {
    id: "ai",
    label: "AI & Machine Learning",
    gradient: "from-[#2e1065] via-[#6d28d9] to-[#fb923c]",
  },
  cybersecurity: {
    id: "cybersecurity",
    label: "Cybersecurity",
    gradient: "from-[#022c22] via-[#064e3b] to-[#34d399]",
  },
  redis: {
    id: "redis",
    label: "Redis",
    gradient: "from-[#450a0a] via-[#9f1239] to-[#fb7185]",
  },
  "frontend-roadmap": {
    id: "frontend-roadmap",
    label: "Frontend Roadmap",
    gradient: "from-[#1e1b4b] via-[#5b21b6] to-[#60a5fa]",
  },
  roadmap: {
    id: "roadmap",
    label: "Roadmap",
    gradient: "from-[#1e1b4b] via-[#6d28d9] to-[#f59e0b]",
  },
  "system-design": {
    id: "system-design",
    label: "System Design",
    gradient: "from-[#0f172a] via-[#1e3a8a] to-[#f59e0b]",
  },
  express: {
    id: "express",
    label: "Express.js",
    gradient: "from-[#020617] via-[#1f2937] to-[#9ca3af]",
  },
  auth: {
    id: "auth",
    label: "Authentication",
    gradient: "from-[#1e1b4b] via-[#3730a3] to-[#818cf8]",
  },
  html: {
    id: "html",
    label: "HTML",
    gradient: "from-[#7c2d12] via-[#c2410c] to-[#fb923c]",
  },
  css: {
    id: "css",
    label: "CSS",
    gradient: "from-[#1e3a8a] via-[#1d4ed8] to-[#38bdf8]",
  },
  sql: {
    id: "sql",
    label: "SQL",
    gradient: "from-[#0c4a6e] via-[#0369a1] to-[#22d3ee]",
  },
  backend: {
    id: "backend",
    label: "Backend",
    gradient: "from-[#042f2e] via-[#0f766e] to-[#5eead4]",
  },
  python: {
    id: "python",
    label: "Python",
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#facc15]",
  },
  interview: {
    id: "interview",
    label: "Interview Prep",
    gradient: "from-[#0f172a] via-[#334155] to-[#94a3b8]",
  },
  default: {
    id: "default",
    label: "Developer Notes",
    gradient: "from-[#111827] via-[#1e293b] to-[#f59e0b]",
  },
};

const RULES: Array<{ id: ThumbnailThemeId; pattern: RegExp }> = [
  { id: "react", pattern: /\breact(?:\s*js)?\b/i },
  { id: "nextjs", pattern: /next\.?\s*js|\bnextjs\b|\bnext\b/i },
  { id: "typescript", pattern: /type\s*script|\btypescript\b/i },
  { id: "express", pattern: /\bexpress(?:\s*js)?\b/i },
  { id: "docker", pattern: /\bdocker\b/i },
  { id: "redis", pattern: /\bredis\b/i },
  { id: "cybersecurity", pattern: /cyber|hacking|ethical\s*hack|\bsecurity\b/i },
  { id: "auth", pattern: /authenticat|authoriz|\bauth\b/i },
  { id: "ai", pattern: /machine\s*learn|\bneural\b|\bml\b|\bai\b/i },
  { id: "system-design", pattern: /system\s*design|architecture/i },
  { id: "html", pattern: /\bhtml5?\b/i },
  { id: "css", pattern: /\bcss3?\b/i },
  { id: "sql", pattern: /\bsql\b|postgres|mysql|database/i },
  { id: "git", pattern: /\bgit(?:hub)?\b/i },
  { id: "python", pattern: /\bpython\b/i },
  { id: "nodejs", pattern: /\bnode(?:\s*\.?js)?\b|\bnodejs\b/i },
  {
    id: "javascript",
    pattern: /javascript|jscoding|js[-_\s]?coding|\bjs\b/i,
  },
  { id: "backend", pattern: /backend|\bbacked\b|\bback[-_\s]?end\b/i },
  {
    id: "frontend-roadmap",
    pattern: /frontend[\s\w-]*roadmap|roadmap[\s\w-]*frontend/i,
  },
  { id: "roadmap", pattern: /\broadmap\b/i },
  { id: "interview", pattern: /interview|coding question/i },
];

const PLACEHOLDER_THUMBNAIL = /^\/resources\/[^/]+\.(jpe?g|png|webp|gif|svg)$/i;

function matchTheme(text: string): ThumbnailThemeId | null {
  const value = text.trim();
  if (!value) return null;
  for (const rule of RULES) {
    if (rule.pattern.test(value)) return rule.id;
  }
  return null;
}

export function resolveThumbnailTheme(
  input: ThumbnailThemeInput,
): ThumbnailTheme {
  const id =
    matchTheme(input.title) ??
    matchTheme(input.category) ??
    matchTheme((input.tags ?? []).join(" ")) ??
    matchTheme(input.slug ?? "") ??
    matchTheme(input.type ?? "") ??
    "default";

  return THEMES[id];
}

export function hasCustomThumbnail(thumbnail?: string | null): boolean {
  const src = thumbnail?.trim();
  if (!src) return false;
  if (src === "null" || src === "undefined" || src === "#") return false;
  if (PLACEHOLDER_THUMBNAIL.test(src)) return false;
  return true;
}
