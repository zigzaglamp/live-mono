"use client";
import type { ReactNode } from "react";

/** Badge */
type BadgeTone = "neutral" | "live" | "sale";
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  const cls =
    tone === "live"
      ? "bg-red-600 text-white"
      : tone === "sale"
      ? "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
      : "bg-neutral-100 text-neutral-700";

  // ⛔ 여기 '}' 하나가 더 들어가 있었어요. 제거!
  return <span className={`text-[11px] px-2 py-1 rounded-full ${cls}`}>{children}</span>;
}

/** Chip */
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
      className={`h-9 px-3 rounded-full text-sm border transition-colors whitespace-nowrap ${
        active
          ? "bg-neutral-900 text-white border-neutral-900"
          : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      {children}
    </button>
  );
}

/** Section */
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
