import instance from "./axios";
import {
  Dashboard,
  CreateDashboardDto,
  UpdateDashboardDto,
  DashboardListResponse,
  Invitation,
  CreateInvitationDto,
  InvitationListResponse,
} from "./types";

// 대시보드 생성
export const createDashboard = async (
  payload: CreateDashboardDto
): Promise<Dashboard> => {
  const { data } = await instance.post<Dashboard>("/dashboards", payload);
  return data;
};

// 대시보드 목록 조희
export const listDashboard = async (params: {
  navigationMethod: "infiniteScrool" | "pagination";
  cursorId?: number;
  page?: number;
  size?: number;
}): Promise<DashboardListResponse> => {
  const { data } = await instance.get<DashboardListResponse>("/dashboards", {
    params,
  });
  return data;
};

// 대시보드 상세 조회
export const getDashboard = async (dashboardId: number): Promise<Dashboard> => {
  const { data } = await instance.get<Dashboard>(`/dashboards/${dashboardId}`);
  return data;
};

// 대시보드 수정
export const updateDashboard = async (
  dashboardId: number,
  payload: UpdateDashboardDto
): Promise<Dashboard> => {
  const { data } = await instance.put<Dashboard>(
    `/dashboards/${dashboardId}`,
    payload
  );
  return data;
};

// 대시보드 삭제
export const deleteDashboard = async (dashboardId: number): Promise<void> => {
  await instance.delete(`/dashboards/${dashboardId}`);
};

// 대시보드 초대하기
export const inviteToDashboard = async (
  dashboardId: number,
  payload: CreateDashboardDto
): Promise<Invitation> => {
  const { data } = await instance.post<Invitation>(
    `/dashboards/${dashboardId}/invitations`,
    payload
  );
  return data;
};

// 대시보드 초대 목록 불러오기
export const listDashboardInvitations = async (
  dashboardId: number,
  params?: { page?: number; size?: number }
): Promise<InvitationListResponse> => {
  const { data } = await instance.get<InvitationListResponse>(
    `/dashboards/${dashboardId}/invitations`,
    { params }
  );
  return data;
};

// 대시보드 초대 취소
export const cancelInvitation = async (
  dashboardId: number,
  invitationId: number
): Promise<void> => {
  await instance.delete(
    `/dashboards/${dashboardId}/invitation/${invitationId}`
  );
};
