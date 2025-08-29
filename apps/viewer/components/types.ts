// apps/viewer/components/types.ts
export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface LiveItem {
  id: string;
  title: string;
  store: string;
  category: string;
  viewers: number;
  discount: number;
  price: number;
  // 필요 시 썸네일 등 필드 추가
}

export interface ProductItem {
  id: string;
  title: string;
  brand?: string;
  price: number;
  discount?: number;
  // 필요 시 이미지/카테고리 등 추가
}

export type KrwFn = (amount: number) => string;
