// src/pages/live/LiveStartPage.tsx

import { useMemo, useState } from "react";
import {
    MonitorPlay,
    SwitchCamera,
    PictureInPicture2,
    Film,
    Camera,
    Mic,
    AppWindow,
    Power,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CollapseCard from "@/components/CollapseCard";

type LayoutMode = "single" | "switching" | "pip";

type ReadyBroadcast = {
    id: string;
    title: string;
    scheduledAt?: string;
};

const mockReadyList: ReadyBroadcast[] = [
    { id: "r1", title: "9월 신상품 라이브", scheduledAt: "2025-09-10 19:30" },
    { id: "r2", title: "가을 패션 특집", scheduledAt: "2025-09-12 20:00" },
];

export default function LiveStartPage() {
    const navigate = useNavigate();

    // 진행 단계: 0=레이아웃/방송선택, 1=장비설정, 2=미리보기/상태
    const [step, setStep] = useState(0);

    // 1) 레이아웃 + 방송 선택
    const [layout, setLayout] = useState<LayoutMode>("single");
    const [selectedReadyId, setSelectedReadyId] = useState<string | "adhoc" | null>(null);
    const [adhocTitle, setAdhocTitle] = useState("");

    // 2) 장비 설정
    const [resolution, setResolution] = useState("720p");
    // 단일/공통
    const [deviceCam, setDeviceCam] = useState("cam-default");
    const [deviceMic, setDeviceMic] = useState("mic-default");
    // 스위칭
    const [switchCams, setSwitchCams] = useState<string[]>(["cam-a"]);
    // PiP
    const [pipMain, setPipMain] = useState("main-cam");
    const [pipSub, setPipSub] = useState("sub-cam");

    const stepRatio = useMemo(() => ((step + 1) / 3) * 100, [step]); // 33, 66, 100%

    const canNextFrom1 = useMemo(() => {
        // 조건: 방송 선택(사전설정 or 즉석제목) + 레이아웃 선택
        if (selectedReadyId === "adhoc") return adhocTitle.trim().length > 0;
        return !!selectedReadyId;
    }, [selectedReadyId, adhocTitle]);

    const canNextFrom2 = useMemo(() => {
        if (layout === "single") return !!deviceCam && !!deviceMic;
        if (layout === "switching") return switchCams.length >= 1;
        if (layout === "pip") return pipMain && pipSub && pipMain !== pipSub;
        return false;
    }, [layout, deviceCam, deviceMic, switchCams, pipMain, pipSub]);

    const currentBroadcastTitle =
        selectedReadyId === "adhoc"
            ? adhocTitle || "(제목 미정)"
            : mockReadyList.find((b) => b.id === selectedReadyId)?.title || "(미선택)";

    // const openCentered = (url: string, name: string, w: number, h: number) => {
    //     const left = window.screenX + (window.outerWidth - w) / 2;
    //     const top = window.screenY + (window.outerHeight - h) / 2;
    //     window.open(url, name, `popup=yes,width=${w},height=${h},left=${left},top=${top}`);
    // };

    const handleStart = () => {
        // 팝업 예시: 실제 구현 시 각 경로에 맞는 페이지 준비
        //openCentered("/onair/view", "onair_view", 1200, 700);
        //openCentered("/onair/chat", "onair_chat", 420, 720);
        //openCentered("/onair/products", "onair_products", 560, 720);
        //openCentered("/onair/coupons", "onair_coupons", 420, 600);
        navigate("/liveOnAirHub", {
            state: {
                layout,
                resolution,
                selectedReadyId,
                title: currentBroadcastTitle,
            },
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="mb-1 text-xl font-bold">방송 시작</h1>
            <p className="text-sm text-slate-500">단계별로 설정을 완료하고 방송을 시작하세요.</p>

            {/* 상단 진행 게이지 */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${stepRatio}%`,
                        background:
                            "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(59,130,246,0.9) 100%)",
                        transition: "width 500ms ease",
                    }}
                />
                <div className="shimmer absolute inset-0" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
                <span>1단계 레이아웃/방송 선택</span>
                <span>2단계 장비 설정</span>
                <span>3단계 미리보기/상태</span>
            </div>

            {/* STEP 1 */}
            {step === 0 && (
                <div className="space-y-6">
                    <CollapseCard title="화면 레이아웃 선택" defaultOpen>
                        <div className="grid grid-cols-3 gap-4">
                            <LayoutCard
                                active={layout === "single"}
                                title="단일 카메라"
                                icon={<MonitorPlay size={18} />}
                                onClick={() => setLayout("single")}
                            />
                            <LayoutCard
                                active={layout === "switching"}
                                title="다중 카메라(스위칭)"
                                icon={<SwitchCamera size={18} />}
                                onClick={() => setLayout("switching")}
                            />
                            <LayoutCard
                                active={layout === "pip"}
                                title="PiP(분할)"
                                icon={<PictureInPicture2 size={18} />}
                                onClick={() => setLayout("pip")}
                            />
                        </div>
                    </CollapseCard>

                    <CollapseCard title="방송 선택(사전설정 or 즉석 생성)" defaultOpen>
                        <div className="grid grid-cols-2 gap-5">
                            {/* 사전설정 목록 */}
                            <div>
                                <div className="mb-2 text-sm font-medium text-slate-800">사전설정 목록</div>
                                <div className="divide-y rounded border border-gray-300 bg-white">
                                    {mockReadyList.map((b) => (
                                        <label
                                            key={b.id}
                                            className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm"
                                        >
                                            <input
                                                type="radio"
                                                name="readyPick"
                                                value={b.id}
                                                checked={selectedReadyId === b.id}
                                                onChange={() => setSelectedReadyId(b.id)}
                                            />
                                            <span className="flex-1">
                                                <span className="font-medium text-slate-900">{b.title}</span>{" "}
                                                <span className="text-xs text-slate-500">{b.scheduledAt}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 즉석 생성 */}
                            <div>
                                <div className="mb-2 text-sm font-medium text-slate-800">즉석 생성</div>
                                <div className="rounded border border-gray-300 bg-white p-4">
                                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-700">
                                        <Film size={16} />
                                        방송 제목
                                    </div>
                                    <input
                                        className="h-9 w-full rounded border border-gray-300 px-3 text-sm"
                                        placeholder="지금 바로 방송 제목 입력"
                                        value={adhocTitle}
                                        onChange={(e) => {
                                            setAdhocTitle(e.target.value);
                                            setSelectedReadyId("adhoc");
                                        }}
                                    />
                                    <p className="mt-2 text-xs text-slate-500">
                                        * 사전설정 없이도 바로 진행할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CollapseCard>

                    <NavButtons
                        leftLabel="이전"
                        rightLabel="다음"
                        onLeft={() => setStep(0)}
                        onRight={() => canNextFrom1 && setStep(1)}
                        leftDisabled
                        rightDisabled={!canNextFrom1}
                    />
                </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
                <div className="space-y-6">
                    <CollapseCard title="장비/품질 설정" defaultOpen>
                        {/* 공통 */}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <Camera size={16} /> 카메라
                                </div>
                                {layout !== "switching" ? (
                                    <select
                                        value={deviceCam}
                                        onChange={(e) => setDeviceCam(e.target.value)}
                                        className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm"
                                    >
                                        <option value="cam-default">기본 카메라</option>
                                        <option value="cam-a">카메라 A</option>
                                        <option value="cam-b">카메라 B</option>
                                    </select>
                                ) : (
                                    <MultiPicker
                                        values={switchCams}
                                        options={["cam-a", "cam-b", "cam-c"]}
                                        onChange={setSwitchCams}
                                        note="2개 이상 선택 시 전환 스위칭이 가능합니다."
                                    />
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <Mic size={16} /> 마이크
                                </div>
                                <select
                                    value={deviceMic}
                                    onChange={(e) => setDeviceMic(e.target.value)}
                                    className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm"
                                >
                                    <option value="mic-default">기본 마이크</option>
                                    <option value="mic-a">마이크 A</option>
                                    <option value="mic-b">마이크 B</option>
                                </select>
                            </div>
                        </div>

                        {/* 레이아웃 전용 옵션 */}
                        {layout === "pip" && (
                            <div className="mt-4 grid grid-cols-2 gap-5">
                                <div className="space-y-3">
                                    <div className="text-sm font-medium text-slate-800">메인 소스</div>
                                    <select
                                        value={pipMain}
                                        onChange={(e) => setPipMain(e.target.value)}
                                        className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm"
                                    >
                                        <option value="main-cam">메인 카메라</option>
                                        <option value="screen">화면 공유</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-sm font-medium text-slate-800">서브(PiP) 소스</div>
                                    <select
                                        value={pipSub}
                                        onChange={(e) => setPipSub(e.target.value)}
                                        className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm"
                                    >
                                        <option value="sub-cam">서브 카메라</option>
                                        <option value="screen">화면 공유</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <AppWindow size={16} /> 해상도
                                </div>
                                <select
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                    className="h-9 w-full rounded border border-gray-300 bg-white px-2 text-sm"
                                >
                                    <option value="1080p">1080p</option>
                                    <option value="720p">720p</option>
                                    <option value="480p">480p</option>
                                </select>
                            </div>
                        </div>
                    </CollapseCard>

                    <NavButtons
                        leftLabel="이전"
                        rightLabel="다음"
                        onLeft={() => setStep(0)}
                        onRight={() => canNextFrom2 && setStep(2)}
                        rightDisabled={!canNextFrom2}
                    />
                </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
                <div className="space-y-6">
                    <CollapseCard title="미리보기 / 상태" defaultOpen>
                        <div className="grid grid-cols-2 gap-5">
                            {/* 좌: 미리보기 자리 */}
                            <div className="aspect-video rounded-lg border border-slate-200 bg-slate-100" />
                            {/* 우: 상태 */}
                            <div className="rounded-lg border border-gray-300 bg-white p-4 text-sm">
                                <div className="mb-3 text-slate-900">
                                    <span className="font-semibold">방송: </span>
                                    {currentBroadcastTitle}
                                </div>
                                <ul className="space-y-2 text-slate-700">
                                    <li>
                                        <span className="text-slate-500">레이아웃: </span>
                                        <b>{layoutLabel(layout)}</b>
                                    </li>
                                    <li>
                                        <span className="text-slate-500">해상도: </span>
                                        <b>{resolution}</b>
                                    </li>
                                    {layout === "switching" ? (
                                        <li>
                                            <span className="text-slate-500">카메라(전환): </span>
                                            <b>{switchCams.join(", ")}</b>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className="text-slate-500">카메라: </span>
                                            <b>{deviceCam}</b>
                                        </li>
                                    )}
                                    <li>
                                        <span className="text-slate-500">마이크: </span>
                                        <b>{deviceMic}</b>
                                    </li>
                                    {layout === "pip" && (
                                        <li>
                                            <span className="text-slate-500">PiP 구성: </span>
                                            <b>메인 {pipMain} / 서브 {pipSub}</b>
                                        </li>
                                    )}
                                </ul>
                                <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
                                    * 퍼블리싱 단계: 실제 스트림 연결/오디오 레벨/네트워크 지표는 연동 후 표시됩니다.
                                </div>
                            </div>
                        </div>
                    </CollapseCard>

                    <NavButtons
                        leftLabel="이전"
                        rightLabel="시작"
                        onLeft={() => setStep(1)}
                        onRight={handleStart}
                        rightIcon={<Power size={16} />}
                    />
                </div>
            )}

            {/* 게이지 반짝 효과 */}
            <style>{`
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: translateX(-100%);
          animation: shimmerMove 1.8s infinite;
        }
      `}</style>
        </div>
    );
}

function LayoutCard({
    active,
    title,
    icon,
    onClick,
}: {
    active: boolean;
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "h-28 w-full rounded-lg border p-4 text-left transition-colors",
                active ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50",
            ].join(" ")}
        >
            <div className="mb-2 flex items-center gap-2 text-slate-700">
                {icon}
                <div className="text-sm font-semibold text-slate-900">{title}</div>
            </div>
            <div className="h-3 w-1/2 rounded bg-slate-100" />
            <div className="mt-1 h-3 w-2/3 rounded bg-slate-100" />
        </button>
    );
}

function MultiPicker({
    values,
    options,
    onChange,
    note,
}: {
    values: string[];
    options: string[];
    onChange: (v: string[]) => void;
    note?: string;
}) {
    const toggle = (v: string) => {
        if (values.includes(v)) onChange(values.filter((x) => x !== v));
        else onChange([...values, v]);
    };
    return (
        <div className="rounded border border-gray-300 bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-2">
                {options.map((o) => (
                    <button
                        key={o}
                        type="button"
                        onClick={() => toggle(o)}
                        className={[
                            "rounded border px-2 py-1 text-xs",
                            values.includes(o)
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50",
                        ].join(" ")}
                    >
                        {o}
                    </button>
                ))}
            </div>
            {note && <p className="text-xs text-slate-500">{note}</p>}
        </div>
    );
}

function NavButtons({
    leftLabel,
    rightLabel,
    onLeft,
    onRight,
    leftDisabled,
    rightDisabled,
    rightIcon,
}: {
    leftLabel: string;
    rightLabel: string;
    onLeft: () => void;
    onRight: () => void;
    leftDisabled?: boolean;
    rightDisabled?: boolean;
    rightIcon?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={onLeft}
                disabled={leftDisabled}
                className={[
                    "inline-flex items-center gap-2 rounded border px-3 py-2 text-sm",
                    leftDisabled
                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                        : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50",
                ].join(" ")}
            >
                <ChevronLeft size={16} />
                {leftLabel}
            </button>
            <button
                type="button"
                onClick={onRight}
                disabled={rightDisabled}
                className={[
                    "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white",
                    rightDisabled ? "cursor-not-allowed bg-emerald-300" : "bg-emerald-600 hover:bg-emerald-700",
                ].join(" ")}
            >
                {rightLabel}
                {rightIcon ?? <ChevronRight size={16} />}
            </button>
        </div>
    );
}

function layoutLabel(m: LayoutMode) {
    if (m === "single") return "단일 카메라";
    if (m === "switching") return "다중 카메라(스위칭)";
    return "PiP(분할)";
}
