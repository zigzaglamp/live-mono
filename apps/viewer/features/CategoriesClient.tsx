// apps/viewerfeatures/CategoriesClient.tsx

"use client";
import { useMemo, useState } from "react";
import { iconMap } from "@components/iconMap";
import { ProductCard } from "@features/ProductCard";
import type { categories, products } from "@components/types";

interface Props {
  categories: categories[];
  products: products[];
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
      <div className="relative z-10 mt-2">
        <div className="-mx-4 overflow-x-auto px-4 py-3 md:mx-0 md:px-0 md:py-4">
          <div className="flex gap-2 md:justify-center">
            {categories.map((c) => {
              const isActive = active === c.id;
              const Icon = iconMap[c.iconKey];
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`chip-tab ${isActive ? "chip-tab-active" : ""} shrink-0 inline-flex items-center gap-1 whitespace-nowrap`}
                >
                  {Icon ? <Icon className="w-4 h-4 shrink-0" aria-hidden /> : null}
                  <span className="leading-none">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {filtered.slice(0, 8).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
