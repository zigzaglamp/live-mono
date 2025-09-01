// src/pages/products/ProductsPage.tsx

import Card from "../../components/Card";


export default function ProductsPage() {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <Card title="상품 관리">
                    <div className="text-sm text-gray-600">상품 목록/등록 등의 상세 화면이 들어올 자리입니다.</div>
                </Card>
            </div>
        </div>
    );
}