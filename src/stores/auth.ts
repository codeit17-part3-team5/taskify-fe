import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTokenStore } from "./token";
import axios from "../lib/axios";

type User = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
};

type LoginResponse = {
  accessToken: string;
  user: User;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (p: { email: string; password: string }) => Promise<void>;
  signup: (p: {
    email: string;
    password: string;
    nickname: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
  setAccessToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,

      setUser: (user) => set({ user }),
      setAccessToken: (token) => {
        // if (token) {
        //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        //   set({ accessToken: token, isAuthenticated: true });
        // } else {
        //   delete axios.defaults.headers.common.Authorization;
        //   set({ accessToken: null, isAuthenticated: false });
        // }
        set({ accessToken: token });
      },

      login: async ({ email, password }) => {
        console.log(email, password);
        try {
          const { data } = await axios.post<LoginResponse>("/auth/login", {
            email,
            password,
          });
          console.log(
            "[LOGIN] resp.accessToken:",
            data.accessToken?.slice?.(0, 10)
          );

          if (!data?.accessToken || !data?.user) {
            throw new Error("잘못된 로그인 응답입니다.");
          }

          useTokenStore.getState().setAccessToken(data.accessToken);
          console.log(
            "[LOGIN] after set accessToken:",
            useTokenStore.getState().accessToken?.slice(0, 10)
          );
          set({ user: data.user, isAuthenticated: true });
        } catch (err) {
          console.error("로그인 실패: ", err);
          throw err;
        }
      },

      signup: async ({ email, password, nickname }) => {
        try {
          const response = await axios.post("/users", {
            email: email,
            password: password,
            nickname: nickname,
          });

          const { data, status, headers } = response;

          if (data?.success === true) {
            return;
          }

          if (status === 201) {
            return;
          }

          throw new Error(data?.message ?? "회원가입에 실패했습니다.");
        } catch (err) {
          console.error("회원가입 실패: ", err);
          throw err;
        }
      },

      logout: async () => {
        useTokenStore.getState().clear();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ isAuthenticated: s.isAuthenticated }),
    }
  )
);
