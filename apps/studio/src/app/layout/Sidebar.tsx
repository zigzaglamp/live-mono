// src/app/layout/Sidebar.tsx

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Package, ShoppingCart, Wallet, MessageSquare, Radio, Settings
} from "lucide-react";

function SideLink({ to, label, badge, Icon }: { to: string; label: string; badge?: string; Icon?: React.ComponentType<{ size?: number, className?: string }>; }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `group flex w-full items-center justify-between px-4 py-2 text-left text-[13px] ${isActive ? "bg-slate-600 text-white" : "text-slate-100 hover:bg-slate-600"
                }`
            }
        >
            <span className="truncate flex items-center gap-2">
                {Icon && <Icon size={16} className="opacity-90" />}
                {label}
            </span>
            {badge && (
                <span className="rounded-sm bg-emerald-400/20 px-1.5 py-0.5 text-[10px] text-emerald-200">{badge}</span>
            )}
        </NavLink>
    );
}


function SidebarSection({ title, children, defaultOpen = false }: { title: string; children?: React.ReactNode; defaultOpen?: boolean; }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-t border-slate-600/60">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] font-medium text-slate-100 hover:bg-slate-600"
            >
                <span>{title}</span>
                <span className="text-xs text-slate-300">{open ? "▲" : "▼"}</span>
            </button>
            {open && children}
        </div>
    );
}


export default function Sidebar() {
    return (
        <aside className="w-[260px] shrink-0 min-h-[calc(100vh-49px)] border-r border-slate-800 bg-slate-700">
            {/* Name card */}
            <div className="border-b border-slate-600/60 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-500" />
                    <div>
                        <div className="text-sm font-semibold text-slate-50">ZeroCycle</div>
                        <div className="text-xs text-slate-300">판매자 등급: 씨앗</div>
                    </div>
                </div>
                {/* Quick search */}
                <div className="mt-4 space-y-2">
                    <select className="w-full border border-slate-500 bg-slate-600 px-2 py-1 text-sm text-slate-100">
                        <option>수취인명</option>
                        <option>구매자명</option>
                        <option>주문번호</option>
                        <option>상품주문번호</option>
                    </select>
                    <input
                        className="w-full border border-slate-500 bg-slate-600 px-2 py-1 text-sm text-slate-100 placeholder:text-slate-300"
                        placeholder="입력 후 검색하세요."
                    />
                    <div className="mt-2 flex justify-between">
                        <button
                            className="w-[calc(50%-0.5rem)] px-3 py-1 border border-slate-400 bg-slate-600 text-white hover:bg-slate-500 text-sm"
                        >
                            검색
                        </button>
                        <button
                            className="w-[calc(50%-0.5rem)] px-3 py-1 border border-slate-400 bg-slate-600 text-white hover:bg-slate-500 text-sm"
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </div>


            {/* Accordion sections (default closed) */}
            <nav className="pb-4">
                <SidebarSection title="상품관리">
                    <div className="bg-slate-700/60 py-2">
                        <div className="px-4 pb-1 text-[12px] font-semibold text-slate-200/80">그룹상품 관리</div>
                        <div className="pl-6">
                            <SideLink to="/products" label="그룹상품 소개" badge="N" Icon={Package} />
                            <SideLink to="/products" label="그룹상품 등록" badge="N" Icon={Package} />
                            <SideLink to="/products" label="그룹상품 조회/수정" badge="N" Icon={Package} />
                            <SideLink to="/products" label="그룹상품 리뷰이동" badge="N" Icon={Package} />
                        </div>
                        <div className="mt-2 px-4 pb-1 text-[12px] font-semibold text-slate-200/80">상품 관리</div>
                        <div className="pl-6">
                            <SideLink to="/products" label="상품 조회/수정" Icon={Package} />
                            <SideLink to="/products" label="상품 등록" Icon={Package} />
                            <SideLink to="/products" label="상품 일괄등록" Icon={Package} />
                        </div>
                    </div>
                </SidebarSection>
                <SidebarSection title="주문/배송">
                    <div className="bg-slate-700/60 py-2">
                        <div className="px-4 pb-1 text-[12px] font-semibold text-slate-200/80">주문 관리</div>
                        <div className="pl-6">
                            <SideLink to="/orders" label="주문 목록" Icon={ShoppingCart} />
                            <SideLink to="/orders" label="배송 관리" Icon={ShoppingCart} />
                        </div>
                    </div>
                </SidebarSection>
                <SidebarSection title="정산관리">
                    <div className="pl-6">
                        <SideLink to="/products" label="정산 내역" Icon={Wallet} />
                        <SideLink to="/products" label="비즈월렛" Icon={Wallet} />
                    </div>
                </SidebarSection>

                <SidebarSection title="문의/리뷰">
                    <div className="pl-6">
                        <SideLink to="/products" label="상품 Q&A" Icon={MessageSquare} />
                        <SideLink to="/products" label="고객 문의" Icon={MessageSquare} />
                    </div>
                </SidebarSection>

                <SidebarSection title="라이브 방송">
                    <div className="pl-6">
                        <SideLink to="/products" label="방송 대시보드" Icon={Radio} />
                        <SideLink to="/products" label="라이브 예약" Icon={Radio} />
                    </div>
                </SidebarSection>

                <SidebarSection title="설정">
                    <div className="pl-6">
                        <SideLink to="/products" label="기본 설정" Icon={Settings} />
                    </div>
                </SidebarSection>
            </nav>
        </aside>
    );
}