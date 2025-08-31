// apps/viewer/features/LiveCard.tsx

"use client";
import Link from "next/link";
import Image from "next/image";
import { KRW, formatInt } from "@components/data";
import { liveItem } from "@components/types";

export function LiveCard({ item }: { item: liveItem }) {

  const final = (item.price * (100 - item.discount)) / 100;

  return (
    <article className="card-surface overflow-hidden">
      <Link
        href={`/live/${item.id}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-200"
      >
        <Image
          src="/testImages/1.png"
          alt={item.title}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
        <div className="pill-row">
          <span className="pill-live">LIVE</span>
          <span className="pill-viewers">
            <span className="num">{formatInt(item.viewers)}</span> 시청
          </span>
        </div>
      </Link>

      <div className="p-3">
        <div className="text-[13px] text-neutral-500">
          {item.store} · {item.category}
        </div>
        <h4 className="mt-0.5 font-semibold leading-snug line-clamp-2">
          {item.title}
        </h4>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-rose-600 font-bold">{item.discount}%</span>
          <span className="text-neutral-900 font-semibold tabular-nums">
            {KRW(final)}
          </span>
        </div>
      </div>
    </article>
  );
}

