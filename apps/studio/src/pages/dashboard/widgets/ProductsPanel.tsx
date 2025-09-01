// src/pages/dashboard/widgets/ProductsPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function ProductsPanel() {
    return (
        <Card title="상품">
            <div className="grid grid-cols-3 gap-3">
                <StatBadge label="판매중" value={0} />
                <StatBadge label="품절" value={0} />
                <StatBadge label="수정요청" value={0} />
            </div>
        </Card>
    );
}