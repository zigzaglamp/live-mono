"use client";

import { useEffect, useRef, useState } from "react";

export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  cta?: string;
  /** apps/viewer/public 기준 경로. 예) "/banners/1.png" */
  thumb?: string;
};

export default function BannerSlider({ items }: { items: Banner[] }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (n: number) => setIdx((p) => (p + n + items.length) % items.length);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-200">
      {/* 배너 높이(요청대로 축소) */}
      <div className="relative h-[320px] md:h-[420px]">
        {/* 슬라이드 레이어: 절대 배치 + opacity 크로스페이드 */}
        {items.map((b, i) => (
          <Slide key={b.id} banner={b} active={i === idx} />
        ))}
      </div>

      {/* 좌/우 화살표 */}
      <button
        onClick={() => go(-1)}
        className="nav-arrow absolute left-3 top-1/2 -translate-y-1/2 z-20"
        aria-label="이전 배너"
      >
        ‹
      </button>
      <button
        onClick={() => go(1)}
        className="nav-arrow absolute right-3 top-1/2 -translate-y-1/2 z-20"
        aria-label="다음 배너"
      >
        ›
      </button>

      {/* 도트 */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-rose-500" : "w-2 bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** 개별 슬라이드(겹쳐놓고 opacity로 전환) */
function Slide({ banner, active }: { banner: Banner; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ease-out ${
        active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
    >
      {/* 중앙 정렬 래퍼 */}
      <div className="flex h-full w-full items-center justify-center px-6 md:px-10">
        {/* 한 화면 중앙에 좌/우 배치, 살짝 오른쪽으로 이동 */}
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:translate-x-20">
          {/* 왼쪽 이미지: 자연 크기 + 투명 배경, 최대 높이만 제한 */}
          {/* 왼쪽 이미지: 박스 안에서 항상 가운데 정렬 */}
          <div className="mx-auto md:mx-0 flex items-center justify-center">
            {banner.thumb ? (
              <img
                src={banner.thumb}
                alt={banner.title}
                className="max-h-[220px] md:max-h-[300px] w-auto object-contain"
                decoding="async"
                loading="eager"
              />
            ) : (
              <div className="grid h-[220px] md:h-[300px] place-items-center text-sm text-neutral-500">
                이미지 없음
              </div>
            )}
          </div>


          {/* 오른쪽 텍스트 */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-rose-700">
              오늘의 라이브 특가 🍉
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p style={{ marginLeft: '2px' }} className="mt-2 text-sm md:text-base text-neutral-700">
                {banner.subtitle}
              </p>
            )}
            {banner.cta && (
              <button className="btn btn-violet mt-4">{banner.cta}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}