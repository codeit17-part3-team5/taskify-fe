import axios, { AxiosHeaders } from "axios";

const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/17-5",
  headers: new AxiosHeaders({ Accept: "application/json" }),
});

instance.interceptors.request.use((config) => {
  if (!config.headers) config.headers = new AxiosHeaders();
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null;

  const headers = config.headers as AxiosHeaders;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete?.("Authorization");
  }
  return config;
});

export default instance;
