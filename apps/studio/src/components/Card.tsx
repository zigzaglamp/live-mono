// src/components/Card.tsx

export default function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`border border-gray-300 bg-white shadow-sm ${className}`}>
            {title && (
                <div className="flex items-center justify-between border-b border-gray-300 bg-gray-200 px-4 py-3">
                    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                    <button className="text-xs text-gray-400 hover:text-gray-600">자세히</button>
                </div>
            )}
            <div className="p-4">{children}</div>
            <div className="border-t border-gray-300 bg-gray-100/40"></div>
        </div>
    );
}