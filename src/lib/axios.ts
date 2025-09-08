import { useTokenStore } from "@/stores/token";
import axios, { AxiosHeaders } from "axios";

export const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/17-5",
});

instance.interceptors.request.use((config) => {
  const token = useTokenStore.getState().accessToken;
  const headers = (config.headers ?? new AxiosHeaders()) as AxiosHeaders;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete("Authorization");
  }

  config.headers = headers;
  return config;
});

export default instance;
