// apps/viewer/components/CategoriesClient.tsx
"use client";
import { useMemo, useState } from "react";
import type { Category } from "../types";
import { ProductCard, type ProductItem } from "./LiveCard";

interface Props {
  categories: Category[];
  products: ProductItem[]; // ← 변경
}

export default function CategoriesClient({ categories, products }: Props) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    const name = categories.find((c) => c.id === active)?.name;
    return products.filter((p) => p.category === name);
  }, [active, categories, products]);

  return (
    <>
      {/* 모바일 스크롤 / 데스크톱 중앙정렬, 액티브 밑줄 유지 */}
      <div className="relative z-10 mt-2">
        <div className="-mx-4 overflow-x-auto px-4 py-3 md:mx-0 md:px-0 md:py-4">
          <div className="flex gap-2 md:justify-center">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`chip-tab ${isActive ? "chip-tab-active" : ""} shrink-0`}
                >
                  {c.emoji} {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {filtered.slice(0, 8).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
