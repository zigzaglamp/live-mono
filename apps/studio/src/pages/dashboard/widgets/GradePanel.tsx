// src/pages/dashboard/widgets/GradePanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function GradePanel() {
    return (
        <Card title="판매자 등급">
            <div className="grid grid-cols-2 gap-3">
                <StatBadge label="9월 판매자 등급" value={`씨앗`} />
                <StatBadge label="굿서비스 기준" value={`불충족`} />
            </div>
        </Card>
    );
}