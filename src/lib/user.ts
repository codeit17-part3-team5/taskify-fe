import instance from "./axios";

export type MeResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export async function getMe(): Promise<MeResponse> {
  const { data } = await instance.get<MeResponse>("/users/me");
  return data;
}

export async function updateMe(payload: {
  nickname: string;
  profileImageUrl: string;
}) {
  const { data } = await instance.put("/users/me", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
