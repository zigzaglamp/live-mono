// src/pages/live/LiveOnAirHubPage.tsx

import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { MessageSquare, ShoppingBag, Ticket, MonitorPlay, PowerOff } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
    BarChart, Bar,
} from "recharts";

type Point = { t: string; viewers: number };
type OrderPoint = { t: string; orders: number; revenue: number };

export default function LiveOnAirHubPage() {
    const location = useLocation() as any;
    const navigate = useNavigate();
    const state = location.state || {};
    const title = state?.title || "방송 진행 중";

    const [range, setRange] = useState<"30m" | "2h" | "24h">("30m");

    // --- 더미 데이터 생성 ---
    const { viewerData, orderData } = useMemo(() => {
        const makeTimes = (n: number, stepMin: number) => {
            const arr: string[] = [];
            const now = new Date();
            for (let i = n - 1; i >= 0; i--) {
                const d = new Date(now.getTime() - i * stepMin * 60_000);
                const hh = d.getHours().toString().padStart(2, "0");
                const mm = d.getMinutes().toString().padStart(2, "0");
                arr.push(`${hh}:${mm}`);
            }
            return arr;
        };

        const cfg =
            range === "30m" ? { n: 30, step: 1 } :
                range === "2h" ? { n: 24, step: 5 } :
                    { n: 24, step: 60 };

        const times = makeTimes(cfg.n, cfg.step);

        // 시청자 수: 점진 증가 + 약간의 노이즈
        const viewerData: Point[] = times.map((t, i) => {
            const base = range === "24h" ? 200 : range === "2h" ? 120 : 60;
            const trend = Math.max(0, base + i * (range === "24h" ? 5 : range === "2h" ? 3 : 2));
            const noise = Math.round((Math.random() - 0.5) * (range === "24h" ? 40 : 20));
            return { t, viewers: Math.max(0, trend + noise) };
        });

        // 주문 수/매출: 피크 구간 생성
        const orderData: OrderPoint[] = times.map((t, i) => {
            const peakCenter = Math.floor(times.length * 0.6);
            const dist = Math.abs(i - peakCenter);
            const orders = Math.max(0, Math.round(20 - dist * (range === "24h" ? 0.6 : 1)));
            const revenue = orders * (range === "24h" ? 22000 : 18000) * (1 + Math.random() * 0.2);
            return { t, orders, revenue: Math.round(revenue) };
        });

        return { viewerData, orderData };
    }, [range]);

    const openCentered = (url: string, name: string, w: number, h: number) => {
        const left = window.screenX + (window.outerWidth - w) / 2;
        const top = window.screenY + (window.outerHeight - h) / 2;
        window.open(url, name, `popup=yes,width=${w},height=${h},left=${left},top=${top}`);
    };

    const endLive = () => {
        if (!confirm("정말 방송을 종료할까요?")) return;
        // TODO: 실제 종료 로직 연동 (상태 업데이트/서버 호출 등)
        alert("방송이 종료되었습니다. (퍼블리싱 단계)");
        // 예: navigate("/live/summary");
        navigate(-1);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-sm text-slate-500">시청자수/주문현황은 더미데이터 기반 예시입니다.</p>
                </div>
                {/* 범위 토글 */}
                <div className="flex items-center gap-1">
                    {(["30m", "2h", "24h"] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={[
                                "rounded-md border px-2 py-1 text-xs",
                                range === r
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                    : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50",
                            ].join(" ")}
                        >
                            {r === "30m" ? "최근 30분" : r === "2h" ? "최근 2시간" : "24시간"}
                        </button>
                    ))}
                </div>
            </div>

            {/* 그래프 2개 */}
            <div className="grid grid-cols-2 gap-5">
                {/* 시청자 수 */}
                <div className="rounded-lg border border-gray-300 bg-white p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">시청자 수</div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={viewerData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="t" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(v) => [`${v} 명`, "시청자"]} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Line type="monotone" dataKey="viewers" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">* 실제 연동 시 WebSocket/폴링으로 갱신</p>
                </div>

                {/* 주문 현황 */}
                <div className="rounded-lg border border-gray-300 bg-white p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">주문 현황</div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="t" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip
                                    formatter={(v, key) =>
                                        key === "orders" ? [`${v} 건`, "주문수"] : [`${Number(v).toLocaleString()}원`, "매출"]
                                    }
                                />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Bar dataKey="orders" barSize={14} />
                                <Bar dataKey="revenue" barSize={14} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">* 실데이터 연동 후 단위/축 형식 조정</p>
                </div>
            </div>

            {/* 팝업 도구들 */}
            <div className="rounded-lg border border-gray-300 bg-slate-50 p-4">
                <div className="mb-3 text-sm font-semibold text-slate-900">팝업 도구</div>
                <div className="flex flex-wrap gap-2">
                    <button
                        className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={() => openCentered("/onair/view", "onair_view", 1200, 700)}
                    >
                        <MonitorPlay size={16} /> 송출 화면 보기
                    </button>
                    <button
                        className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={() => openCentered("/onair/chat", "onair_chat", 420, 720)}
                    >
                        <MessageSquare size={16} /> 실시간 채팅
                    </button>
                    <button
                        className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={() => openCentered("/onair/products", "onair_products", 560, 720)}
                    >
                        <ShoppingBag size={16} /> 상품 노출 제어
                    </button>
                    <button
                        className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={() => openCentered("/onair/coupons", "onair_coupons", 420, 600)}
                    >
                        <Ticket size={16} /> 쿠폰 이벤트
                    </button>
                </div>
            </div>

            {/* 하단: 방송 종료 버튼 (우측 끝 정렬) */}
            <div className="mt-6 flex w-full justify-end">
                <button
                    type="button"
                    onClick={endLive}
                    className="inline-flex items-center gap-2 rounded bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                    <PowerOff size={16} />
                    방송 종료
                </button>
            </div>
        </div>
    );
}
