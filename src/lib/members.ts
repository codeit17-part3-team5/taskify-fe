import instance from "./axios";
import { ListMembersQuery, ListMembersResponse } from "./types";

// 대시보드 멤버 목록 조회
export const listMembers = async (
  params: ListMembersQuery
): Promise<ListMembersResponse> => {
  const { data } = await instance.get<ListMembersResponse>("/members", {
    params,
  });
  return data;
};

// 대시보드 멤버 삭제
export const removeMember = async (memberId: number): Promise<void> => {
  await instance.delete(`/members.${memberId}`);
};
