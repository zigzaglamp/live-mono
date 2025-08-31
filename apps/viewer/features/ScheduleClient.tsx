// apps/viewer/features/ScheduleClient.tsx

"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import { iconMap } from "@components/iconMap";
import { KRW } from "@components/data";
import { AlarmBadge, TimeBadge } from "@components/uiUtile";
import type { daysStrip, categories } from "@components/types";

interface Props {
  daysStrip: daysStrip[];
  categories: categories[];
}

export default function ScheduleClient({ daysStrip, categories }: Props) {
  const [active, setActive] = useState<string>("all");
  const filtered = useMemo(() => {
    if (active === "all") return "";
    const name = categories.find((c) => c.id === active)?.name;
    // return "".filter((p) => p.category === name);
  }, [active, categories]);
  return (
    <>
      <div className="mt-3 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 pb-2">
        <div className="flex gap-2 justify-center md:justify-center">
          {daysStrip.map((d, i) => (
            <button
              key={d.id}
              className={`chip-tab ${i === 2 ? "chip-tab-active" : ""} shrink-0 flex flex-col items-center px-3 py-2`}
            >
              <span className="text-[11px] opacity-70">{d.label}</span>
              <span className="font-semibold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>
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
      <div className="mt-4 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => {
          const mm = (i * 10) % 60;
          const timeStr = `20:${mm === 0 ? "00" : mm}`;
          return (
            <div key={i} className="flex gap-3 border-b pb-6">
              <div className="w-28 md:w-36 aspect-[3/4] rounded-xl bg-neutral-200 shrink-0">
                <Image
                  src="/testImages/1.png"
                  alt=""
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
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
