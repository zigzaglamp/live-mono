// src/pages/live/LiveReadyPage.tsx

import { useMemo, useState } from "react";
import { TicketPercent } from "lucide-react";
import CollapseCard from "@/components/CollapseCard";
import ImageUploadCard from "@/components/uploader/ImageUploadCard";
import { ChevronDown } from "lucide-react";

type Product = { id: string; name: string; price: number };
type Coupon = {
    id: string;
    name: string;
    type: "percent" | "amount";
    value: number;
    limited?: number;
    timeSale?: { start: string; end: string };
};

export default function LiveReadyPage() {
    // 방송 생성하기
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("general");
    const [desc, setDesc] = useState("");
    const [mainImage, setMainImage] = useState<File[]>([]);
    const [extraImages, setExtraImages] = useState<File[]>([]);

    // 방송 일정 예약
    const [startAt, setStartAt] = useState<string>("");
    const [notifySubs, setNotifySubs] = useState(true);

    // 상품 등록/연결
    const [products, setProducts] = useState<Product[]>([
        { id: "p1", name: "샘플 상품 A", price: 12900 },
        { id: "p2", name: "샘플 상품 B", price: 19900 },
    ]);

    // 쿠폰/할인 설정
    const [coupons, setCoupons] = useState<Coupon[]>([
        { id: "c1", name: "방송 특가 10%", type: "percent", value: 10, limited: 100 },
    ]);

    const canSave = useMemo(() => title.trim().length > 0, [title]);

    const moveUp = (idx: number) => {
        if (idx <= 0) return;
        const next = products.slice();
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
        setProducts(next);
    };
    const moveDown = (idx: number) => {
        if (idx >= products.length - 1) return;
        const next = products.slice();
        [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
        setProducts(next);
    };
    const removeProduct = (id: string) => setProducts((arr) => arr.filter((p) => p.id !== id));
    const addProduct = () =>
        setProducts((arr) => [...arr, { id: `p${arr.length + 1}`, name: `새 상품 ${arr.length + 1}`, price: 10000 }]);

    const addCoupon = () =>
        setCoupons((arr) => [...arr, { id: `c${arr.length + 1}`, name: "신규 쿠폰", type: "amount", value: 2000 }]);
    const removeCoupon = (id: string) => setCoupons((arr) => arr.filter((c) => c.id !== id));

    const handleSubmit = () => {
        if (!canSave) return alert("방송 제목은 필수입니다.");
        alert("사전설정 저장 완료! (후속 연동에서 실제 저장)");
    };

    return (
        <div className="space-y-6">
            <h1 className="mb-2 text-xl font-bold">방송 준비</h1>
            <p className="text-sm text-slate-500">송출 전에 필요한 정보를 등록하고 노출 리소스를 연결합니다.</p>

            {/* 1) 방송 생성하기 */}
            <CollapseCard title="방송 생성하기" defaultOpen>
                <div className="space-y-4">
                    <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                        <label className="py-2 text-sm text-slate-600">방송 제목 *</label>
                        <div>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                                placeholder="시청자에게 보이는 제목을 입력"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                        <label className="py-2 text-sm text-slate-600">카테고리</label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm appearance-none"
                            >
                                <option value="general">일반</option>
                                <option value="fashion">패션</option>
                                <option value="beauty">뷰티</option>
                                <option value="food">식품</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                                <ChevronDown />
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-[140px_1fr] items-start gap-3">
                        <label className="py-2 text-sm text-slate-600">설명</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="min-h-[90px] w-full rounded border border-gray-300 p-3 text-sm"
                            placeholder="방송 소개/혜택 등을 간단히 적어주세요."
                        />
                    </div>
                </div>
            </CollapseCard>

            {/* 2) 방송 일정 예약 */}
            <CollapseCard title="방송 일정 예약" defaultOpen>
                <div className="space-y-4">
                    {/* 시작 시간 */}
                    <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                        <label className="flex items-center gap-2 py-2 text-sm text-slate-600">
                            시작 시간
                        </label>
                        <input
                            type="datetime-local"
                            value={startAt}
                            onChange={(e) => setStartAt(e.target.value)}
                            className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                        />
                    </div>

                    {/* 알림 구독자 */}
                    <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                        <label className="flex items-center gap-2 py-2 text-sm text-slate-600">
                            알림 구독자
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={notifySubs}
                                onChange={(e) => setNotifySubs(e.target.checked)}
                            />
                            시작 10분 전 알림 보내기
                        </label>
                    </div>

                    <p className="text-xs text-slate-500">
                        * 실제 예약/알림 로직은 후속 연동 단계에서 구현
                    </p>
                </div>
            </CollapseCard>


            {/* 3) 이미지 등록 */}
            <CollapseCard title="이미지 설정" defaultOpen>
                <div className="space-y-4">
                    <ImageUploadCard
                        title="썸네일 이미지"
                        required
                        maxCount={1}
                        value={mainImage}
                        onChange={setMainImage}
                        note="권장 크기: 가로 1280 × 세로 720 (16:9), JPG/PNG"
                        guide="방송 목록과 공유 썸네일에 사용됩니다."
                    />
                    <ImageUploadCard
                        title="상품 이미지 (최대 3장)"
                        maxCount={3}
                        value={extraImages}
                        onChange={setExtraImages}
                        note="권장 크기: 1000 × 1000 (최소 750 × 1000). 추가 이미지는 최대 3개까지 등록할 수 있습니다."
                        guide="jpg, jpeg, gif, png, bmp 형식의 정지 이미지만 등록됩니다."
                    />
                </div>
            </CollapseCard>

            {/* 4) 상품 등록/연결 — 보더 톤을 ImageUploadCard에 맞춤 */}
            <CollapseCard title="상품 등록/연결" defaultOpen>
                <div className="space-y-3">
                    {/* 안내 박스: border-gray-300 / bg-gray-50로 선명도 업 */}
                    <div className="rounded border border-gray-300 bg-gray-50 p-3 text-sm text-slate-700">
                        방송 중 노출할 상품을 선택하고 순서를 편집하세요.
                    </div>

                    {/* 목록 박스: border-gray-300, 내부 라인은 divide-gray-200 */}
                    <div className="divide-y divide-gray-200 rounded border border-gray-300 bg-white">
                        {products.map((p, idx) => (
                            <div key={p.id} className="flex items-center gap-3 px-4 py-2">
                                <span className="w-6 text-xs text-slate-500">{idx + 1}</span>
                                <span className="flex-1 truncate text-sm text-slate-800">{p.name}</span>
                                <span className="text-xs text-slate-500">{p.price.toLocaleString()}원</span>
                                <div className="ml-2 flex items-center gap-1">
                                    <button
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
                                        onClick={() => moveUp(idx)}
                                    >
                                        ▲
                                    </button>
                                    <button
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
                                        onClick={() => moveDown(idx)}
                                    >
                                        ▼
                                    </button>
                                    <button
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
                                        onClick={() => removeProduct(p.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            className="h-9 rounded border border-gray-300 bg-white px-3 text-sm text-slate-700 hover:bg-gray-50"
                            onClick={addProduct}
                        >
                            상품 목록
                        </button>
                    </div>
                </div>
            </CollapseCard>

            {/* 5) 쿠폰/할인 설정 — 보더 톤을 ImageUploadCard에 맞춤 */}
            <CollapseCard title="쿠폰/할인 설정" defaultOpen>
                <div className="space-y-3">
                    <div className="rounded border border-gray-300 bg-gray-50 p-3 text-sm text-slate-700">
                        방송 특가, 한정 수량, 타임세일을 설정하세요.
                    </div>

                    <div className="divide-y divide-gray-200 rounded border border-gray-300 bg-white">
                        {coupons.map((c) => (
                            <div key={c.id} className="flex flex-wrap items-center gap-3 px-4 py-2">
                                <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <TicketPercent size={16} />
                                    {c.name}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {c.type === "percent" ? `${c.value}%` : `${c.value.toLocaleString()}원`}{" "}
                                    {c.limited ? `· 한정 ${c.limited}개` : ""}
                                </span>
                                {c.timeSale && (
                                    <span className="text-xs text-emerald-700">
                                        {c.timeSale.start} ~ {c.timeSale.end}
                                    </span>
                                )}
                                <div className="ml-auto flex items-center gap-2">
                                    <button className="rounded border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50">
                                        편집
                                    </button>
                                    <button
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
                                        onClick={() => removeCoupon(c.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="h-9 rounded border border-gray-300 bg-white px-3 text-sm text-slate-700 hover:bg-gray-50"
                        onClick={addCoupon}
                    >
                        쿠폰 추가
                    </button>
                </div>
            </CollapseCard>

            {/* 하단: 단일 등록 버튼 (StickyFooter 미사용) */}
            <div className="mt-6 flex w-full justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
