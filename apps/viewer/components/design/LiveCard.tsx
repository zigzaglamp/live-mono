// apps/viewer/components/cards.tsx
"use client";
import Link from "next/link";
import { KRW } from "../data";
import LiveBadges from "./LiveBadges"; // ⬅️ 추가 (경로는 프로젝트 구조에 맞게)

const formatInt = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export interface LiveItem {
  id: string;
  title: string;
  store: string;
  category: string;
  viewers: number;
  discount: number; // %
  price: number; // 원가
}

export interface ProductItem {
  id: string;
  badge?: string;
  name: string;
  price: number; // 정가
  sale: number; // 판매가
}

export function LiveCard({ item }: { item: LiveItem }) {
  const final = (item.price * (100 - item.discount)) / 100;

  return (
    <article className="card-surface overflow-hidden"> {/* ← card-surface로 교체 */}
      <Link href={`/live/${item.id}`} className="relative block aspect-[4/3] bg-neutral-200">
        {/* 좌상단: LIVE + 시청자수 묶음 */}
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
          <span className="text-neutral-900 font-semibold tabular-nums">{KRW(final)}</span>
        </div>
      </div>
    </article>
  );
}


// ── ProductCard (리디자인 반영) ─────────────────
export function ProductCard({
  item,
}: {
  item: ProductItem;
}) {
  return (
    <article className="card-surface"> {/* overflow-visible 포함 */}
      <div className="aspect-[4/3] bg-neutral-100 rounded-t-2xl" />

      <div className="p-3">
        {/* 상단 보조 배지(세일 등)는 기존 톤 유지 */}
        <div className="text-xs text-emerald-700 font-semibold">{item.badge}</div>

        {/* 제목에 밑줄 포커스(네비와 동일 계열) */}
        <h4 className="mt-1 font-semibold line-clamp-2">{item.name}</h4>

        {/* 정가/세일가 */}
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