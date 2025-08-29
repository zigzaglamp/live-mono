// apps/viewer/app/ranking/page.tsx
import { Section } from "@/components/ui";
import { liveCards, products } from "@/components/data";
import { LiveCard, ProductCard } from "@/components/design/LiveCard";

export default function RankingPage() {
  return (
    <>
      <Section
        title="실시간 인기 라이브"
        action={<a className="text-sm text-neutral-500" href="#">전체보기</a>}
      >
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {liveCards.slice(0, 10).map((item, idx) => (
            <div key={item.id} className="min-w-[220px]">
              <LiveCard item={item} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="라이브 상품 TOP 100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
