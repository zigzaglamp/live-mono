// apps/viewer/components/cards.tsx
"use client";
import Link from "next/link";
import { KRW } from "../data";
import Image from "next/image";

const formatInt = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export interface LiveItem {
  id: string;
  title: string;
  store: string;
  category: string;
  viewers: number;
  discount: number; // %
  price: number;    // 원가
}

export interface ProductItem {
  id: string;
  badge?: string;
  name: string;
  price: number;    // 정가
  sale: number;     // 판매가
  category?: string; // ← 추가
}

export function LiveCard({ item }: { item: LiveItem }) {
  const final = (item.price * (100 - item.discount)) / 100;

  return (
    <article className="card-surface overflow-hidden">
       <Link
        href={`/live/${item.id}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-200"
       >
        {/* 썸네일 이미지 (테스트용) */}
        <Image
          src="/banners/1.png"   // ← public/banners/1.png
          alt={item.title}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />

        {/* 좌상단: LIVE + 시청자수 */}
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

// ── ProductCard ─────────────────
export function ProductCard({ item }: { item: ProductItem }) {
  return (
    <article className="card-surface">
      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-100">
        <Image
          src="/banners/1.jpg"   // 필요 시 /public 경로로 교체
          alt={item.name}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <div className="text-xs text-emerald-700 font-semibold">{item.badge} · {item.category}</div>
        <h4 className="mt-1 font-semibold line-clamp-2">{item.name}</h4>

        <div className="mt-1 text-xs text-neutral-500 line-through tabular-nums">
          {KRW(item.price)}
        </div>
        <div className="text-rose-600 font-bold tabular-nums">
          {KRW(item.sale)}
        </div>
      </div>
    </article>
  );
}
