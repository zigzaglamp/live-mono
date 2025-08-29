"use client";

export default function LiveBadges({ viewers }: { viewers: number }) {
  return (
    <div className="absolute left-2 top-2 flex items-center gap-1">
      <span className="inline-flex h-6 min-w-[46px] items-center justify-center rounded-full px-2 text-[11px] font-bold uppercase tracking-wide text-white bg-gradient-to-r from-rose-600 to-orange-500">
        LIVE
      </span>
      <span className="inline-flex h-6 min-w-[74px] items-center justify-center rounded-full px-2 text-[11px] font-medium text-white tabular-nums bg-gradient-to-r from-neutral-900 to-neutral-700/90">
        {Intl.NumberFormat().format(viewers)} 시청
      </span>
    </div>
  );
}
