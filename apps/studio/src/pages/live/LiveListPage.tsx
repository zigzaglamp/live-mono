// src/pages/live/LiveListPage.tsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RefreshCw, ChevronDown } from "lucide-react";

type Status = "scheduled" | "live" | "ended";
export type Broadcast = {
    broadcastId: string;
    title: string;
    status: Status;
    scheduledAt?: string;
    createdAt: string;
    updatedAt: string;
    channelArn?: string;
    streamId?: string;
    playbackUrl?: string;
};

const KEY = "live:broadcasts";
const loadBroadcasts = (): Broadcast[] => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const saveBroadcasts = (arr: Broadcast[]) => localStorage.setItem(KEY, JSON.stringify(arr));
const seedIfEmpty = () => {
    const cur = loadBroadcasts();
    if (cur.length) return;
    const now = new Date();
    const iso = (d: Date) => d.toISOString();
    const mk = (title: string, status: Status, offsetMin: number, scheduledAt?: string): Broadcast => ({
        broadcastId: crypto.randomUUID(),
        title, status, scheduledAt,
        createdAt: iso(new Date(now.getTime() - (offsetMin + 60) * 60000)),
        updatedAt: iso(new Date(now.getTime() - offsetMin * 60000)),
        channelArn: "arn:aws:ivs:ap-northeast-2:111111111111:channel/abc",
        playbackUrl: "https://example.m3u8",
    });
    saveBroadcasts([
        mk("9월 신상품 라이브", "live", 3, new Date(now.getTime() - 30 * 60000).toLocaleString()),
        mk("가을 패션 특집", "scheduled", 120, new Date(now.getTime() + 60 * 60000).toLocaleString()),
        mk("지난주 인기상품 총정리", "ended", 1440, new Date(now.getTime() - 7 * 24 * 60 * 60000).toLocaleString()),
    ]);
};

export default function LiveListPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Broadcast[]>([]);
    const [q, setQ] = useState("");
    const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
    const [page, setPage] = useState(1);
    const pageSize = 8;

    useEffect(() => { seedIfEmpty(); setItems(loadBroadcasts()); }, []);
    const reload = () => setItems(loadBroadcasts());

    const filtered = useMemo(() => {
        let arr = items.slice().sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));
        if (statusFilter !== "all") arr = arr.filter(x => x.status === statusFilter);
        if (q.trim()) arr = arr.filter(x => x.title.toLowerCase().includes(q.trim().toLowerCase()));
        return arr;
    }, [items, statusFilter, q]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
    useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

    const goHub = (id: string) => navigate(`/live/hub/${id}`);
    const makeNew = () => navigate("/live/start");
    const stopLive = (id: string) => {
        if (!confirm("이 방송을 종료할까요?")) return;
        const arr = loadBroadcasts();
        const idx = arr.findIndex(x => x.broadcastId === id);
        if (idx >= 0) {
            arr[idx] = { ...arr[idx], status: "ended", updatedAt: new Date().toISOString(), streamId: undefined };
            saveBroadcasts(arr);
            setItems(arr);
        }
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div>
                <h1 className="text-xl font-bold">방송 목록</h1>
                <p className="text-sm text-slate-500">진행/예약/종료 상태를 확인하고 연결할 수 있습니다.</p>
            </div>

            {/* 툴바: 상태셀렉트 + 검색 + 버튼들 */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                {/* 왼쪽: 상태 선택 + 검색 */}
                <div className="flex items-center gap-2">
                    {/* 상태 셀렉트 */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="h-9 w-20 appearance-none border border-gray-300 bg-white px-3 pr-8 text-sm text-slate-700"
                        >
                            <option value="all">전체</option>
                            <option value="live">진행</option>
                            <option value="scheduled">예약</option>
                            <option value="ended">종료</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                            <ChevronDown />
                        </span>
                    </div>
                    {/* 검색창 */}
                    <div className="flex h-9 items-center gap-2 border border-gray-300 bg-white px-3">
                        <Search size={16} className="text-slate-500" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="제목 검색"
                            className="h-full w-44 text-sm outline-none placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* 오른쪽: 새로고침 + 새 방송 */}
                <div className="flex items-center gap-2">
                    <button
                        className="h-9 border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50"
                        onClick={reload}
                    >
                        <RefreshCw size={16} className="inline-block mr-1" />
                        새로고침
                    </button>
                    <button
                        className="h-9 bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700"
                        onClick={makeNew}
                    >
                        + 새 방송 만들기
                    </button>
                </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-hidden border border-gray-300 bg-white">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 text-xs text-slate-500">
                        <tr>
                            <th className="w-[44%] px-4 py-2 text-left">제목</th>
                            <th className="w-[12%] px-4 py-2 text-left">상태</th>
                            <th className="w-[18%] px-4 py-2 text-left">방송 예정</th>
                            <th className="w-[14%] px-4 py-2 text-left">업데이트</th>
                            <th className="w-[12%] px-4 py-2 text-left">액션</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {pageData.length === 0 && (
                            <tr>
                                <td className="px-4 py-10 text-center text-slate-500" colSpan={5}>
                                    표시할 방송이 없습니다.
                                </td>
                            </tr>
                        )}
                        {pageData.map((b) => {
                            const isLive = b.status === "live";
                            return (
                                <tr key={b.broadcastId} className="hover:bg-gray-50">
                                    <td className="truncate px-4 py-3">
                                        <button
                                            className="max-w-full truncate text-left font-medium text-slate-900 hover:underline"
                                            title={b.title}
                                            onClick={() => goHub(b.broadcastId)}
                                        >
                                            {b.title}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3"><StatusChip status={b.status} /></td>
                                    <td className="px-4 py-3 text-slate-700">{b.scheduledAt || "-"}</td>
                                    <td className="px-4 py-3 text-slate-700">{formatRelative(b.updatedAt)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className={[
                                                    "border px-3 py-1 text-xs",
                                                    isLive
                                                        ? "border-gray-400 bg-white text-slate-800 hover:bg-gray-50"
                                                        : "border-gray-300 bg-slate-100 text-slate-400 cursor-not-allowed",
                                                ].join(" ")}
                                                onClick={() => isLive && goHub(b.broadcastId)}
                                                disabled={!isLive}
                                            >
                                                열기
                                            </button>
                                            <button
                                                className={[
                                                    "border px-3 py-1 text-xs",
                                                    isLive
                                                        ? "border-gray-400 bg-white text-rose-700 hover:bg-rose-50"
                                                        : "border-gray-300 bg-slate-100 text-slate-400 cursor-not-allowed",
                                                ].join(" ")}
                                                onClick={() => isLive && stopLive(b.broadcastId)}
                                                disabled={!isLive}
                                            >
                                                종료
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션: 중앙 밑줄 스타일 */}
            <div className="flex items-center justify-center gap-4 text-sm">
                <button
                    className="text-slate-700 hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                >
                    이전
                </button>
                <div className="flex items-center gap-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={[
                                "px-1",
                                p === page
                                    ? "border-b-2 border-emerald-600 font-semibold text-emerald-700"
                                    : "text-slate-700 hover:text-emerald-600 hover:underline",
                            ].join(" ")}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <button
                    className="text-slate-700 hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

function StatusChip({ status }: { status: Status }) {
    if (status === "live")
        return <span className="inline-flex items-center border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">진행</span>;
    if (status === "scheduled")
        return <span className="inline-flex items-center border border-sky-300 bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">예약</span>;
    return <span className="inline-flex items-center border border-rose-300 bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">종료</span>;
}

function formatRelative(iso: string) {
    if (!iso) return "-";
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "방금";
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const day = Math.floor(h / 24);
    return `${day}일 전`;
}
