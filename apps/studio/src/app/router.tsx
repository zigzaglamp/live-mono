// src/app/router.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import OrdersPage from "../pages/orders/OrdersPage";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import DevInProgressPage from "@/pages/DevInProgressPage";
import LiveReadyPage from "@/pages/live/LiveReadyPage";
import LiveStartPage from "@/pages/live/LiveStartPage";
import LiveOnAirHubPage from "@/pages/live/LiveOnAirHubPage";
import LiveListPage from "@/pages/live/LiveListPage";
const ProductDescriptionEditorPage = lazy(() => import("@/pages/products/ProductDescriptionEditorPage"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* 레이아웃 안에서 보이는 일반 화면들 */}
      <Route element={<Layout />}>
        {/* "/"로 들어오면 dashboard로 이동 */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ✅ 상대 경로로 변경 (슬래시 제거) */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="devInProgress" element={<DevInProgressPage />} />
        <Route path="liveReady" element={<LiveReadyPage />} />
        <Route path="liveStart" element={<LiveStartPage />} />
        <Route path="liveOnAirHub" element={<LiveOnAirHubPage />} />
        <Route path="liveList" element={<LiveListPage />} />
      </Route>

      {/* 레이아웃 바깥: 에디터 전용 */}
      <Route
        path="/products/description"
        element={
          <Suspense fallback={<div className="p-6 text-sm text-gray-600">에디터 불러오는 중…</div>}>
            <ProductDescriptionEditorPage />
          </Suspense>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div className="p-6 text-sm text-gray-600">페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}
