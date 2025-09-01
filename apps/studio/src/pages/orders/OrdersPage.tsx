// src/pages/orders/OrdersPage.tsx

import Card from "../../components/Card";


export default function OrdersPage() {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <Card title="주문 관리">
                    <div className="text-sm text-gray-600">주문 목록/상세/배송 관리 등이 들어올 자리입니다.</div>
                </Card>
            </div>
        </div>
    );
}