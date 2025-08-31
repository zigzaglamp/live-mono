// apps/viewer/components/data.ts

const viewersList = [1984, 1532, 2477, 3142, 1866, 2321, 2910, 1754, 2056, 2611, 1933, 2245,];
export const KRW = (amount: number) => "₩" + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const formatInt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const categories = [
  { id: "all", name: "전체", iconKey: "sparkles" },
  { id: "food", name: "푸드", iconKey: "utensils" },
  { id: "fashion", name: "패션", iconKey: "shopping-bag" },
  { id: "life", name: "라이프", iconKey: "house" },
  { id: "trip", name: "여행/체험", iconKey: "plane" },
  { id: "kids", name: "키즈", iconKey: "baby" },
  { id: "tech", name: "테크", iconKey: "laptop" },
  { id: "hobby", name: "취미", iconKey: "palette" },
  { id: "culture", name: "문화상품", iconKey: "ticket" },
];

export const products = Array.from({ length: 12 }).map((_, i) => ({
  id: `P${i + 1}`,
  name: `프리미엄 수박 ${i + 1}팩`,
  badge: i % 3 === 0 ? "LIVE 특가" : i % 3 === 1 ? "무료배송" : "한정수량",
  category: categories[(i % (categories.length - 1)) + 1].name,
  price: 22800 + i * 1200,
  sale: 18900 + i * 1000,
}));

export const liveCards = Array.from({ length: 12 }).map((_, i) => ({
  id: `L${i + 1}`,
  title: `${i + 1}호 수박 라이브 특가`,
  store: "고운 수박",
  category: categories[(i % (categories.length - 1)) + 1].name,
  viewers: viewersList[i],
  discount: [10, 15, 22, 29, 32][i % 5],
  price: 19800 + i * 1200,
}));

export const daysStrip = [
  { id: "0", label: "월", date: "8/26" },
  { id: "1", label: "화", date: "8/27" },
  { id: "2", label: "Today", date: "8/28" },
  { id: "3", label: "목", date: "8/29" },
  { id: "4", label: "금", date: "8/30" },
  { id: "5", label: "토", date: "8/31" },
  { id: "6", label: "일", date: "9/1" },
  { id: "7", label: "월", date: "9/2" },
  { id: "8", label: "화", date: "9/3" },
];

export const banners = [
  {
    id: "b1",
    status: "live",
    timeLabel: "내일 오후 7시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 시청중",
    channel: "FD1OR",
    thumb: "/banners/0.png",
    goods: [
      { id: "g1", img: "/banners/1.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/2.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/3.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "입장하기",
  },
  {
    id: "b2",
    status: "scheduled",
    timeLabel: "내일 오후 10시",
    title: "투티터 ~91% 역대급 세일",
    watchers: "40.2만명이 기다리는 중",
    channel: "FD1OR",
    thumb: "/banners/4.png",
    goods: [
      { id: "g1", img: "/banners/5.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/6.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/7.png", sale: "74%", price: "₩17,900" },
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
    thumb: "/banners/8.png",
    goods: [
      { id: "g1", img: "/banners/9.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/10.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/11.png", sale: "74%", price: "₩17,900" },
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
    thumb: "/banners/12.png",
    goods: [
      { id: "g1", img: "/banners/0.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/1.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/2.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "입장하기",
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
      { id: "g1", img: "/banners/4.png", sale: "83%", price: "₩16,900" },
      { id: "g2", img: "/banners/5.png", sale: "77%", price: "₩17,900" },
      { id: "g3", img: "/banners/6.png", sale: "74%", price: "₩17,900" },
    ],
    cta: "입장하기",
  },
];