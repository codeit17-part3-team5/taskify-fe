import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
        if (token) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          set({ accessToken: token, isAuthenticated: true });
        } else {
          delete axios.defaults.headers.common.Authorization;
          set({ accessToken: null, isAuthenticated: false });
        }
      },

      login: async ({ email, password }) => {
        console.log(email, password);
        try {
          const { data } = await axios.post<LoginResponse>("/auth/login", {
            email,
            password,
          });

          if (data.accessToken) {
            if (data?.accessToken && data?.user) {
              get().setAccessToken(data.accessToken);
              set({ user: data.user });
            } else {
              throw new Error("잘못된 로그인 응답입니다.");
            }
          } else {
            alert("로그인에 실패했습니다.");
          }
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
        get().setAccessToken(null);
        set({ user: null });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        accessToken: s.accessToken,
        user: s.user,
        isAuthenticated: s.isAuthenticated,
      }),
    }
  )
);
