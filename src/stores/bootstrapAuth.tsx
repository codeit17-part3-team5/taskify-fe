import axios from "@/lib/axios";
import { useTokenStore } from "@/stores/token";

export function bootstrapAuth() {
  const { accessToken } = useTokenStore.getState();
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  useTokenStore.subscribe((s) => {
    if (s.accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${s.accessToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  });
}
