// apps/viewer/app/layout.tsx
import "./globals.css";
import TopNav from "@features/TopNav"; // 클라 전용 분리
import localFont from "next/font/local";
import Footer from "@features/Footer";

const payperlogy = localFont({
  src: [
    { path: "../public/fonts/paperlogy/Paperlogy-1Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-2ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-3Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-4Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-5Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-6SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-7Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-8ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/paperlogy/Paperlogy-9Black.ttf", weight: "900", style: "normal" },
  ],
  display: "swap",
});

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "고운 수박 LIVE",
  description: "라이브커머스 뷰어",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={payperlogy.className}>
      <body className="min-h-dvh flex flex-col">
        <TopNav />
        <main className="site mx-auto max-w-screen-xl px-4 w-full grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}