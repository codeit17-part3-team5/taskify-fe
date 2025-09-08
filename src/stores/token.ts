import { create } from "zustand";

type TokenState = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  clear: () => void;
};

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  setAccessToken: (t) => set({ accessToken: t }),
  clear: () => set({ accessToken: null }),
}));
