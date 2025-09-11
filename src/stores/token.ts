import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TokenState = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  clear: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (t) => set({ accessToken: t }),
      clear: () => set({ accessToken: null }),
    }),
    {
      name: "token", // localStorage 키
      storage: createJSONStorage(() => localStorage), // 또는 sessionStorage
      // 필요한 값만 저장하고 싶으면:
      // partialize: (s) => ({ accessToken: s.accessToken }),
    }
  )
);
