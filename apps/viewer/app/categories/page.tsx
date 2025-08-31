// apps/viewer/app/categories/page.tsx

import CategoriesClient from "@features/CategoriesClient";
import { categories, products } from "@components/data";

export default function CategoriesPage() {
  return (
    <>
      <CategoriesClient categories={categories} products={products} />
    </>
  );
}
