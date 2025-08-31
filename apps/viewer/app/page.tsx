// apps/viewer/app/page.tsx

import PcBannerClient from "@features/PcBannerClient";
import MobileBannerClient from "@features/MobileBannerClient";
import { Section } from "@components/uiUtile";
import { banners, products } from "@components/data";
import { ProductCard } from "@features/ProductCard";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1280px]">
      <h1 className="px-4 pt-6 text-2xl font-extrabold lg:px-0">오늘 놓치지 마세요!</h1>
      {/* 모바일 전용 */}
      <div className="block lg:hidden">
        <MobileBannerClient items={banners} />
      </div>
      {/* 데스크톱 전용 */}
      <div className="hidden lg:block">
        <div className="mt-4">
          <PcBannerClient items={banners} />
        </div>
      </div>
      {/* ▼ 추가: 라이브 상품 TOP 100 */}
      <Section title="라이브 상품 TOP 100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>
      </Section>
    </main>
  );
}
