// apps/viewer/components/design/BannerMobileRail.tsx
// "use client";

// import * as React from "react";
// import Image from "next/image";
// import type { BannerItem } from "./BannerNaverSlider";

// type Props = {
//   items: BannerItem[];
//   defaultIndex?: number;
//   onSelectChange?: (i: number, item: BannerItem) => void;
// };

// export default function BannerMobileRail({
//   items,
//   defaultIndex = 0,
//   onSelectChange,
// }: Props) {
//   const [active, setActive] = React.useState(defaultIndex);
//   const cur = items[active];

//   // 좌측 메인 썸네일 높이를 재서 오른쪽 레일 높이에 맞춤
//   const leftWrapRef = React.useRef<HTMLDivElement>(null);
//   const [railH, setRailH] = React.useState<number>(0);

//   React.useEffect(() => {
//     const el = leftWrapRef.current;
//     if (!el) return;

//     const update = () => setRailH(el.offsetHeight);
//     update();

//     const onWin = () => update();
//     window.addEventListener("resize", onWin);

//     let ro: ResizeObserver | undefined;
//     const RO = typeof window !== "undefined" ? (window as any).ResizeObserver : undefined;

//     if (RO) {
//         ro = new RO((entries: ResizeObserverEntry[]) => {
//         for (const entry of entries) {
//             if (entry.target === el) {
//             update();
//             break;
//             }
//         }
//         });
//         ro?.observe(el); // 여기서 이제 에러 안 남
//     }

//     return () => {
//         window.removeEventListener("resize", onWin);
//         ro?.disconnect();
//     };
//   }, []);



//   const onPick = (i: number) => {
//     setActive(i);
//     onSelectChange?.(i, items[i]);
//   };

//   return (
//     <section className="px-4 py-3">
//       <div className="flex gap-3">
//         {/* LEFT: 메인 썸네일 + 하단 정보 */}
//         <div className="w-[65%] shrink-0">
//           {/* 이미지 감싸는 래퍼(이 높이에 레일을 맞춘다) */}
//           <div ref={leftWrapRef} className="relative">
//             <div className="relative overflow-hidden rounded-xl bg-neutral-100">
//               <Image
//                 src={cur.thumb}
//                 alt={cur.channel}
//                 width={480}
//                 height={620}
//                 className="h-64 w-full object-cover"
//                 priority
//               />

//               {/* 상단 방송 시간 : 가운데 정렬 */}
//               <span
//                 className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-0.5 text-[11px] font-medium text-white"
//                 style={{ whiteSpace: "nowrap" }}
//               >
//                 {cur.timeLabel}
//               </span>

//               {/* 하단 채널 : 가운데 정렬 */}
//               <div className="absolute inset-x-2 bottom-2 flex justify-center">
//                 <span className="rounded bg-black/45 px-3 py-1 text-xs font-semibold text-white">
//                   {cur.channel}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* 이미지 밖 하단 : 기다리는중(왼쪽) / 알림(오른쪽) */}
//           {/* <div className="mt-2 flex items-center justify-between">
//             {cur.watchers ? (
//               <span className="text-[12px] text-neutral-600">{cur.watchers}</span>
//             ) : (
//               <span />
//             )}
//             <button
//               className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 text-white shadow"
//               aria-label="알림받기"
//             >
//               🔔
//             </button>
//           </div> */}
//           {/* 이미지 바깥 하단 - 기다리는중(1줄) + 알림버튼(1줄) */}
//           <div className="mt-3 flex flex-col items-center gap-2">
//             {/* 기다리는중 */}
//             {cur.watchers ?(
//                 <div className="text-[10px] inline-flex items-center gap-1 text-sm font-semibold text-rose-500">
//                 {cur.watchers}
//                 </div>
//             ) : (
//                 <div />
//             )}

//             {/* 알림버튼 */}
//             <button className="chip-tab-go-go chip-tab-active-go">
//                 알림받기
//             </button>
//           </div>          
//         </div>

//         {/* RIGHT: 다른 방송 썸네일 레일(자체 스크롤) */}
//         <div
//           className="w-[35%] overflow-y-auto rounded-xl"
//           style={{
//             height: railH ? `${railH}px` : undefined,
//             // 선택사항: 스크롤바 노출 최소화
//             ['scrollbarWidth' as any]: 'thin', // ← 타입 회피(한 줄)
//           }}
//         >
//           <div className="flex flex-col gap-2">
//             {items.map((it, i) => {
//               const isActive = i === active;
//               return (
//                 <button
//                   key={it.id}
//                   onClick={() => onPick(i)}
//                   className={`relative overflow-hidden rounded-lg border transition ${
//                     isActive
//                       ? "border-violet-500 ring-2 ring-violet-300"
//                       : "border-neutral-200 hover:border-neutral-300"
//                   }`}
//                 >
//                   <Image
//                     src={it.thumb}
//                     alt={it.channel}
//                     width={160}
//                     height={100}
//                     className="h-20 w-full object-cover"
//                   />
//                   <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
//                     {it.timeLabel}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// apps/viewer/components/design/BannerMobileRail.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { BannerItem } from "./BannerNaverSlider"; // ← 공용 타입 사용

type Props = {
  items: BannerItem[];
  defaultIndex?: number;
  onSelectChange?: (i: number, item: BannerItem) => void;
};

export default function BannerMobileRail({
  items,
  defaultIndex = 0,
  onSelectChange,
}: Props) {
  const [active, setActive] = React.useState(defaultIndex);
  const cur = items[active];

  // 좌측 메인 썸네일 높이를 재서 오른쪽 레일 높이에 맞춤
  const leftWrapRef = React.useRef<HTMLDivElement>(null);
  const [railH, setRailH] = React.useState<number>(0);

  React.useEffect(() => {
    const el = leftWrapRef.current;
    if (!el) return;

    const update = () => setRailH(el.offsetHeight);
    update();

    const onWin = () => update();
    window.addEventListener("resize", onWin);

    let ro: ResizeObserver | undefined;
    const RO = typeof window !== "undefined" ? (window as any).ResizeObserver : undefined;

    if (RO) {
      ro = new RO((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.target === el) {
            update();
            break;
          }
        }
      });
      ro?.observe(el);
    }

    return () => {
      window.removeEventListener("resize", onWin);
      ro?.disconnect();
    };
  }, []);

  const onPick = (i: number) => {
    setActive(i);
    onSelectChange?.(i, items[i]);
  };

  return (
    <section className="px-4 py-3">
      <div className="flex gap-3">
        {/* LEFT: 메인 썸네일 + 하단 정보 */}
        <div className="w-[65%] shrink-0">
          {/* 이미지 감싸는 래퍼(이 높이에 레일을 맞춘다) */}
          <div ref={leftWrapRef} className="relative">
            <div className="relative overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={cur.thumb}
                alt={cur.channel}
                width={480}
                height={620}
                className="h-64 w-full object-cover"
                priority
              />

              {/* 상단 배지: LIVE / 예정시간 */}
                {cur.status === "live" ? (
                <span className="pill-live absolute left-1/2 top-2 -translate-x-1/2">
                    LIVE
                </span>
                ) : (
                <span
                    className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-0.5 text-[11px] font-medium text-white"
                    style={{ whiteSpace: "nowrap" }}
                >
                    {cur.timeLabel}
                </span>
              )}


              {/* 하단 채널 : 가운데 정렬 */}
              <div className="absolute inset-x-2 bottom-2 flex justify-center">
                <span className="rounded bg-black/45 px-3 py-1 text-xs font-semibold text-white">
                  {cur.channel}
                </span>
              </div>
            </div>
          </div>

          {/* 이미지 바깥 하단 - 시청/대기 + 버튼 */}
          <div className="mt-3 flex flex-col items-center gap-2">
            {/* 시청/대기 문구는 데이터로 제어 */}
            {cur.watchers ? (
              <div className="text-[10px] inline-flex items-center gap-1 text-sm font-semibold text-rose-500">
                {cur.watchers}
              </div>
            ) : (
              <div />
            )}

            {/* 버튼 전환 */}
            {cur.status === "live" ? (
              <Link href={`/live/${cur.id}`} className="chip-tab-go-go chip-tab-active-go">
                입장하기
              </Link>
            ) : (
              <button className="chip-tab-go-go chip-tab-active-go">알림받기</button>
            )}
          </div>
        </div>

        {/* RIGHT: 다른 방송 썸네일 레일(자체 스크롤) */}
        <div
          className="w-[35%] overflow-y-auto rounded-xl"
          style={{
            height: railH ? `${railH}px` : undefined,
            ["scrollbarWidth" as any]: "thin", // ← TS 속성 회피 (필요 시 제거 가능)
          }}
        >
          <div className="flex flex-col gap-2">
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.id}
                  onClick={() => onPick(i)}
                  className={`relative overflow-hidden rounded-lg border transition ${
                    isActive
                      ? "border-violet-500 ring-2 ring-violet-300"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <Image
                    src={it.thumb}
                    alt={it.channel}
                    width={160}
                    height={100}
                    className="h-20 w-full object-cover"
                  />
                  <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                    {it.timeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



