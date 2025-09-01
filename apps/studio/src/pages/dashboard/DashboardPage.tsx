// src/pages/dashboard/DashboardPage.tsx

import OrdersPanel from "./widgets/OrdersPanel";
import SettlementPanel from "./widgets/SettlementPanel";
import IssuesPanel from "./widgets/IssuesPanel";
import DelayPanel from "./widgets/DelayPanel";
import InquiryPanel from "./widgets/InquiryPanel";
import ProductsPanel from "./widgets/ProductsPanel";
import GradePanel from "./widgets/GradePanel";


export default function DashboardPage() {
    return (
        <>
            {/* fixed grid, non-responsive */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8"><OrdersPanel /></div>
                <div className="col-span-4"><SettlementPanel /></div>
            </div>


            <div className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-4"><IssuesPanel /></div>
                <div className="col-span-4"><DelayPanel /></div>
                <div className="col-span-4"><InquiryPanel /></div>
            </div>


            <div className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-6"><ProductsPanel /></div>
                <div className="col-span-6"><GradePanel /></div>
            </div>
        </>
    );
}