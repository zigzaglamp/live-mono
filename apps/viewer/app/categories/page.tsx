// apps/viewer/app/categories/page.tsx
import { Section } from "@/components/ui";
import { categories, products } from "@/components/data";
import { ProductCard } from "@/components/design/LiveCard";
import CategoriesClient from "@/components/design/CategoriesClient";

export default function CategoriesPage() {
  return (
    <>
      {/* 카테고리 선택/필터링: products 기반 */}
      <CategoriesClient categories={categories} products={products} />
    </>
  );
}
