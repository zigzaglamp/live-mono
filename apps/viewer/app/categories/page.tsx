import { Section } from "@/components/ui";
import { categories, liveCards } from "@/components/data";
import { LiveCard } from "@/components/design/LiveCard";
import CategoriesClient from "@/components/design/CategoriesClient";

export default function CategoriesPage() {
  return (
    <>
      {/* 카테고리 선택/필터링은 클라 전용 */}
      <CategoriesClient categories={categories} liveCards={liveCards} />

      <Section title="인기 BEST">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {liveCards.slice(0, 8).map((item) => (
            <LiveCard key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
