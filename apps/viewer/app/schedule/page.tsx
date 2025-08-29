import { daysStrip, categories } from "@/components/data";
import ScheduleClient from "@/components/design/ScheduleClient";

export default function SchedulePage() {
  return (
    <>
      {/* 날짜 스트립: 중앙 정렬 + 언더라인 칩 */}
      <div className="mt-3 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 pb-2">
        <div className="flex gap-2 justify-center md:justify-center">
          {daysStrip.map((d, i) => (
            <button
              key={d.key}
              className={`chip-tab ${i === 2 ? "chip-tab-active" : ""} shrink-0 flex flex-col items-center px-3 py-2`}
            >
              <span className="text-[11px] opacity-70">{d.label}</span>
              <span className="font-semibold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      <ScheduleClient categories={categories} />
    </>
  );
}
