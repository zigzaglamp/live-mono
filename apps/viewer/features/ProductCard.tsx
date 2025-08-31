// apps/viewer/features/ProductCard.tsx

"use client";
import Image from "next/image";
import { KRW } from "@/components/data";
import { products } from "@/components/types";

export function ProductCard({ item }: { item: products }) {
    return (
        <article className="card-surface">
            <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-neutral-100">
                <Image
                    src="/banners/0.png"
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
