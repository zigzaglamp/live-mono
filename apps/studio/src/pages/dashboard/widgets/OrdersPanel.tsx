// src/pages/dashboard/widgets/OrdersPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function OrdersPanel() {
    return (
        <Card title="주문 · 배송 (최근 1주일)">
            <div className="grid grid-cols-6 gap-3">
                <StatBadge label="신규주문" value={0} />
                <StatBadge label="배송준비" value={0} />
                <StatBadge label="배송중" value={0} />
                <StatBadge label="배송완료" value={0} />
                <StatBadge label="구매확정" value={0} />
                <StatBadge label="도착보장" value={0} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm text-gray-600">
                <div>오늘출발 0</div>
                <div>예약구매 0</div>
                <div>정기구독 0</div>
            </div>
        </Card>
    );
}