// apps/viewer/components/uiUtile.tsx

"use client";
import type { ReactNode } from "react";

/* Section */
export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

/* Chip */
export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-3 rounded-full text-sm border transition-colors whitespace-nowrap ${active
        ? "bg-neutral-900 text-white border-neutral-900"
        : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
        }`}
    >
      {children}
    </button>
  );
}

export function InfoBadge({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] px-2 py-1 rounded-full bg-neutral-200 text-neutral-700">
      {children}
    </span>
  );
}

export function AlarmBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-2.5 text-[11px] font-semibold text-white shadow">
      {children}
    </span>
  );
}

export function TimeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-neutral-100 border border-neutral-300 px-2.5 text-[11px] font-semibold text-neutral-800">
      {children}
    </span>
  );
}
