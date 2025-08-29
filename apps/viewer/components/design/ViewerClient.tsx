// // apps/viewer/components/viewer/ViewerClient.tsx
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Badge, Section } from "../ui";
// import { LiveCard } from "./LiveCard";
// import { liveCards } from "../data";

// type Props = { liveId: string };

// export default function ViewerClient({ liveId }: Props) {
//   const [chatOpen, setChatOpen] = useState(false);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setChatOpen(false);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
//       {/* ===== 좌측: 플레이어 + 설명/액션 ===== */}
//       <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white md:col-span-8">
//         {/* ▶︎ 플레이어: 모바일은 9:16, md 이상은 16:9 */}
//         <div className="relative aspect-[9/16] bg-black md:aspect-video">
//           {/* 상단 좌측 LIVE/보조 칩 */}
//           <div className="absolute left-3 top-3 z-10 flex items-center gap-1">
//             <span className="pill-live">LIVE</span>
//           </div>

//           {/* 모바일: 좌하단 채팅 버튼 */}
//           <button
//             onClick={() => setChatOpen((v) => !v)}
//             className="absolute left-3 bottom-3 z-10 h-10 px-3 text-sm text-white backdrop-blur-sm md:hidden rounded-full bg-black/60"
//             aria-label="채팅 열기"
//           >
//             💬 채팅
//           </button>

//           {/* 모바일: 영상 위 채팅 오버레이 */}
//           {chatOpen && (
//             <div className="absolute inset-0 z-20 flex flex-col justify-end bg-black/30 md:hidden">
//               <ChatOverlay onClose={() => setChatOpen(false)} />
//             </div>
//           )}
//         </div>

//         {/* 하단 컨트롤/설명 */}
//         <div className="space-y-3 p-4">
//           <div className="flex items-center justify-between gap-2">
//             <h1 className="line-clamp-1 text-lg font-bold">고운 수박 스페셜 라이브</h1>
//             <Link href="/" className="btn btn-soft">
//               홈으로
//             </Link>
//           </div>

//           {/* 액션 버튼: 우측 정렬 */}
//           <div className="flex items-center gap-2 justify-start">
//             <button className="chip-tab chip-tab-active">구매하기</button>
//             <button className="chip-tab chip-tab-active">장바구니</button>
//             <button className="chip-tab chip-tab-active">공유</button>
//           </div>

//           <div className="text-sm text-neutral-600">
//             방송 설명이 들어갑니다. (정적 문구 — hydration 이슈 방지를 위해 랜덤/날짜 미사용)
//           </div>

//           {/* 추천 라이브: 모바일에선 숨김, md 이상에서만 노출 */}
//           <div className="hidden md:block">
//             <Section title="추천 라이브">
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//                 {liveCards.slice(0, 4).map((item) => (
//                   <LiveCard key={item.id} item={item} />
//                 ))}
//               </div>
//             </Section>
//           </div>
//         </div>
//       </div>

//       {/* ===== 우측: 채팅 패널(데스크탑) ===== */}
//       <aside
//         className="sticky top-[72px] hidden max-h-[calc(100dvh-100px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white md:col-span-4 md:flex"
//       >
//         <ChatPanel />
//       </aside>
//     </div>
//   );
// }

// /* ---------------- 채팅 서브 컴포넌트 (데스크탑용) ---------------- */
// function ChatPanel() {
//   const [tab, setTab] = useState<"chat" | "info">("chat");

//   return (
//     <>
//       {/* 탭: 밑줄형 */}
//       <div className="flex gap-2 border-b border-neutral-200 p-3">
//         <button
//           onClick={() => setTab("chat")}
//           className={`chip-tab ${tab === "chat" ? "chip-tab-active" : ""}`}
//         >
//           채팅
//         </button>
//         <button
//           onClick={() => setTab("info")}
//           className={`chip-tab ${tab === "info" ? "chip-tab-active" : ""}`}
//         >
//           정보
//         </button>
//       </div>

//       {tab === "chat" ? (
//         <ChatBody className="flex-1 overflow-auto p-3" />
//       ) : (
//         <div className="flex-1 space-y-2 overflow-auto p-3 text-sm text-neutral-700">
//           <div>
//             <Badge>판매자</Badge> 고운 수박 공식 스토어
//           </div>
//           <div>
//             <Badge>배송</Badge> 당일 출고 (영업일 기준)
//           </div>
//           <div>
//             <Badge>교환/환불</Badge> 수령 7일 이내 가능
//           </div>
//         </div>
//       )}

//       <ChatInput />
//     </>
//   );
// }

// /* --------- 공통 채팅 리스트(데스크탑): 아이디 영역 고정, 구분선 없음 --------- */
// const MOCK = [
//   { name: "수박버", text: "🍉 수박 달콤해요!" },
//   { name: "여름최고", text: "할인 언제 시작해요?" },
//   {
//     name: "고박",
//     text: "잠시 후 특가 공개됩니다! 메시지가 길어져도 아이디 다음 고정 라인에서 시작합니다.",
//   },
//   {
//     name: "안40ef583405983450938450398540",
//     text: "eofjawepfoj235-902456ui-29agpjirkngprkvbinag0p9u4tp0qa8935153151353154t",
//   },
//   {
//     name: "안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
//     text: "안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
//   },
//   {
//     name: "awerfawefawefawef녕안녕안녕안녕안235235안안135135efeafawefawefawefawefawef",
//     text: "awerfawefawefawef녕안녕안녕안녕안235235안안135135efeafawefawefawefawefawefwefawefawef데래멎ㄷ레ㅐㅓ",
//   },  
// ];

// /* --------- 공통 채팅 리스트(데스크탑): 아이디 좌측 정렬 + 여백 강화 --------- */
// function ChatBody({ className = "" }: { className?: string }) {
//   return (
//     <div className={className}>
//       <ul className="space-y-2">
//         {MOCK.map((m, i) => (
//           <li key={i} className="flex items-start">
//             {/* 아이디: 고정 폭 + 한 줄 + 말줄임 + CJK 줄바꿈 방지 */}
//             <span
//               className="w-28 shrink-0 pr-5 text-left text-sm font-semibold text-neutral-800
//                          whitespace-nowrap overflow-hidden text-ellipsis break-keep"
//               title={m.name}
//             >
//               {m.name}
//             </span>

//             {/* 메시지: 시작점 고정 */}
//             <span className="flex-1 text-sm leading-snug text-neutral-900">
//               {m.text}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// /* ===== 모바일 채팅 오버레이 (그대로 사용하되 필요시 최신 ChatBodyMobile 반영) ===== */
// function ChatOverlay({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/30 md:hidden">
//       <div className="flex-1 overflow-auto p-3">
//         <ul className="space-y-2">
//           {MOCK.map((m, i) => (
//             <li key={i} className="flex items-start">
//               {/* 아이디: 고정 폭 + 한 줄 + 말줄임 + CJK 줄바꿈 방지 */}
//               <span
//                 className="w-28 shrink-0 pr-5 text-left text-sm font-semibold text-white
//                            whitespace-nowrap overflow-hidden text-ellipsis break-keep"
//                 title={m.name}
//               >
//                 {m.name}
//               </span>

//               {/* 메시지 */}
//               <span className="flex-1 text-sm leading-snug text-white">{m.text}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex items-center gap-2 bg-white p-2">
//         <input
//           className="h-10 flex-1 rounded-xl border border-neutral-200 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900/10"
//           placeholder="메시지를 입력하세요"
//         />
//         <button onClick={onClose} className="px-2 py-1 text-sm text-neutral-600" aria-label="채팅 닫기">
//           닫기
//         </button>
//       </div>
//     </div>
//   );
// }

// function ChatInput() {
//   return (
//     <div className="p-3">
//       <input
//         className="w-full h-10 rounded-xl border border-neutral-200 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900/10"
//         placeholder="메시지를 입력하세요"
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Section } from "../ui";
import { LiveCard } from "./LiveCard";
import { liveCards } from "../data";

type Props = { liveId: string };

/* 공통 액션 버튼 묶음 (가운데 정렬) */
function ActionButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button className="chip-tab-go chip-tab-active-go">구매하기</button>
      <button className="chip-tab-go chip-tab-active-go">장바구니</button>
      <button className="chip-tab-go chip-tab-active-go">공유</button>
    </div>
  );
}

export default function ViewerClient({ liveId }: Props) {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setChatOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* ===== 좌측: 플레이어 + 설명 ===== */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white md:col-span-8">
        {/* ▶︎ 플레이어 */}
        <div className="relative aspect-[9/16] bg-black md:aspect-video">
          <div className="absolute left-3 top-3 z-10">
            <span className="pill-live">LIVE</span>
          </div>
          <button
            onClick={() => setChatOpen((v) => !v)}
            className="absolute left-3 bottom-3 z-10 h-10 rounded-full bg-black/60 px-3 text-sm text-white backdrop-blur-sm md:hidden"
            aria-label="채팅 열기"
          >
            💬 채팅
          </button>
          {chatOpen && (
            <div className="absolute inset-0 z-20 flex flex-col justify-end bg-black/30 md:hidden">
              <ChatOverlay onClose={() => setChatOpen(false)} />
            </div>
          )}
        </div>

        {/* 하단 컨텐츠 */}
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="line-clamp-1 text-lg font-bold">고운 수박 스페셜 라이브</h1>
            <Link href="/" className="btn btn-soft">
              홈으로
            </Link>
          </div>

          {/* 방송 설명 */}
          <div className="text-sm text-neutral-600">
            방송 설명이 들어갑니다.ㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈ (정적 문구 — hydration 이슈 방지를 위해 랜덤/날짜 미사용)
          </div>

          {/* ✅ 모바일에서만 방송설명 밑에 표시 */}
          <div className="md:hidden">
            <ActionButtons className="mt-2" />
          </div>

          {/* 추천 라이브 */}
          <div className="hidden md:block">
            <Section title="추천 라이브">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {liveCards.slice(0, 4).map((item) => (
                  <LiveCard key={item.id} item={item} />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* ===== 우측: 채팅 패널 (데스크톱) ===== */}
      <aside
        className="sticky top-[72px] hidden max-h-[calc(100dvh-100px)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white md:col-span-4 md:flex"
      >
        <div className="border-b border-neutral-200 p-3">
          <ActionButtons />
        </div>
        <ChatPanel />
      </aside>
    </div>
  );
}

/* ---------------- 채팅 서브 컴포넌트 ---------------- */
function ChatPanel() {
  const [tab, setTab] = useState<"chat" | "info">("chat");

  return (
    <>
      <div className="flex gap-2 border-b border-neutral-200 p-3">
        <button
          onClick={() => setTab("chat")}
          className={`chip-tab ${tab === "chat" ? "chip-tab-go chip-tab-active-go" : ""}`}
        >
          채팅
        </button>
        <button
          onClick={() => setTab("info")}
          className={`chip-tab ${tab === "info" ? "chip-tab-go chip-tab-active-go" : ""}`}
        >
          정보
        </button>
      </div>

      {tab === "chat" ? (
        <ChatBody className="flex-1 overflow-auto p-3" />
      ) : (
        <div className="flex-1 space-y-2 overflow-auto p-3 text-sm text-neutral-700">
          <div>
            <Badge>판매자</Badge> 고운 수박 공식 스토어
          </div>
          <div>
            <Badge>배송</Badge> 당일 출고 (영업일 기준)
          </div>
          <div>
            <Badge>교환/환불</Badge> 수령 7일 이내 가능
          </div>
        </div>
      )}

      <ChatInput />
    </>
  );
}

/* ---------------- 채팅 메시지 ---------------- */
const MOCK = [
  { name: "수박버", text: "🍉 수박 달콤해요!" },
  { name: "여름최고", text: "할인 언제 시작해요?" },
  { name: "고박", text: "잠시 후 특가 공개됩니다!" },
];

function ChatBody({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="space-y-2">
        {MOCK.map((m, i) => (
          <li key={i} className="flex items-start">
            <span className="w-28 shrink-0 pr-5 text-left text-sm font-semibold text-neutral-800 truncate">
              {m.name}
            </span>
            <span className="flex-1 text-sm leading-snug text-neutral-900">{m.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/30 md:hidden">
      <div className="flex-1 overflow-auto p-3">
        <ul className="space-y-2">
          {MOCK.map((m, i) => (
            <li key={i} className="flex items-start">
              <span className="w-28 shrink-0 pr-5 text-left text-sm font-semibold text-white truncate">
                {m.name}
              </span>
              <span className="flex-1 text-sm leading-snug text-white">{m.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2 bg-white p-2">
        <input
          className="h-10 flex-1 rounded-xl border border-neutral-200 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900/10"
          placeholder="메시지를 입력하세요"
        />
        <button onClick={onClose} className="px-2 py-1 text-sm text-neutral-600">
          닫기
        </button>
      </div>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="p-3">
      <input
        className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-900/10"
        placeholder="메시지를 입력하세요"
      />
    </div>
  );
}
