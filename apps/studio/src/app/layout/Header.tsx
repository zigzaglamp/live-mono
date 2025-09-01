// src/app/layout/Header.tsx

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-900 bg-slate-900">
      <div className="flex items-center justify-between px-5 py-3">
        {/* 로고 */}
        <Link
          to="/"
          className="bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-500 bg-clip-text text-2xl font-extrabold text-transparent animate-aurora aurora-glow"
        >
          고운 수박 LIVE STUDIO
        </Link>

        <div className="flex items-center gap-2">
          <button className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-100 hover:bg-slate-700">
            내 정보
          </button>
          <button className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-100 hover:bg-slate-700">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
