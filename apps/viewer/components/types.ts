// apps/viewer/components/types.ts

export interface categories {
  id: string;
  name: string;
  iconKey: string;
}

export interface products {
  id: string;
  name: string;
  badge?: string;
  category?: string;
  price: number;
  sale: number;
}

export interface daysStrip {
  id: string;
  label: string;
  date: string;
}

export interface banners {
  id: string;
  status: string;               // 라이브|방송예약
  timeLabel: string;            // 예: "내일 오후 7시"
  title: string;                // 메인 타이틀
  watchers?: string;            // "xx명이 시청중" or "xx만명이 기다리는 중" (데이터로 제어)
  channel: string;              // FD1OR 등
  thumb: string;                // 왼쪽 메인 이미지
  goods: { id: string; img: string; price?: string; sale?: string }[]; // 오른쪽 미니 카드 3~4개
  cta?: string;                 // "알림받기"
};

export interface liveItem {
  id: string;
  title: string;
  store: string;
  category: string;
  viewers: number;
  discount: number;
  price: number;
}