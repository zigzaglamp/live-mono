// src/components/StickyFooter.tsx

export default function StickyFooter({
    onPreview,
    onDraft,
    onSubmit,
}: {
    onPreview?: () => void;
    onDraft?: () => void;
    onSubmit?: () => void;
}) {
    return (
        <footer className="sticky bottom-0 z-40 mt-6 border-t border-gray-300 bg-white">
            <div className="flex w-full items-center justify-end gap-2 py-3 pr-0">
                <button
                    type="button"
                    onClick={onPreview}
                    className="rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                >
                    미리보기
                </button>
                <button
                    type="button"
                    onClick={onDraft}
                    className="rounded border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                >
                    임시저장
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="rounded bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
                >
                    저장하기
                </button>
            </div>
        </footer>
    );
}
