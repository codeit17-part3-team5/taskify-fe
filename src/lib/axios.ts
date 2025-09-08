import axios, { AxiosHeaders } from "axios";

export const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/17-5",
});

export default instance;
