// src/components/StepGauge.tsx
import { useEffect, useState } from "react";

type Step = { label: string };

type Props = {
    steps: Step[];
    /** 1..steps.length */
    current: number;
    /** 라벨이 밖으로 튀지 않도록 좌/우 여백(px) */
    sideGutter?: number;   // default 64
    /** 라벨을 게이지 위로 띄우는 거리(px) */
    labelOffset?: number;  // default 56
};

export default function StepGauge({
    steps,
    current
}: Props) {
    const total = Math.max(1, steps.length);
    const safeCurrent = Math.min(Math.max(current, 1), total);
    // 목표 진행도 (0 ~ 1)
    const target = total > 1 ? (safeCurrent - 1) / (total - 1) : 1;

    // ▶ 초기 마운트 시에도 0 → target 으로 애니메이션
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        // 첫 렌더 후 비동기 적용하여 트랜지션 트리거
        const id = requestAnimationFrame(() => setProgress(target));
        return () => cancelAnimationFrame(id);
    }, [target]);

    return (
        <div className="relative w-full mb-0">
            {/* 트랙 (내부 여백을 margin으로 처리) */}
            <div
                className="relative h-3 bg-slate-200/70"
            >
                {/* 진행 바 (width 트랜지션) */}
                <div
                    className="absolute left-0 top-0 h-3 
                     bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500
                     transition-[width] duration-500 ease-out"
                    style={{ width: `${progress * 100}%` }}
                />

                {/* Shimmer 오버레이 */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="h-full w-[100%] translate-x-[-100%] bg-white/20 blur-[2px]
                       animate-[shine_3.0s_ease-in-out_infinite]"
                    />
                </div>
            </div>
        </div>
    );
}
