"use client";

import { useMemo, useState } from "react";
import { Section, Chip } from "@/components/ui";
import { liveCards, categories as dataCategories } from "@/components/data";
import { LiveCard } from "@/components/design/LiveCard";
import BannerSlider from "@/components/design/BannerSlider";
import type { Category } from "@/components/types";

const banners = [
  {
    id: "b1",
    title: "놓치면 아쉬운 생방 혜택!",
    subtitle: "지금 시청하면 라이브 쿠폰 즉시 적용",
    cta: "지금 보러가기",
    thumb: "/banners/1.jpg",  // ← public 폴더에 넣은 이미지 경로
  },
  {
    id: "b2",
    title: "주말 특집 ✨ 초특가 라이브",
    subtitle: "최대 60% 세일 + 무료배송",
    thumb: "/banners/2.png",
  },
  {
    id: "b3",
    title: "신규 브랜드 런칭 🎉",
    subtitle: "팔로우하고 알림 받기",
    thumb: "/banners/3.png",
  },
];

export default function Page() {
  // 데이터는 dataCategories를 사용하되, 타입은 Category[]로 명시
  const categories = dataCategories as unknown as Category[];

  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return liveCards as any[];
    const activeLabel = categories.find((c) => c.id === active)?.name ?? active;
    // liveCards.item.category가 라벨(한글)이라면 아래 비교로 필터
    return (liveCards as any[]).filter(
      (l) => l.category === active || l.category === activeLabel
    );
  }, [active, categories]);

  return (
    <div className="pb-10">
      <BannerSlider items={banners} />

      {/* 카테고리 칩: 모바일 가로 스크롤 + z-index로 배너보다 위 */}
      <div className="relative z-10 mt-4">
        <div className="-mx-4 overflow-x-auto px-4 py-3 md:mx-0 md:px-0 md:py-4">
          <div className="flex gap-2 md:justify-center">
            {categories.map((c) => {
              const activeChip = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  aria-pressed={activeChip}
                  className={`chip-tab ${activeChip ? "chip-tab-active" : ""} shrink-0`}
                >
                  {c.emoji} {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>



      <Section
        title="바로 지금! 라이브 찬스"
        action={<a className="btn btn-soft h-9" href="#live-now">더보기</a>}
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {filtered.slice(0, 8).map((item: any) => (
            <LiveCard key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}
