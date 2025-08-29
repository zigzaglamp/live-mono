"use client";

import { useState } from "react";
import { KRW } from "@/components/data";
import type { Category } from "../types";

interface Props {
  categories: Category[];
}

/** LIVE 스타일 느낌의 알림 배지 */
function AlarmBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-2.5 text-[11px] font-semibold text-white shadow">
      {children}
    </span>
  );
}

/** 내활동 버튼 톤의 소프트 배지 (상점명 등) */
function SoftBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-white border border-neutral-300 px-2.5 text-[11px] font-medium text-neutral-800 shadow-sm">
      {children}
    </span>
  );
}

/** 시간 배지 (모바일/데스크톱 공통) */
function TimeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-neutral-100 border border-neutral-300 px-2.5 text-[11px] font-semibold text-neutral-800">
      {children}
    </span>
  );
}

export default function ScheduleClient({ categories }: Props) {
  const [cat, setCat] = useState<string>("all");

  return (
    <>
      {/* 카테고리 칩 (홈과 동일 스타일) */}
      <div className="-mx-4 overflow-x-auto px-4 py-3 md:mx-0 md:px-0 md:py-4">
        <div className="flex gap-2 md:justify-center">
          {categories.map((c) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`chip-tab ${active ? "chip-tab-active" : ""} shrink-0`}
              >
                {c.emoji} {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 아이템 리스트 */}
      <div className="mt-4 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => {
          const mm = (i * 10) % 60;
          const timeStr = `20:${mm === 0 ? "00" : mm}`;

          return (
            <div key={i} className="flex gap-3 border-b pb-6">
              {/* 썸네일 */}
              <div className="w-28 md:w-36 aspect-[3/4] rounded-xl bg-neutral-200 shrink-0" />

              {/* 우측 컨텐츠 */}
              <div className="min-w-0 flex-1">
                {/* 헤더 배지 라인: 시간 · 알림 · 상점명 (모바일/데스크톱 공통) */}
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <AlarmBadge>알림 5천명</AlarmBadge>
                  <TimeBadge>{timeStr}</TimeBadge>
                </div>

                <h4 className="font-semibold leading-snug line-clamp-2">
                  [블루밍데이즈] 극세사 썸머, 웰컴 휴일집 꾸미기
                </h4>

                <div className="mt-1 text-sm text-neutral-500">
                  최대 {15 + ((i % 5) * 3)}% 할인 · 도착보장
                </div>

                <div className="mt-2 font-bold text-rose-600">
                  {KRW(22900 + i * 1000)}
                </div>
              </div>

              {/* CTA 버튼: 소형으로 변경 */}
              <div className="self-start">
                <button className="btn btn-violet btn-sm">알림 받기</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
