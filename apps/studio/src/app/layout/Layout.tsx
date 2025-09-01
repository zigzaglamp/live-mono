// src/app/layout/Layout.tsx

import { type PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightRail from "./RightRail";
import { useUIStore } from "../../store/ui";
import { useNoticeStore } from "../../store/notice";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Layout({ children }: PropsWithChildren) {
    const collapsed = useUIStore((s) => s.sidebarCollapsed);
    const toggleSidebar = useUIStore((s) => s.toggleSidebar);
    const notice = useNoticeStore((s) => s.notices[0]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            {/* 좌(260) - 본문(auto) - 우(220) */}
            <div className="flex">
                {!collapsed && <Sidebar />}

                {/* 본문: 패딩으로 좌측 라인 기준을 만든다 */}
                <main className="flex-1 min-w-0 p-5">
                    {/* 공지 + 토글을 같은 라인에 배치.
              좌측 정렬선은 본문 padding 기준이라 아래 카드들과 동일함 */}
                    <div className="mb-4 flex items-stretch gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            aria-label="사이드바 접기/펼치기"
                            title="사이드바 접기/펼치기"
                        >
                            {collapsed ? <MoveRight size={18} /> : <MoveLeft size={18} />}
                        </button>

                        <div className="flex w-full items-center justify-between border border-amber-200 bg-amber-50 px-4 text-sm text-amber-800">
                            <div className="py-2">
                                {notice ? <span className="whitespace-nowrap">{notice}</span> : <span>공지사항이 없습니다.</span>}
                            </div>
                            <button className="h-9 text-xs text-amber-700 hover:underline">공지 관리</button>
                        </div>
                    </div>

                    {children}
                </main>

                {/* 우측 고정 영역(좌측처럼 컬럼 확보) */}
                <RightRail />
            </div>
        </div>
    );
}
