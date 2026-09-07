"use client";

import { cn } from "@/lib/utils";

export type ResourceFiltersState = {
  category: string;
  difficulty: string;
  type: string;
};

type ResourceFiltersProps = {
  value: ResourceFiltersState;
  onChange: (value: ResourceFiltersState) => void;
  categories: string[];
  difficulties: string[];
  types: string[];
};

export function ResourceFilters({
  value,
  onChange,
  categories,
  difficulties,
  types,
}: ResourceFiltersProps) {
  return (
    <div className="space-y-5">
      <FilterRow
        label="Category"
        options={categories}
        selected={value.category}
        onSelect={(category) => onChange({ ...value, category })}
      />
      <FilterRow
        label="Difficulty"
        options={difficulties}
        selected={value.difficulty}
        onSelect={(difficulty) => onChange({ ...value, difficulty })}
      />
      <FilterRow
        label="Type"
        options={types}
        selected={value.type}
        onSelect={(type) => onChange({ ...value, type })}
      />
    </div>
  );
}

function FilterRow({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 text-xs transition-colors",
                active
                  ? "border-ink bg-ink text-paper dark:border-foreground dark:bg-foreground dark:text-background"
                  : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
