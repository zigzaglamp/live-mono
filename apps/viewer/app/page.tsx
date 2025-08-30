// apps/viewer/app/page.tsx  (홈)
import BannerNaverSlider, {
  type BannerItem,
} from "@/components/design/BannerNaverSlider";
import BannerMobileRail from "@/components/design/BannerMobileRail";

// ▼ 추가 임포트
import { Section } from "@/components/ui";
import { products } from "@/components/data";
import { ProductCard } from "@/components/design/LiveCard";


// 데스크톱용 배너 데이터 (기존과 동일 구조)
const desktopBanners: BannerItem[] = [
  {
    id: "b1",
    status: "live",
    timeLabel: "내일 오후 7시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 시청중",
    channel: "FD1OR",
    thumb: "/banners/1.jpg",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "알림받기",
  },
  {
    id: "b2",
    status: "scheduled",
    timeLabel: "내일 오후 10시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 기다리는 중",
    channel: "FD1OR",
    thumb: "/banners/1.png",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "알림받기",
  },
  {
    id: "b3",
    status: "scheduled",
    timeLabel: "내일 오후 11시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 기다리는 중",
    channel: "FD1OR",
    thumb: "/banners/3.png",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "알림받기",
  },
  {
    id: "b4",
    status: "live",
    timeLabel: "내일 오후 1시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 시청중",
    channel: "FD1OR",
    thumb: "/banners/2.png",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "알림받기",
  },
  {
    id: "b5",
    status: "live",
    timeLabel: "내일 오후 2시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 시청중",
    channel: "FD1OR",
    thumb: "/banners/3.png",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "알림받기",
  },
  // ...원하면 더 추가
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1280px]">
      {/* 섹션 타이틀 */}
      <h1 className="px-4 pt-6 text-2xl font-extrabold lg:px-0">오늘 놓치지 마세요!</h1>

      {/* 모바일 전용 */}
      <div className="block lg:hidden">
        <BannerMobileRail items={desktopBanners} />
      </div>

      {/* 데스크톱: 중앙 카드형 슬라이더 */}
      <div className="hidden lg:block">
        <div className="mt-4">
          <BannerNaverSlider items={desktopBanners} interval={5000} />
        </div>
      </div>

      {/* ▼ 추가: 라이브 상품 TOP 100 */}
      <Section title="라이브 상품 TOP 100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>
      </Section>

      {/* 이하 다른 섹션들 … */}
    </main>
  );
}
