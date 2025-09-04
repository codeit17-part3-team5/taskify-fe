import api from "./axios";
import {
  ListInvitationsQuery,
  ListInvitationsResponse,
  RespondInvitationDto,
  Invitation,
} from "./types";

// 내가 받은 초대 목록 조회
export const listMyInvitation = async (
  params?: ListInvitationsQuery
): Promise<ListInvitationsResponse> => {
  const { data } = await api.get<ListInvitationsResponse>("/invitations", {
    params,
  });
  return data;
};

// 초대 응답
export const respondInvitation = async (
  invitatioId: number,
  payload: RespondInvitationDto
): Promise<Invitation> => {
  const { data } = await api.put<Invitation>(
    `/invitations/${invitatioId}`,
    payload
  );
  return data;
};
