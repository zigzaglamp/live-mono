// apps/viewer/components/design/BannerNaverSlider.tsx
// "use client";

// import * as React from "react";
// import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// export type BannerItem = {
//   id: string;
//   timeLabel: string;           // 예: "내일 오후 7시"
//   title: string;               // 메인 타이틀
//   watchers?: string;           // "40.2만명이 기다리는 중"
//   channel: string;             // FD1OR 등
//   thumb: string;               // 왼쪽 메인 이미지
//   goods: { id: string; img: string; price?: string; sale?: string }[]; // 오른쪽 미니 카드 3~4개
//   cta?: string;                // "알림받기"
// };

// type Props = {
//   items: BannerItem[];
//   interval?: number;           // 자동 슬라이드 ms
// };

// export default function BannerNaverSlider({ items, interval = 5000 }: Props) {
//   const autoplay = React.useRef(
//     Autoplay({ delay: interval, stopOnInteraction: false })
//   );

//   const [emblaRef, embla] = useEmblaCarousel(
//     {
//       loop: true,
//       align: "center",
//       skipSnaps: false,
//       inViewThreshold: 0.5,
//       dragFree: false,
//     },
//     [autoplay.current]
//   );

//   const [index, setIndex] = React.useState(0);
//   const [count, setCount] = React.useState(items.length);

//   React.useEffect(() => {
//     if (!embla) return;
//     const onSelect = () => setIndex(embla.selectedScrollSnap());
//     embla.on("select", onSelect);
//     setCount(embla.scrollSnapList().length);
//     return () => {
//       embla.off("select", onSelect);
//     };
//   }, [embla]);

//   const scrollTo = (i: number) => embla?.scrollTo(i);
//   const prev = () => embla?.scrollPrev();
//   const next = () => embla?.scrollNext();

//   return (
//     <div className="relative">
//       <div ref={emblaRef} className="overflow-hidden">
//         <div className="flex">
//           {items.map((b) => (
//             <div key={b.id} className="min-w-0 flex-[0_0_100%]">
//               <div className="flex w-full justify-center py-6 md:py-8">
//                 {/* 중앙 카드 */}
//                 <article className="w-[min(1120px,92vw)] rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm p-4 md:p-6">
//                   <div className="grid items-center gap-6 md:gap-10 md:grid-cols-[560px,1fr]">
//                     {/* LEFT: 메인 썸네일 */}
//                     <div className="relative">
//                       <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
//                         <Image
//                           src={b.thumb}
//                           alt={b.title}
//                           width={1120}
//                           height={840}
//                           className="h-[360px] w-full md:h-[520px] object-cover"
//                           priority
//                         />
//                         {/* 방송 시간 뱃지 */}
//                         <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
//                           {b.timeLabel}
//                         </span>

//                         {/* 하단: 방송 채널 (두 줄) */}
//                         <div className="absolute left-3 right-3 bottom-3">
//                           <div className="rounded-xl bg-black/45 px-4 py-2.5 text-white backdrop-blur-sm">
//                             <div className="text-[11px] opacity-80">방송 채널</div>
//                             <div className="mt-0.5 text-base md:text-lg font-bold tracking-wide">
//                               {b.channel}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* RIGHT: 텍스트 & 미니 카드 */}
//                     <div className="min-w-0">
//                       {/* 기다리는중 + 알림받기 (네이버 스타일) */}
//                       {(b.watchers || b.cta) && (
//                         <div className="flex items-center gap-2">
//                           {b.watchers && (
//                             <span className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-violet-300 hover:ring-violet-400">
//                               <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
//                               {b.watchers}
//                             </span>
//                           )}
//                           <button className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-violet-300 hover:ring-violet-400">
//                             🔔 {b.cta ?? "알림받기"}
//                           </button>
//                         </div>
//                       )}

//                       <h2 className="mt-3 text-2xl font-extrabold leading-tight md:text-4xl">
//                         {b.title}
//                       </h2>

//                       {/* 작은 상품 카드 목록 */}
//                       <div className="mt-6 flex gap-4">
//                         {b.goods.slice(0, 4).map((g) => (
//                           <div
//                             key={g.id}
//                             className="w-24 shrink-0 rounded-xl border border-neutral-200 p-2 shadow-sm"
//                           >
//                             <div className="overflow-hidden rounded-lg bg-neutral-50">
//                               <Image
//                                 src={g.img}
//                                 alt=""
//                                 width={160}
//                                 height={120}
//                                 className="h-16 w-full object-cover"
//                               />
//                             </div>
//                             {(g.sale || g.price) && (
//                               <div className="mt-1 text-[11px] leading-tight">
//                                 {g.sale && (
//                                   <span className="mr-1 font-bold text-rose-600">{g.sale}</span>
//                                 )}
//                                 {g.price && <span className="text-neutral-800">{g.price}</span>}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 화살표 */}
//       <button
//         onClick={prev}
//         className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 transition hover:bg-white"
//         aria-label="이전 배너"
//       >
//         <span className="block h-5 w-5 translate-x-[1px] text-neutral-700 group-hover:translate-x-0 transition">
//           ‹
//         </span>
//       </button>
//       <button
//         onClick={next}
//         className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 transition hover:bg-white"
//         aria-label="다음 배너"
//       >
//         <span className="block h-5 w-5 -translate-x-[1px] text-neutral-700 group-hover:translate-x-0 transition">
//           ›
//         </span>
//       </button>

//       {/* 도트 */}
//       <Dots count={count} current={index} onClick={scrollTo} />
//     </div>
//   );
// }

// function Dots({
//   count,
//   current,
//   onClick,
// }: {
//   count: number;
//   current: number;
//   onClick: (i: number) => void;
// }) {
//   return (
//     <div className="mt-4 flex justify-center gap-2">
//       {Array.from({ length: count }).map((_, i) => (
//         <button
//           key={i}
//           onClick={() => onClick(i)}
//           aria-label={`배너 ${i + 1}`}
//           className={`h-1.5 rounded-full transition-all ${
//             i === current ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }







//apps/viewer/components/design/BannerNaverSlider.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type BannerItem = {
  id: string;
  status: string; // ← 상태 추가
  timeLabel: string;            // 예: "내일 오후 7시"
  title: string;                // 메인 타이틀
  watchers?: string;            // "xx명이 시청중" or "xx만명이 기다리는 중" (데이터로 제어)
  channel: string;              // FD1OR 등
  thumb: string;                // 왼쪽 메인 이미지
  goods: { id: string; img: string; price?: string; sale?: string }[]; // 오른쪽 미니 카드 3~4개
  cta?: string;                 // "알림받기"
};

type Props = {
  items: BannerItem[];
  interval?: number;            // 자동 슬라이드 ms
};

export default function BannerNaverSlider({ items, interval = 5000 }: Props) {
  const autoplay = React.useRef(
    Autoplay({ delay: interval, stopOnInteraction: false })
  );

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      inViewThreshold: 0.5,
      dragFree: false,
    },
    [autoplay.current]
  );

  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(items.length);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    setCount(embla.scrollSnapList().length);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const scrollTo = (i: number) => embla?.scrollTo(i);
  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((b) => (
            <div key={b.id} className="min-w-0 flex-[0_0_100%]">
              <div className="flex w-full justify-center py-6 md:py-8">
                {/* 중앙 카드 */}
                <article className="w-[min(1120px,92vw)] rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm p-4 md:p-6">
                  <div className="grid items-center gap-6 md:gap-10 md:grid-cols-[560px,1fr]">
                    {/* LEFT: 메인 썸네일 */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
                        <Image
                          src={b.thumb}
                          alt={b.title}
                          width={1120}
                          height={840}
                          className="h-[360px] w-full md:h-[520px] object-cover"
                          priority
                        />

                        {/* 상단 배지: LIVE / 예정시간 */}
                        {b.status === "live" ? (
                          <span className="pill-live absolute left-3 top-3">LIVE</span>
                        ) : (
                          <span className="absolute left-3 top-3 rounded-full bgblack/70 px-3 py-1 text-xs text-white bg-black/70">
                            {b.timeLabel}
                          </span>
                        )}

                        {/* 하단: 방송 채널 (두 줄) */}
                        <div className="absolute left-3 right-3 bottom-3">
                          <div className="rounded-xl bg-black/45 px-4 py-2.5 text-white backdrop-blur-sm">
                            <div className="text-[11px] opacity-80">방송 채널</div>
                            <div className="mt-0.5 text-base md:text-lg font-bold tracking-wide">
                              {b.channel}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: 텍스트 & 미니 카드 */}
                    <div className="min-w-0">
                      {/* 시청/대기 + 버튼 (상태에 따라 전환) */}
                      {(b.watchers || b.cta) && (
                        <div className="flex items-center gap-2">
                          {b.watchers && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-violet-300 hover:ring-violet-400">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                              {b.watchers}
                            </span>
                          )}

                          {b.status === "live" ? (
                            <Link
                              href={`/live/${b.id}`}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-rose-300 hover:ring-rose-400"
                            >
                              🚪 입장하기
                            </Link>
                          ) : (
                            <button className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-violet-300 hover:ring-violet-400">
                              🔔 {b.cta ?? "알림받기"}
                            </button>
                          )}
                        </div>
                      )}

                      <h2 className="mt-3 text-2xl font-extrabold leading-tight md:text-4xl">
                        {b.title}
                      </h2>

                      {/* 작은 상품 카드 목록 */}
                      <div className="mt-6 flex gap-4">
                        {b.goods.slice(0, 4).map((g) => (
                          <div
                            key={g.id}
                            className="w-24 shrink-0 rounded-xl border border-neutral-200 p-2 shadow-sm"
                          >
                            <div className="overflow-hidden rounded-lg bg-neutral-50">
                              <Image
                                src={g.img}
                                alt=""
                                width={160}
                                height={120}
                                className="h-16 w-full object-cover"
                              />
                            </div>
                            {(g.sale || g.price) && (
                              <div className="mt-1 text-[11px] leading-tight">
                                {g.sale && (
                                  <span className="mr-1 font-bold text-rose-600">{g.sale}</span>
                                )}
                                {g.price && <span className="text-neutral-800">{g.price}</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 화살표 */}
      <button
        onClick={prev}
        className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 transition hover:bg-white"
        aria-label="이전 배너"
      >
        <span className="block h-5 w-5 translate-x-[1px] text-neutral-700 group-hover:translate-x-0 transition">
          ‹
        </span>
      </button>
      <button
        onClick={next}
        className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 transition hover:bg-white"
        aria-label="다음 배너"
      >
        <span className="block h-5 w-5 -translate-x-[1px] text-neutral-700 group-hover:translate-x-0 transition">
          ›
        </span>
      </button>

      {/* 도트 */}
      <Dots count={count} current={index} onClick={scrollTo} />
    </div>
  );
}

function Dots({
  count,
  current,
  onClick,
}: {
  count: number;
  current: number;
  onClick: (i: number) => void;
}) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          aria-label={`배너 ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}
