// src/pages/dashboard/widgets/DelayPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function DelayPanel() {
    return (
        <Card title="판매지연">
            <div className="grid grid-cols-2 gap-3">
                <StatBadge label="발송지연" value={0} />
                <StatBadge label="취소지연" value={0} />
            </div>
        </Card>
    );
}