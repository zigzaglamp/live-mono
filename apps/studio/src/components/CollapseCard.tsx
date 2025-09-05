// src/components/CollapseCard.tsx

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CollapseCard({
    title,
    children,
    defaultOpen = true,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <section className="mb-4 rounded border border-gray-300 bg-white">
            <header
                className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2"
            >
                <h3 className="text-sm font-semibold">{title}</h3>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
                >
                    {open ? (
                        <span className="inline-flex items-center gap-1">
                            <ChevronUp size={14} /> 접기
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1">
                            <ChevronDown size={14} /> 펼치기
                        </span>
                    )}
                </button>
            </header>
            {open && <div className="p-4">{children}</div>}
        </section>
    );
}
