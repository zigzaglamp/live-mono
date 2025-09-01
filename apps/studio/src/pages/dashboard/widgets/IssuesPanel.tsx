// src/pages/dashboard/widgets/IssuesPanel.tsx

import Card from "../../../components/Card";
import StatBadge from "../../../components/StatBadge";


export default function IssuesPanel() {
    return (
        <Card title="취소 · 반품 · 교환">
            <div className="grid grid-cols-3 gap-3">
                <StatBadge label="취소요청" value={0} />
                <StatBadge label="반품요청" value={0} />
                <StatBadge label="교환요청" value={0} />
            </div>
        </Card>
    );
}