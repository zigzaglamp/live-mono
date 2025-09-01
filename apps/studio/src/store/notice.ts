// src/store/notice.ts

import { create } from "zustand";


interface NoticeState {
    notices: string[];
    push: (msg: string) => void;
    clear: () => void;
}


export const useNoticeStore = create<NoticeState>((set) => ({
    notices: [
        "[알림] 최대 90만원 상당 혜택 ✨ 스토어 그로스 프로그램 10기 참가자를 모집합니다 😊 2025.08.27.",
    ],
    push: (msg) => set((s) => ({ notices: [msg, ...s.notices] })),
    clear: () => set({ notices: [] }),
}));