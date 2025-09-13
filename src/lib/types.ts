export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export type CreateDashboardDto = {
  title: string;
  color: string;
};

export type UpdateDashboardDto = {
  title?: string;
  color?: string;
};

export type DashboardListResponse = {
  cursorId?: number;
  totalCount: number;
  dashboards: Dashboard[];
};

export type CreateInvitationDto = {
  email: string;
};

export type InvitationListResponse = {
  totalCount: number;
  invitations: Invitation[];
};

export type InvitationUserLite = {
  id: number;
  nickname: string;
  email: string;
};

export type InvitationDashboardLite = {
  id: number;
  title: string;
};

export type Invitation = {
  id: number;
  inviter: InvitationUserLite;
  invitee: InvitationUserLite;
  dashboard: InvitationDashboardLite;
  teamId: string;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListInvitationsQuery = {
  size?: number;
  cursorId?: number;
  title?: string;
};

export type ListInvitationsResponse = {
  cursorId?: number;
  invitations: Invitation[];
};

export type RespondInvitationDto = {
  inviteAccepted: boolean;
};

export type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type ListMembersQuery = {
  page?: number;
  size?: number;
  dashboardId: number;
};

export type ListMembersResponse = {
  members: Member[];
  totalCount: number;
};

export type DashboardsApiResponse = {
  dashboards: Array<{ id: number; title: string }>;
  totalCount: number;
  cursorId: number | null;
};
