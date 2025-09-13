import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTokenStore } from "./token";
import axios from "../lib/axios";
import { isAxiosError, AxiosError } from "axios";

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
        } catch (err: unknown) {
          if (isAxiosError<{ message?: string }>(err)) {
            const s = err.response?.status;
            const msg = err.response?.data?.message;

            throw new Error(
              msg ??
                (s === 400
                  ? "요청 형식이 올바르지 않습니다."
                  : s === 401
                  ? "이메일 또는 비밀번호가 올바르지 않습니다."
                  : s && s >= 500
                  ? "서버 오류입니다. 잠시 후 다시 시도해 주세요."
                  : !err.response
                  ? "네트워크 오류입니다. 인터넷 연결을 확인해 주세요."
                  : "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.")
            );
          }
          if (err instanceof Error) throw err;
          throw new Error("알 수 없는 로그인 오류가 발생했습니다.");
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
