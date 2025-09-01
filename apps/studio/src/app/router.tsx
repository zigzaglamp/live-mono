// src/app/router.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import OrdersPage from "../pages/orders/OrdersPage";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<div className="p-6 text-sm text-gray-600">페이지를 찾을 수 없습니다.</div>} />
        </Routes>
    );
}