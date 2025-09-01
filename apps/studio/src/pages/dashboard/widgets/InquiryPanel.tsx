// src/pages/dashboard/widgets/InquiryPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function InquiryPanel() {
    return (
        <Card title="미답변 문의">
            <div className="grid grid-cols-1 gap-3">
                <StatBadge label="상품 Q&A" value={0} />
                <StatBadge label="주문고객문의" value={0} />
            </div>
        </Card>
    );
}