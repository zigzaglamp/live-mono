// src/pages/products/ProductDescriptionEditorPage.tsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table, TableView } from "@tiptap/extension-table";
import { Extension } from "@tiptap/core";
import { isWrittenFromHTML, isWrittenFromJSON } from "@/lib/editorContent";
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import FontFamily from "@tiptap/extension-font-family";
import Mention from "@tiptap/extension-mention";
import "@/styles/editor.css";

/* lucide-react 아이콘 */
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List as BulletList, ListOrdered, Quote, Minus,
    IndentIncrease, IndentDecrease,
    Table as TableIcon, Rows, Columns, PlusSquare, Trash2,
    PenLine, Highlighter, PenTool, LayoutGrid
} from "lucide-react";

/* ===== TipTap Commands 타입 보강: indent / outdent 등록 ===== */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        indentClass: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

/* ------------------------ 커스텀 들여쓰기/내어쓰기 ------------------------ */
const MAX = 8;

export const IndentClass = Extension.create({
    name: "indentClass",

    addGlobalAttributes() {
        return [
            {
                types: ["paragraph", "heading"],
                attributes: {
                    class: {
                        default: null,
                        renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
                        parseHTML: (el) => ({ class: el.getAttribute("class") }),
                    },
                },
            },
        ];
    },

    addCommands() {
        const clamp = (n: number) => Math.max(0, Math.min(MAX, n));

        const currentBlockType = (editor: any): "paragraph" | "heading" | null => {
            const name = editor.state.selection.$from.parent.type.name;
            return name === "paragraph" || name === "heading" ? name : null;
        };

        const readClass = (editor: any, type: "paragraph" | "heading"): string => {
            const v = editor.getAttributes(type)?.class;
            if (typeof v === "string") return v;
            if (Array.isArray(v)) return v.filter(Boolean).join(" ");
            return "";
        };

        const getLevel = (editor: any, type: "paragraph" | "heading") => {
            const cls = readClass(editor, type);
            const m = cls.match(/(?:^|\s)indent-(\d+)/);
            return m ? parseInt(m[1], 10) : 0;
        };

        return {
            indent:
                () =>
                    ({ editor, commands }) => {
                        if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
                            return commands.sinkListItem("listItem");
                        }
                        const t = currentBlockType(editor);
                        if (!t) return false;

                        const cur = getLevel(editor, t);
                        const next = clamp(cur + 1);

                        const prev = readClass(editor, t);
                        const cleaned = prev.replace(/(^|\s)indent-\d+/g, "").trim();
                        const nextClass = next > 0 ? `${cleaned} indent-${next}`.trim() : null;

                        return commands.updateAttributes(t, { class: nextClass });
                    },

            outdent:
                () =>
                    ({ editor, commands }) => {
                        if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
                            return commands.liftListItem("listItem");
                        }
                        const t = currentBlockType(editor);
                        if (!t) return false;

                        const cur = getLevel(editor, t);
                        const next = clamp(cur - 1);

                        const prev = readClass(editor, t);
                        const cleaned = prev.replace(/(^|\s)indent-\d+/g, "").trim();
                        const nextClass = next > 0 ? `${cleaned} indent-${next}`.trim() : null;

                        return commands.updateAttributes(t, { class: nextClass });
                    },
        };
    },
});

/* ---------------------------- 멘션 ---------------------------- */
type MentionItem = { id: string; label: string };

const mentionItems: MentionItem[] = [
    { id: "배송", label: "배송" },
    { id: "교환", label: "교환" },
    { id: "반품", label: "반품" },
    { id: "쿠폰", label: "쿠폰" },
    { id: "사이즈", label: "사이즈" },
];

const mentionExt = Mention.configure({
    HTMLAttributes: { class: "mention" },
    suggestion: {
        char: "@",
        items: ({ query }) =>
            mentionItems
                .filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 8),
        render() {
            let el: HTMLDivElement;
            let selectedIndex = -1;
            let curItems: MentionItem[] = [];
            let doCommand: ((props: any) => void) | null = null;

            const select = (index: number) => {
                if (!doCommand || !curItems.length) return;
                const safe = Math.max(0, Math.min(index, curItems.length - 1));
                const item = curItems[safe];
                if (!item) return;
                doCommand({ id: item.id, label: item.label });
            };

            const place = (clientRect?: (() => DOMRect | null)) => {
                const rect = clientRect?.();
                if (!rect) return;
                el.style.position = "absolute";
                el.style.left = `${rect.left}px`;
                el.style.top = `${rect.bottom + 6}px`;
                el.style.minWidth = `${Math.max(160, rect.width)}px`;
                el.style.zIndex = "9999";
            };

            const installPointerHandler = () => {
                const handler = (e: PointerEvent) => {
                    const target = (e.target as HTMLElement)?.closest("button[data-index]") as HTMLButtonElement | null;
                    if (!target) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const idx = Number(target.dataset.index);
                    select(idx);
                };
                el.addEventListener("pointerdown", handler, { capture: true });
                return () => el.removeEventListener("pointerdown", handler, { capture: true } as any);
            };

            let cleanupPointer: (() => void) | null = null;

            const renderList = () => {
                el.innerHTML = curItems
                    .map(
                        (it, i) => `
            <button type="button" data-index="${i}"
              class="tiptap-mention-item ${i === selectedIndex ? "is-active" : ""}">
              ${it.label}
            </button>`,
                    )
                    .join("");
            };

            return {
                onStart: (props: any) => {
                    curItems = props.items as MentionItem[];
                    selectedIndex = -1;
                    doCommand = props.command;
                    el = document.createElement("div");
                    el.className = "tiptap-mention-list";
                    document.body.appendChild(el);
                    renderList();
                    place(props.clientRect ?? undefined);
                    cleanupPointer = installPointerHandler();
                },
                onUpdate: (props: any) => {
                    curItems = props.items as MentionItem[];
                    doCommand = props.command;
                    if (selectedIndex >= curItems.length) selectedIndex = -1;
                    renderList();
                    place(props.clientRect ?? undefined);
                },
                onKeyDown: (props: any) => {
                    const { event } = props;
                    if (!curItems.length) return false;

                    if (event.key === "ArrowDown") {
                        event.preventDefault();
                        selectedIndex = (selectedIndex + 1 + curItems.length) % curItems.length;
                        renderList();
                        return true;
                    }
                    if (event.key === "ArrowUp") {
                        event.preventDefault();
                        selectedIndex =
                            selectedIndex === -1 ? curItems.length - 1 : (selectedIndex - 1 + curItems.length) % curItems.length;
                        renderList();
                        return true;
                    }
                    if (event.key === "Enter") {
                        event.preventDefault();
                        event.stopPropagation();
                        select(selectedIndex === -1 ? 0 : selectedIndex);
                        return true;
                    }
                    if (event.key === "Escape") {
                        event.preventDefault();
                        doCommand?.(null);
                        return true;
                    }
                    return false;
                },
                onExit: () => {
                    cleanupPointer?.();
                    el?.remove();
                    doCommand = null;
                },
            };
        },
    },
});

/* ------------------------------ Table 확장 (class/width 허용) ------------------------------ */
/* Table 확장: align/class/style/width 지원 + NodeView에서 DOM에 반영 */
const TableX = Table.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: el => el.getAttribute('class'),
                renderHTML: attrs => (attrs.class ? { class: attrs.class } : {}),
            },
            style: {
                default: null,
                parseHTML: el => el.getAttribute('style'),
                renderHTML: attrs => (attrs.style ? { style: attrs.style } : {}),
            },
            width: {
                default: null,
                parseHTML: el => {
                    const style = el.getAttribute('style') || '';
                    const m = style.match(/width:\s*([^;]+)/i);
                    return m ? m[1].trim() : null;
                },
                renderHTML: attrs => (attrs.width ? { style: `width:${attrs.width}` } : {}),
            },
            align: {
                default: null as 'center' | null,
                parseHTML: el => {
                    const wrapper = el.closest('.tableWrapper');
                    return wrapper?.classList.contains('is-center') ? 'center' : null;
                },
                renderHTML: () => ({}),
            },
        };
    },

    addNodeView() {
        return ({ node }: { node: ProseMirrorNode }) => {
            // 두 개의 인자만 전달 (node, cellMinWidth)
            const tv = new TableView(node, 0);

            const applyAttrs = (n: ProseMirrorNode) => {
                tv.dom.classList.toggle('is-center', n.attrs.align === 'center');

                const tableEl = tv.dom.querySelector('table') as HTMLTableElement | null;
                if (!tableEl) return;

                if (n.attrs.class) tableEl.setAttribute('class', n.attrs.class);
                else tableEl.removeAttribute('class');

                if (n.attrs.style) tableEl.setAttribute('style', n.attrs.style);
                else tableEl.removeAttribute('style');

                if (n.attrs.width) {
                    const cur = tableEl.getAttribute('style') || '';
                    const cleaned = cur
                        .replace(/(^|;)\s*width\s*:\s*[^;]+;?/gi, '')
                        .replace(/;;+/g, ';')
                        .replace(/^;|;$/g, '');
                    tableEl.setAttribute('style', (cleaned ? cleaned + ';' : '') + `width:${n.attrs.width}`);
                }
            };

            applyAttrs(node);

            return {
                dom: tv.dom,
                contentDOM: tv.contentDOM,
                update(updatedNode) {
                    if (updatedNode.type.name !== 'table') return false;
                    tv.update?.(updatedNode as any);
                    applyAttrs(updatedNode);
                    return true;
                },
                ignoreMutation: (...args: any[]) =>
                    (tv as any).ignoreMutation ? (tv as any).ignoreMutation(...args) : false,
                // 타입스크립트에는 정의 안 돼 있어서 안전하게 any 캐스팅
                selectNode: (tv as any).selectNode?.bind(tv),
                deselectNode: (tv as any).deselectNode?.bind(tv),
                stopEvent: (tv as any).stopEvent?.bind(tv),
                destroy: (tv as any).destroy?.bind(tv),
            };
        };
    },
});

/* ------------------------------ 초안 로딩 ------------------------------ */
const DRAFT_KEY = "product:desc:draft";
type DraftPayload = {
    html: string;
    json: any;
    updatedAt: string;
    counts: { chars: number; words: number };
    isWritten?: boolean;
};
function loadDraft(): DraftPayload | null {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        return raw ? (JSON.parse(raw) as DraftPayload) : null;
    } catch {
        return null;
    }
}

export default function ProductDescriptionEditorPage() {
    const draft = useMemo(() => loadDraft(), []);
    const initialHTML = draft?.html ?? "";

    const [saving, setSaving] = useState(false);
    const [font, setFont] = useState<string>("");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ bulletList: { keepMarks: true }, orderedList: { keepMarks: true } }),
            Placeholder.configure({ placeholder: "내용을 입력하세요." }),
            Highlight.configure({ multicolor: true }),
            TextStyle,
            Color,
            FontFamily,
            Subscript,
            Superscript,
            Typography,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TableX.configure({
                resizable: true,
                lastColumnResizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            CharacterCount.configure(),
            IndentClass,
            mentionExt,
        ],
        content: initialHTML || "<p></p>",
        autofocus: "start",
        editorProps: {
            attributes: { class: "tiptap prose-sm max-w-none focus:outline-none" },
            handleKeyDown(view, event) {
                if (event.key === "Tab") {
                    event.preventDefault();
                    const inList = editor?.isActive("bulletList") || editor?.isActive("orderedList");
                    if (inList) {
                        if (event.shiftKey) editor?.chain().focus().liftListItem("listItem").run();
                        else editor?.chain().focus().sinkListItem("listItem").run();
                        return true;
                    }
                    if (event.shiftKey) editor?.chain().focus().outdent().run();
                    else editor?.chain().focus().indent().run();
                    return true;
                }
                return false;
            },
        },
    });

    useEffect(() => {
        if (!editor) return;
        if (typeof initialHTML === "string" && initialHTML.length > 0) {
            editor.commands.setContent(initialHTML, { emitUpdate: false });
        }
    }, [editor, initialHTML]);

    useEffect(() => {
        if (!editor) return;
        const syncFont = () => {
            const cur = (editor.getAttributes("textStyle")?.fontFamily as string) || "";
            setFont(cur);
        };
        editor.on("selectionUpdate", syncFont);
        editor.on("transaction", syncFont);
        syncFont();
        return () => {
            editor.off("selectionUpdate", syncFont);
            editor.off("transaction", syncFont);
        };
    }, [editor]);

    const onChangeFont = (v: string) => {
        setFont(v);
        editor?.chain().focus().setFontFamily(v).run();
    };

    const handleSaveAndClose = useCallback(() => {
        if (!editor) return;
        setSaving(true);
        const html = editor.getHTML();
        const json = editor.getJSON();
        const chars = (editor.storage.characterCount?.characters?.() as number) ?? 0;
        const words = (editor.storage.characterCount?.words?.() as number) ?? 0;
        const written = isWrittenFromJSON(json as any) || isWrittenFromHTML(html);
        const payload: DraftPayload = {
            html,
            json,
            updatedAt: new Date().toISOString(),
            counts: { chars, words }, // 화면에서는 숨기지만 로직은 유지
            isWritten: written,
        };
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
            window.close();
        } finally {
            setSaving(false);
        }
    }, [editor]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                handleSaveAndClose();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleSaveAndClose]);

    /* ---------- UI Components ---------- */
    const IconBtn: React.FC<
        React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; title?: string }
    > = ({ active, className, ...props }) => (
        <button
            type="button"
            {...props}
            className={["ne-btn", active ? "is-active" : "", className || ""].join(" ")}
        />
    );

    const ToolbarGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className="ne-group">{children}</div>
    );

    const Divider = () => <span className="ne-divider" />;

    const setColor = (c: string) => editor?.chain().focus().setColor(c).run();

    const setHighlight = (c: string) => editor?.chain().focus().toggleHighlight({ color: c }).run();

    /* 표 중앙/꽉채우기 도움 함수 (원하면 버튼에 연결) */
    const centerTable = () =>
        editor?.chain().focus().updateAttributes('table', { align: 'center', width: 'auto' }).run();

    const stretchTable = () =>
        editor?.chain().focus().updateAttributes('table', { align: null, width: '100%' }).run();

    // 버튼 핸들러
    const toggleTableCenter = () => {
        const attrs = editor?.getAttributes('table') || {};
        const nextAlign = attrs.align === 'center' ? null : 'center';

        editor
            ?.chain()
            .focus()
            .updateAttributes('table', { align: nextAlign }) // width는 건드릴 필요 없음
            .run();
    };

    return (
        <div className="ne-page">
            {/* 헤더 (좌 로고 / 우 저장·등록) */}
            <header className="ne-header">
                <div className="ne-header__inner">
                    <div className="ne-logo">
                        <PenLine size={16} />
                        <span>스튜디오</span>
                    </div>

                    {/* 액션: 목록 / 저장 / 등록 (동일 너비) */}
                    <div className="ne-actions ne-actions--triple">
                        <button type="button" className="ne-btn3 ne-btn3--primary" aria-haspopup="menu" title="저장 목록">
                            <span className="ne-btn3__label">목록</span>
                        </button>

                        <button type="button" className="ne-btn3 ne-btn3--primary" onClick={handleSaveAndClose} disabled={saving}>
                            <span className="ne-btn3__label">{saving ? "저장 중…" : "저장"}</span>
                        </button>

                        <button type="button" className="ne-btn3 ne-btn3--primary">
                            <span className="ne-btn3__label">등록</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* 상단 툴바 (좌측 정렬, 풀폭) */}
            <div className="ne-toolbar">
                <div className="ne-toolbar__inner">
                    <ToolbarGroup>
                        <IconBtn title="굵게" onClick={() => editor?.chain().focus().toggleBold().run()} active={!!editor?.isActive("bold")}>
                            <Bold size={16} />
                        </IconBtn>
                        <IconBtn title="기울임" onClick={() => editor?.chain().focus().toggleItalic().run()} active={!!editor?.isActive("italic")}>
                            <Italic size={16} />
                        </IconBtn>
                        <IconBtn title="밑줄" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={!!editor?.isActive("underline")}>
                            <UnderlineIcon size={16} />
                        </IconBtn>
                        <IconBtn title="취소선" onClick={() => editor?.chain().focus().toggleStrike().run()} active={!!editor?.isActive("strike")}>
                            <Strikethrough size={16} />
                        </IconBtn>

                        <Divider />

                        <select className="ne-select" onChange={(e) => onChangeFont(e.target.value)} value={font} title="글꼴">
                            <option value="Paperlogy">기본폰트</option>
                            <option value="Pretendard">Pretendard</option>
                            <option value="system-ui">System</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Monospace</option>
                        </select>

                        <div className="ne-chip" title="글자색">
                            <PenTool size={14} />
                            <input type="color" onChange={(e) => setColor(e.target.value)} />
                        </div>

                        <div className="ne-chip" title="형광펜">
                            <Highlighter size={14} />
                            <input type="color" onChange={(e) => setHighlight(e.target.value)} />
                        </div>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <IconBtn title="왼쪽 정렬" onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={!!editor?.isActive({ textAlign: "left" })}>
                            <AlignLeft size={16} />
                        </IconBtn>
                        <IconBtn title="가운데 정렬" onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={!!editor?.isActive({ textAlign: "center" })}>
                            <AlignCenter size={16} />
                        </IconBtn>
                        <IconBtn title="오른쪽 정렬" onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={!!editor?.isActive({ textAlign: "right" })}>
                            <AlignRight size={16} />
                        </IconBtn>
                        <IconBtn title="양쪽 정렬" onClick={() => editor?.chain().focus().setTextAlign("justify").run()} active={!!editor?.isActive({ textAlign: "justify" })}>
                            <AlignJustify size={16} />
                        </IconBtn>

                        <Divider />

                        <IconBtn title="글머리표 목록" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={!!editor?.isActive("bulletList")}>
                            <BulletList size={16} />
                        </IconBtn>
                        <IconBtn title="번호 목록" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={!!editor?.isActive("orderedList")}>
                            <ListOrdered size={16} />
                        </IconBtn>

                        <Divider />

                        <IconBtn title="구분선" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                            <Minus size={16} />
                        </IconBtn>
                        <IconBtn title="인용" onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={!!editor?.isActive("blockquote")}>
                            <Quote size={16} />
                        </IconBtn>

                        <Divider />

                        <IconBtn title="들여쓰기" onClick={() => editor?.chain().focus().indent().run()}>
                            <IndentIncrease size={16} />
                        </IconBtn>
                        <IconBtn title="내어쓰기" onClick={() => editor?.chain().focus().outdent().run()}>
                            <IndentDecrease size={16} />
                        </IconBtn>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <IconBtn title="표 삽입" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                            <TableIcon size={16} />
                        </IconBtn>
                        <IconBtn title="표 중앙" onClick={toggleTableCenter}>
                            <LayoutGrid size={16} />
                        </IconBtn>
                        {/* (선택) 꽉 채우기 */}
                        {/* <IconBtn title="표 100% 폭" onClick={stretchTable}>
                            <TableIcon size={16} />
                            </IconBtn> */}
                        <IconBtn title="행 앞 추가" onClick={() => editor?.chain().focus().addRowBefore().run()}>
                            <Rows size={16} />
                        </IconBtn>
                        <IconBtn title="행 뒤 추가" onClick={() => editor?.chain().focus().addRowAfter().run()}>
                            <PlusSquare size={16} />
                        </IconBtn>
                        <IconBtn title="행 삭제" onClick={() => editor?.chain().focus().deleteRow().run()}>
                            <Trash2 size={16} />
                        </IconBtn>

                        <Divider />

                        <IconBtn title="열 앞 추가" onClick={() => editor?.chain().focus().addColumnBefore().run()}>
                            <Columns size={16} />
                        </IconBtn>
                        <IconBtn title="열 뒤 추가" onClick={() => editor?.chain().focus().addColumnAfter().run()}>
                            <PlusSquare size={16} />
                        </IconBtn>
                        <IconBtn title="열 삭제" onClick={() => editor?.chain().focus().deleteColumn().run()}>
                            <Trash2 size={16} />
                        </IconBtn>

                        <Divider />

                        <IconBtn title="표 삭제" onClick={() => editor?.chain().focus().deleteTable().run()}>
                            <Trash2 size={16} />
                        </IconBtn>
                    </ToolbarGroup>
                </div>
            </div>

            {/* 에디터 영역 (풀폭, 라운딩 제거) */}
            <main className="ne-editor">
                <div className="ne-editor__paper">
                    <EditorContent editor={editor} />
                </div>
            </main>
        </div>
    );
}
