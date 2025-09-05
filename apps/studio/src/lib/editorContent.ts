// TipTap JSON 또는 HTML 기준으로 "작성 여부"를 판정하는 유틸

// --- HTML 판정 ---
export function isWrittenFromHTML(html: string): boolean {
    if (!html) return false;

    // 1) 태그 제거 후 순수 텍스트 길이 체크
    const textOnly = html
        .replace(/<!--[\s\S]*?-->/g, "") // 주석 제거
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/<[^>]+>/g, "")
        .trim();

    if (textOnly.length > 0) return true;

    // 2) 의미 있는 비텍스트 요소가 있는지 검사
    const meaningfulTag = /<(img|table|thead|tbody|tr|td|th|hr|blockquote|ul|ol|li|h[1-6]|pre|code|figure|video|audio|iframe|embed|canvas)\b/i;
    return meaningfulTag.test(html);
}

// --- JSON 판정 ---
type JSONNode = {
    type?: string;
    text?: string;
    content?: JSONNode[];
    marks?: any[];
    attrs?: Record<string, any>;
};

export function isWrittenFromJSON(doc: JSONNode | null | undefined): boolean {
    if (!doc) return false;

    const hasMeaning = (node: JSONNode): boolean => {
        if (!node) return false;

        // 텍스트 노드: 공백 외 문자가 하나라도 있으면 true
        if (node.type === "text") {
            return (node.text ?? "").trim().length > 0;
        }

        // 의미 있는 블록/인라인들
        const meaningfulTypes = new Set([
            "image",
            "table",
            "tableRow",
            "tableCell",
            "tableHeader",
            "horizontalRule",
            "blockquote",
            "bulletList",
            "orderedList",
            "listItem",
            "heading",
            "codeBlock",
            "figure",   // 커스텀 쓸 경우 대비
            "video",    // 커스텀 쓸 경우 대비
            "audio",    // 커스텀 쓸 경우 대비
        ]);

        if (node.type && meaningfulTypes.has(node.type)) return true;

        // paragraph는 텍스트가 비어있으면 의미 없음 → 하위 탐색
        if (node.content?.length) {
            for (const child of node.content) {
                if (hasMeaning(child)) return true;
            }
        }
        return false;
    };

    return hasMeaning(doc);
}
