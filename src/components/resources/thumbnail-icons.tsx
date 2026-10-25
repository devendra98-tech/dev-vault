import type { ReactNode } from "react";
import type { ThumbnailThemeId } from "@/lib/resources/thumbnail-theme";

type IconProps = {
  className?: string;
};

export function ThumbnailIcon({
  theme,
  className,
}: {
  theme: ThumbnailThemeId;
  className?: string;
}) {
  const Icon = ICONS[theme];
  return <Icon className={className} />;
}

function ReactMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <ellipse
        cx="60"
        cy="60"
        rx="18"
        ry="48"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="5"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="18"
        ry="48"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="5"
        transform="rotate(60 60 60)"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="18"
        ry="48"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="5"
        transform="rotate(120 60 60)"
      />
      <circle cx="60" cy="60" r="8" fill="#67e8f9" />
    </svg>
  );
}

function JavaScriptMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="12" y="12" width="96" height="96" rx="18" fill="#f7df1e" />
      <path
        d="M54 80.5c0 8.2-4.8 15.1-14.8 15.1-8.2 0-13.7-4.2-16.4-9.7l8.8-5.3c1.4 2.5 3.4 4.4 7 4.4 3.6 0 5.8-1.4 5.8-6.8V52h9.6v28.5Zm16.4 14.8c-9.8 0-16.1-4.7-19.3-10.8l8.8-5.1c1.8 3.2 4.2 5.6 9.3 5.6 3.9 0 6.4-2 6.4-4.7 0-3.3-2.6-4.4-9.3-6.3-9.6-2.6-16-6.6-16-16.2 0-8 6.1-14.1 15.7-14.1 6.8 0 11.7 2.4 15.2 8.5l-8.3 5.3c-1.8-3.2-3.8-4.5-6.9-4.5-3.1 0-5.1 2-5.1 4.5 0 3.1 2 4.4 9.1 6.4 10.1 2.7 16.3 6.5 16.3 16.3 0 9.3-7.3 14.1-16.9 14.1Z"
        fill="#111827"
      />
    </svg>
  );
}

function TypeScriptMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="12" y="12" width="96" height="96" rx="18" fill="#3178c6" />
      <path
        d="M49 52.5h-9.2V48h27.6v4.5H58.2v28.8h-9.2V52.5Zm24.2 29.6c-8.9 0-14.7-4.2-18-10.2l8.4-4.8c1.8 3.2 4.4 5.7 9.1 5.7 3.8 0 6.1-1.9 6.1-4.6 0-3.2-2.5-4.3-9-6.2-9.3-2.6-15.5-6.6-15.5-16 0-7.8 6-13.8 15.4-13.8 6.7 0 11.6 2.3 15.2 8.3l-8.1 5.2c-1.8-3.2-3.8-4.5-7-4.5-3.2 0-5.2 1.9-5.2 4.4 0 3.1 2.1 4.3 9 6.3 10 2.8 15.6 6.6 15.6 16.2 0 9.2-7.2 14-16 14Z"
        fill="white"
      />
    </svg>
  );
}

function NextMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="46" fill="white" />
      <path
        d="M78.8 84.2 48.6 42H42v36h6.4V51.7l26.6 36.7a46 46 0 0 0 3.8-4.2Z"
        fill="#111827"
      />
      <path d="M77 42h-6.4v36H77V42Z" fill="#111827" />
    </svg>
  );
}

function NodeMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M60 12 104 37v46L60 108 16 83V37L60 12Z"
        fill="#5fa04e"
      />
      <path
        d="M60 28 90 45v30L60 92 30 75V45L60 28Z"
        fill="#3c873a"
      />
      <path
        d="M54.5 48h6.4c7.6 0 12.4 3.8 12.4 10.6 0 6.9-4.9 10.9-12.7 10.9H60v10.8h-5.5V48Zm6.2 16.4c4 0 6.5-1.9 6.5-5.7 0-3.8-2.5-5.6-6.5-5.6H60v11.3h.7Z"
        fill="white"
      />
    </svg>
  );
}

function GitMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="12" y="12" width="96" height="96" rx="22" fill="#f05033" />
      <path
        d="M84.8 58.4 61.6 35.2a4 4 0 0 0-5.7 0L50 41.1l7.2 7.2a6.7 6.7 0 0 1 8.5 8.5l7 7a6.7 6.7 0 1 1-3.8 3.7l-6.9-6.9v18.2a6.7 6.7 0 1 1-5.4 0V60.2a6.7 6.7 0 0 1-3.6-8.8l-7.1-7.1-18.8 18.8a4 4 0 0 0 0 5.7l23.2 23.2a4 4 0 0 0 5.7 0l23.8-23.8a4 4 0 0 0 0-5.7Z"
        fill="white"
      />
    </svg>
  );
}

function DockerMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M18 72c4 14 18 24 42 24 28 0 42-12 46-24 4-2 8-8 6-14-2-4-6-6-12-4-2-10-12-16-24-12-4-8-14-10-22-6-6-4-16-2-20 6H18c-6 0-10 6-8 12 2 4 6 6 8 6Z"
        fill="#38bdf8"
      />
      <rect x="30" y="50" width="14" height="12" rx="2" fill="white" />
      <rect x="46" y="50" width="14" height="12" rx="2" fill="white" />
      <rect x="62" y="50" width="14" height="12" rx="2" fill="white" />
      <rect x="46" y="36" width="14" height="12" rx="2" fill="white" />
      <rect x="62" y="36" width="14" height="12" rx="2" fill="white" />
      <rect x="62" y="22" width="14" height="12" rx="2" fill="white" />
      <circle cx="88" cy="62" r="3" fill="#082f49" />
    </svg>
  );
}

function AiMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g fill="none" stroke="white" strokeWidth="3">
        <path d="M28 36h64M28 60h64M28 84h64M36 28v64M60 28v64M84 28v64" />
      </g>
      <circle cx="36" cy="36" r="8" fill="#fbbf24" />
      <circle cx="60" cy="36" r="8" fill="white" />
      <circle cx="84" cy="36" r="8" fill="#c4b5fd" />
      <circle cx="36" cy="60" r="8" fill="white" />
      <circle cx="60" cy="60" r="9" fill="#f59e0b" />
      <circle cx="84" cy="60" r="8" fill="white" />
      <circle cx="36" cy="84" r="8" fill="#c4b5fd" />
      <circle cx="60" cy="84" r="8" fill="white" />
      <circle cx="84" cy="84" r="8" fill="#fbbf24" />
    </svg>
  );
}

function CyberMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M60 14 96 30v28c0 22-15 38-36 48-21-10-36-26-36-48V30L60 14Z"
        fill="#34d399"
      />
      <path
        d="M60 26 36 37v21c0 16 10 28 24 36 14-8 24-20 24-36V37L60 26Z"
        fill="#022c22"
      />
      <path
        d="M54 62.5V52a6 6 0 1 1 12 0v10.5"
        fill="none"
        stroke="#34d399"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="46" y="62" width="28" height="20" rx="5" fill="#34d399" />
    </svg>
  );
}

function RedisMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <ellipse cx="60" cy="38" rx="38" ry="14" fill="#ff4438" />
      <path d="M22 38v16c0 8 17 14 38 14s38-6 38-14V38" fill="#d82c20" />
      <ellipse cx="60" cy="54" rx="38" ry="14" fill="#ff4438" />
      <path d="M22 54v16c0 8 17 14 38 14s38-6 38-14V54" fill="#d82c20" />
      <ellipse cx="60" cy="70" rx="38" ry="14" fill="#ff6b63" />
      <path
        d="M48 34 60 28l12 6-12 6-12-6Zm-8 16 12-6 12 6-12 6-12-6Z"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}

function RoadmapMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M28 88c12-2 14-22 32-22s20 20 32 22"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="88" r="9" fill="#f59e0b" />
      <circle cx="60" cy="66" r="9" fill="#60a5fa" />
      <circle cx="92" cy="88" r="9" fill="#34d399" />
      <path
        d="M60 28v20"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M48 36h24"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SystemDesignMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="22" y="22" width="76" height="20" rx="6" fill="#f59e0b" />
      <rect x="22" y="50" width="76" height="20" rx="6" fill="white" opacity="0.92" />
      <rect x="22" y="78" width="76" height="20" rx="6" fill="#93c5fd" />
      <circle cx="34" cy="32" r="3" fill="#111827" />
      <circle cx="34" cy="60" r="3" fill="#1d4ed8" />
      <circle cx="34" cy="88" r="3" fill="#1e3a8a" />
    </svg>
  );
}

function ExpressMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="12" y="12" width="96" height="96" rx="22" fill="white" />
      <path
        d="M28 64c8-16 20-24 32-24 18 0 22 16 32 24"
        fill="none"
        stroke="#111827"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M36 78h48"
        stroke="#111827"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="84" cy="44" r="6" fill="#111827" />
    </svg>
  );
}

function AuthMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M60 14 98 30v28c0 24-16 40-38 48-22-8-38-24-38-48V30L60 14Z"
        fill="white"
      />
      <path
        d="M50 62l8 8 16-18"
        fill="none"
        stroke="#3730a3"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HtmlMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M22 12h76l-8 88-30 8-30-8L22 12Z" fill="#e44d26" />
      <path d="M60 22v76l24-6.4 6.4-69.6H60Z" fill="#f16529" />
      <path
        d="M60 50H42.5l1.2 12H60v-12Zm0 38.8-16.2-4.4-1.1-12.4H55l.4 5 4.6 1.2V88.8ZM77.8 38H60V26h32l-.7 8H60v4h16.6L77.8 38Z"
        fill="white"
      />
    </svg>
  );
}

function CssMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M22 12h76l-8 88-30 8-30-8L22 12Z" fill="#264de4" />
      <path d="M60 22v76l24-6.4 6.4-69.6H60Z" fill="#2965f1" />
      <path
        d="M60 50H42.8l1.2 12H60V50Zm18.8-12H60V26h32l-.8 8H60v4h17.6l-1 12ZM43.8 74.4 42.6 62H55l.5 6.2 4.5 1.2v12.2L44.2 77l-.4-2.6Z"
        fill="white"
      />
    </svg>
  );
}

function SqlMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <ellipse cx="60" cy="32" rx="34" ry="14" fill="white" />
      <path d="M26 32v44c0 8 15 14 34 14s34-6 34-14V32" fill="#0ea5e9" />
      <ellipse cx="60" cy="76" rx="34" ry="14" fill="white" opacity="0.95" />
      <ellipse cx="60" cy="54" rx="34" ry="14" fill="#e0f2fe" />
    </svg>
  );
}

function BackendMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="20" y="24" width="80" height="24" rx="6" fill="white" />
      <rect x="20" y="54" width="80" height="24" rx="6" fill="#5eead4" />
      <rect x="20" y="84" width="80" height="16" rx="6" fill="white" opacity="0.7" />
      <circle cx="34" cy="36" r="4" fill="#0f766e" />
      <circle cx="46" cy="36" r="4" fill="#f59e0b" />
      <circle cx="34" cy="66" r="4" fill="#042f2e" />
    </svg>
  );
}

function PythonMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M60 18c-18 0-16 12-16 12v14h32V32s2-14-16-14Z"
        fill="#3670a0"
      />
      <path
        d="M44 44H28s-14 2-14 16 14 16 14 16h16V60h32V44H44Z"
        fill="#ffde57"
      />
      <path
        d="M76 76h16s14-2 14-16-14-16-14-16H76v16H44v16h32Z"
        fill="#3670a0"
      />
      <path
        d="M60 102c18 0 16-12 16-12V76H44v14s-2 12 16 12Z"
        fill="#ffde57"
      />
      <circle cx="50" cy="30" r="4" fill="white" />
      <circle cx="70" cy="90" r="4" fill="#1e3a8a" />
    </svg>
  );
}

function InterviewMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="18" y="22" width="84" height="58" rx="14" fill="white" />
      <path d="M40 80 28 102l22-16" fill="white" />
      <rect x="34" y="40" width="52" height="6" rx="3" fill="#334155" />
      <rect x="34" y="54" width="36" height="6" rx="3" fill="#94a3b8" />
    </svg>
  );
}

function DefaultMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="22" y="18" width="76" height="84" rx="12" fill="white" />
      <path
        d="M44 48c-8 0-12 6-12 12s4 12 12 12"
        fill="none"
        stroke="#111827"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M76 48c8 0 12 6 12 12s-4 12-12 12"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<ThumbnailThemeId, (props: IconProps) => ReactNode> = {
  react: ReactMark,
  javascript: JavaScriptMark,
  nextjs: NextMark,
  nodejs: NodeMark,
  typescript: TypeScriptMark,
  git: GitMark,
  docker: DockerMark,
  ai: AiMark,
  cybersecurity: CyberMark,
  redis: RedisMark,
  "frontend-roadmap": RoadmapMark,
  roadmap: RoadmapMark,
  "system-design": SystemDesignMark,
  express: ExpressMark,
  auth: AuthMark,
  html: HtmlMark,
  css: CssMark,
  sql: SqlMark,
  backend: BackendMark,
  python: PythonMark,
  interview: InterviewMark,
  default: DefaultMark,
};
