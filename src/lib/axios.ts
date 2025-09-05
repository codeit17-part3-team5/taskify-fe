import axios from "axios";

const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/17-5",
});

export default instance;
