// src/pages/DevInProgress.tsx
import { Hammer, Wrench, Loader2 } from "lucide-react";

export default function DevInProgress() {
    return (
        <div className="min-h-[60vh] rounded-lg border border-slate-200 bg-white p-8">
            {/* 헤더 */}
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                    <Loader2 className="animate-spin" size={18} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">페이지 제작 중</h2>
                    <p className="text-sm text-slate-500">
                        현재 이 화면은 구현 작업이 진행 중입니다. 잠시 후 더 나은 모습으로 찾아뵙겠습니다.
                    </p>
                </div>
            </div>

            {/* 진행도 바 + 반짝 효과 */}
            <div className="relative mb-10 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/3 rounded-full bg-slate-300 animate-pulse" />
                <div className="shimmer absolute inset-0" />
            </div>

            {/* 스켈레톤 UI */}
            <div className="grid grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-xl border border-slate-200 p-5">
                        <div className="mb-4 h-40 w-full rounded-lg bg-slate-100 animate-pulse" />
                        <div className="mb-2 h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
                        <div className="mb-2 h-4 w-2/3 rounded bg-slate-100 animate-pulse" />
                        <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
                    </div>
                ))}
            </div>

            {/* 푸터 액션 */}
            <div className="mt-10 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2 text-slate-600">
                    <Hammer size={16} />
                    <span className="text-sm">레이아웃/컴포넌트 조립 중…</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Wrench size={16} />
                    <span className="text-sm">API 연동 준비</span>
                </div>
            </div>

            {/* 로컬 CSS (Vite에서도 정상 동작) */}
            <style>{`
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
          transform: translateX(-100%);
          animation: shimmerMove 1.6s infinite;
        }
      `}</style>
        </div>
    );
}
