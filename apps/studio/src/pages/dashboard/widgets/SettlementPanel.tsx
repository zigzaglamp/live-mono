// src/pages/dashboard/widgets/SettlementPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function SettlementPanel() {
    return (
        <Card title="정산">
            <div className="grid grid-cols-2 gap-3">
                <StatBadge label="오늘정산" value={`₩0`} />
                <StatBadge label="정산예정" value={`₩0`} />
            </div>
            <div className="mt-3 text-xs text-gray-500">비즈월렛: 0원</div>
        </Card>
    );
}