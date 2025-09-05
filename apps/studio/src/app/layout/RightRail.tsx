// src/app/layout/RightRail.tsx

import { Bell, HelpCircle, Play } from "lucide-react";

export default function RightRail() {
    return (
        <aside className="w-[150px] shrink-0 min-h-[calc(100vh-49px)] border-l border-gray-200 bg-gray-50 p-3">
            <div className="flex flex-col gap-2">
                {/* 필요하면 토글 유지 */}
                <button className="border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm hover:bg-gray-50">
                    <Bell className="inline-block mr-2" size={16} />알림
                </button>
                <button className="border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm hover:bg-gray-50">
                    <HelpCircle className="inline-block mr-2" size={16} />도움말
                </button>
                <button className="bg-gray-900 px-3 py-2 text-xs text-white shadow-sm hover:bg-black">
                    <Play className="inline-block mr-2" size={16} />방송 시작
                </button>
            </div>
        </aside>
    );
}