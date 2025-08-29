"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENUS = [
  { href: "/", label: "홈" },
  { href: "/schedule", label: "방송일정" },
  { href: "/ranking", label: "랭킹" },
  { href: "/categories", label: "카테고리" },
];

export default function TopNav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-14 items-center gap-3">
          {/* 로고 */}
          <Link href="/" className="text-lg font-extrabold tracking-tight whitespace-nowrap">
            고운 수박 <span className="text-rose-600">LIVE</span>
          </Link>

          {/* 검색 & 내활동(우측) */}
          <div className="ml-auto flex items-center gap-2">
            <input
              placeholder="상품명 또는 브랜드 입력"
              className="hidden md:block h-10 w-64 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-300"
            />
            <Link href="/me" className="btn btn-soft">내활동</Link>
          </div>
        </div>

        {/* ✅ 모바일에서도 보이는 가로 스크롤 탭 */}
        <nav className="-mx-4 mb-2 flex gap-2 overflow-x-auto px-4 pb-2">
          {MENUS.map((m) => {
            const active = path === m.href || path.startsWith(m.href + "/");
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`tab ${active ? "tab-active" : ""}`}
              >
                {m.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
