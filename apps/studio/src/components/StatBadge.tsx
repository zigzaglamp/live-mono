// src/components/StatBadge.tsx

export default function StatBadge({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
    return (
        <div className="flex flex-col gap-1 border border-gray-300 bg-white p-3">
            <div className="text-[12px] text-gray-500">{label}</div>
            <div className="text-2xl font-bold leading-none text-gray-900">{value}</div>
            {hint && <div className="text-[11px] text-gray-500">{hint}</div>}
        </div>
    );
}