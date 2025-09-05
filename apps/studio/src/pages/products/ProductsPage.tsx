// src/pages/products/ProductsPage.tsx

import CollapseCard from "@/components/CollapseCard";
import StickyFooter from "@/components/StickyFooter";
import ImageUploadCard from "@/components/uploader/ImageUploadCard";
import { useEffect, useMemo, useState } from "react";
import { isWrittenFromHTML } from "@/lib/editorContent";

type DescDraft = {
    html: string;
    json?: any;
    updatedAt: string;
    counts?: { chars: number; words: number };
    isWritten?: boolean;
};

const DESC_KEY = "product:desc:draft";

export default function ProductCreatePage() {
    const [mainImage, setMainImage] = useState<File[]>([]);
    const [extraImages, setExtraImages] = useState<File[]>([]);

    // 상세설명 상태
    const [descDraft, setDescDraft] = useState<DescDraft | null>(null);

    // 최초 로드 + 다른 창(팝업)에서 저장되면 storage 이벤트로 갱신
    useEffect(() => {
        const read = () => {
            const raw = localStorage.getItem(DESC_KEY);
            setDescDraft(raw ? (JSON.parse(raw) as DescDraft) : null);
        };
        read();

        const onStorage = (e: StorageEvent) => {
            if (e.key === DESC_KEY) read();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const hasDesc = !!(descDraft?.isWritten ?? (descDraft?.html ? isWrittenFromHTML(descDraft.html) : false));
    const countsText = useMemo(() => {
        if (!descDraft?.counts) return "";
        const { chars, words } = descDraft.counts;
        return `문자 ${chars.toLocaleString()} / 단어 ${words.toLocaleString()}`;
    }, [descDraft]);

    // 팝업 새 창 열기 (센터)
    const openDescPopup = () => {

        const w = 1200;
        const h = 800;
        const left = window.screenX + (window.outerWidth - w) / 2;
        const top = window.screenY + (window.outerHeight - h) / 2;
        window.open(
            "/products/description",
            "product_desc_editor",
            `popup=yes,width=${w},height=${h},left=${left},top=${top}`
        );
    };

    // 초기화
    const resetDesc = () => {
        localStorage.removeItem(DESC_KEY);
        setDescDraft(null);
    };

    return (
        <div className="space-y-6">
            <h1 className="mb-4 text-xl font-bold">상품 등록</h1>
            {/* 기본 정보 */}
            <CollapseCard title="기본 정보" defaultOpen>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                    <label className="py-2 text-sm text-slate-600">상품명 *</label>
                    <div>
                        <input
                            className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                            placeholder="상품명을 입력하세요"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            검색 노출을 위해 적절한 키워드를 포함하세요.
                        </p>
                    </div>
                </div>
            </CollapseCard>

            {/* 가격 · 재고 */}
            <CollapseCard title="가격 · 재고" defaultOpen>
                <div className="grid grid-cols-[120px_1fr_120px_1fr] gap-3">
                    <label className="py-2 text-sm text-slate-600">판매가 *</label>
                    <div>
                        <input
                            className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                            placeholder="숫자 입력"
                        />
                    </div>

                    <label className="py-2 text-sm text-slate-600">재고수량 *</label>
                    <div>
                        <input
                            className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                            placeholder="숫자 입력"
                        />
                    </div>
                </div>
            </CollapseCard>

            {/* 이미지 */}
            <CollapseCard title="상품 이미지" defaultOpen>
                <div className="space-y-4">
                    <ImageUploadCard
                        title="대표 이미지"
                        required
                        maxCount={1}
                        value={mainImage}
                        onChange={setMainImage}
                        note="권장 크기: 가로 1000 × 세로 1000 (최소 750 × 1000), 300 × 300 이상"
                        guide="쇼핑검색에 노출되지 않는 경우 도움말 또는 상품검색 SEO가이드 ‘이미지’ 항목을 참고해 주세요."
                    />
                    <ImageUploadCard
                        title="추가 이미지 (최대 9장)"
                        maxCount={9}
                        value={extraImages}
                        onChange={setExtraImages}
                        note="권장 크기: 1000 × 1000 (최소 750 × 1000). 추가 이미지는 최대 9개까지 등록할 수 있습니다."
                        guide="jpg, jpeg, gif, png, bmp 형식의 정지 이미지만 등록됩니다."
                    />
                </div>
            </CollapseCard>

            {/* 상세 설명 – 팝업 작성 */}
            <CollapseCard title="상세 설명" defaultOpen>
                <div className="rounded border border-slate-200 bg-slate-50 p-4">
                    {/* 상단 상태/버튼 라인 */}
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            {hasDesc ? (
                                <>
                                    <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                        작성된 내용이 있습니다
                                    </span>
                                    {countsText && (
                                        <span className="text-xs text-slate-500">({countsText})</span>
                                    )}
                                </>
                            ) : (
                                <span className="text-xs text-slate-500">아직 작성된 내용이 없습니다.</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                onClick={openDescPopup}
                            >
                                {hasDesc ? "상세설명 수정" : "상세설명 작성"}
                            </button>
                            <button
                                className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                onClick={resetDesc}
                            >
                                초기화
                            </button>
                        </div>
                    </div>

                    {/* 네이버처럼 안내글 */}
                    <p className="text-xs leading-5 text-slate-500">
                        외부 링크(네이버 톡 등)를 통한 개인정보(휴대폰 번호, 이메일 주소) 수집은 금지되며
                        등록시 노출이 제한될 수 있습니다. <br />
                        상세설명 권장 가로: 860px
                    </p>
                </div>
            </CollapseCard>

            <StickyFooter
                onPreview={() => console.log("preview")}
                onDraft={() => console.log("draft")}
                onSubmit={() => console.log("submit")}
            />
        </div>
    );
}
