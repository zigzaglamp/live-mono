import { useCallback, useMemo, useRef, useState } from "react";
import { X, Plus } from "lucide-react";

type Preview = { id: string; file: File; url: string };

export default function ImageUploadCard({
    title,
    required = false,
    maxCount = 1,
    note,
    guide,
    value,
    onChange,
}: {
    title: string;
    required?: boolean;
    maxCount?: number;
    note?: string;   // 권장 크기/가이드 텍스트
    guide?: React.ReactNode; // 추가 설명 블록
    value?: File[];  // 상위에서 관리하고 싶을 때
    onChange?: (files: File[]) => void;
}) {
    const [innerFiles, setInnerFiles] = useState<File[]>([]);
    const files = value ?? innerFiles;

    const inputRef = useRef<HTMLInputElement>(null);

    const previews: Preview[] = useMemo(
        () =>
            files.map((f, i) => ({
                id: `${i}-${f.name}-${f.size}`,
                file: f,
                url: URL.createObjectURL(f),
            })),
        [files]
    );

    const setFiles = useCallback(
        (next: File[]) => {
            if (onChange) onChange(next);
            else setInnerFiles(next);
        },
        [onChange]
    );

    const handlePick = () => inputRef.current?.click();

    const handleFiles = (list: FileList | null) => {
        if (!list) return;
        const next = [...files];
        for (const f of Array.from(list)) {
            if (next.length >= maxCount) break;
            if (!f.type.startsWith("image/")) continue;
            next.push(f);
        }
        setFiles(next);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeAt = (idx: number) => {
        const next = files.slice();
        next.splice(idx, 1);
        setFiles(next);
    };

    const clearAll = () => setFiles([]);

    const canAddMore = files.length < maxCount;

    return (
        <div className="rounded border border-gray-300 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
                <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold">
                        {title} {required && <span className="text-rose-600">*</span>}
                    </h4>
                    <span className="text-xs text-slate-500">
                        ({files.length}/{maxCount})
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handlePick}
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
                    >
                        파일 선택
                    </button>
                    {files.length > 0 && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-gray-50"
                        >
                            전체 삭제
                        </button>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple={maxCount > 1}
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {/* 드래그 영역 + 그리드 미리보기 */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="rounded border border-dashed border-gray-300 bg-gray-50 p-4"
                >
                    <div className="grid grid-cols-6 gap-3">
                        {/* 미리보기 */}
                        {previews.map((p, idx) => (
                            <div key={p.id} className="relative">
                                <img
                                    src={p.url}
                                    alt="preview"
                                    className="h-28 w-28 rounded border border-gray-300 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAt(idx)}
                                    className="absolute -right-2 -top-2 rounded-full border border-gray-300 bg-white p-1 shadow hover:bg-gray-50"
                                    aria-label="remove"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}

                        {/* 더 추가 버튼(플러스 박스) */}
                        {canAddMore && (
                            <button
                                type="button"
                                onClick={handlePick}
                                className="flex h-28 w-28 items-center justify-center rounded border border-dashed border-gray-300 bg-white text-slate-400 hover:bg-gray-50"
                            >
                                <Plus />
                            </button>
                        )}
                    </div>

                    {/* 설명/가이드 */}
                    {note && (
                        <p className="mt-3 text-xs text-emerald-700">
                            {note}
                        </p>
                    )}
                    {guide && <div className="mt-2 text-xs text-slate-500">{guide}</div>}
                </div>
            </div>
        </div>
    );
}
