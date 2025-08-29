// apps/viewer/components/data.ts

// 통일된 통화 포맷 (로케일 비의존)
export const KRW = (amount: number) =>
  "₩" + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const categories = [
  { id: "all", name: "전체", emoji: "✨" },
  { id: "beauty", name: "뷰티", emoji: "💄" },
  { id: "food", name: "푸드", emoji: "🍱" },
  { id: "fashion", name: "패션", emoji: "👗" },
  { id: "life", name: "라이프", emoji: "🏠" },
  { id: "trip", name: "여행/체험", emoji: "✈️" },
  { id: "kids", name: "키즈", emoji: "🧒" },
  { id: "tech", name: "테크", emoji: "💻" },
  { id: "hobby", name: "취미", emoji: "🎨" },
  { id: "culture", name: "문화상품", emoji: "🎫" },
];

// ❌ Math.random()/Date.now() 제거 → ✅ 고정값 사용
const viewersList = [
  1984, 1532, 2477, 3142, 1866, 2321, 2910, 1754, 2056, 2611, 1933, 2245,
];

export const liveCards = Array.from({ length: 12 }).map((_, i) => ({
  id: `L${i + 1}`,
  title: `${i + 1}호 수박 라이브 특가`,
  store: "고운 수박",
  category: categories[(i % (categories.length - 1)) + 1].name,
  viewers: viewersList[i],                     // ✅ 고정 숫자
  discount: [10, 15, 22, 29, 32][i % 5],
  price: 19800 + i * 1200,
}));

export const products = Array.from({ length: 12 }).map((_, i) => ({
  id: `P${i + 1}`,
  name: `프리미엄 수박 ${i + 1}팩`,
  badge: i % 3 === 0 ? "LIVE 특가" : i % 3 === 1 ? "무료배송" : "한정수량",
  price: 22800 + i * 1200,
  sale: 18900 + i * 1000,
}));

// ❌ 런타임 날짜 계산 제거 → ✅ 데모용 상수 (서버/클라 동일)
export const daysStrip = [
  { key: 0, label: "월", date: "8/26" },
  { key: 1, label: "화", date: "8/27" },
  { key: 2, label: "Today", date: "8/28" },
  { key: 3, label: "목", date: "8/29" },
  { key: 4, label: "금", date: "8/30" },
  { key: 5, label: "토", date: "8/31" },
  { key: 6, label: "일", date: "9/1"  },
  { key: 7, label: "월", date: "9/2"  },
  { key: 8, label: "화", date: "9/3"  },
];
