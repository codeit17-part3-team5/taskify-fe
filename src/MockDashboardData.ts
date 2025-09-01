// 카드/사이드바 색 점표시용 팔레트
export const COLOR_DOTS = {
  green: '#22C55E',
  purple: '#8B5CF6',
  orange: '#F59E0B',
  blue: '#3B82F6',
  pink: '#EC4899',
  gray: '#9CA3AF',
} as const;

export type DotColor = keyof typeof COLOR_DOTS;

export type DashboardCard = {
  id: string;
  title: string;
  dot: DotColor;
  isOwnerCrown?: boolean; // 👑 표시 여부
  href?: string;
};

export type InviteRow = {
  id: string;
  name: string; // 대시보드 이름
  inviter: string; // 초대자
  status: 'pending' | 'accepted' | 'declined'; // 수락여부
};

export type SidebarItem = {
  id: string;
  title: string;
  dot: DotColor;
  isOwnerCrown?: boolean;
};

export type Member = {
  id: string;
  name: string;
  email?: string;
  avatarBg: string;
  initial: string;
  role?: 'owner' | 'admin' | 'member';
  joinedAt?: string;
};

export type Invite = {
  id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired' | 'canceled';
  invitedBy: string;
  sentAt: string;
  expiresAt?: string;
};

// 상단 카드(6칸 구성 예시)
export const DASHBOARD_CARDS: DashboardCard[] = [
  { id: 'vivridge', title: '비브리지', dot: 'green', isOwnerCrown: true },
  { id: 'codeit', title: '코드잇', dot: 'purple', isOwnerCrown: true },
  { id: 'q3plan', title: '3분기 계획', dot: 'orange' },
  { id: 'meeting', title: '회의록', dot: 'blue' },
  { id: 'important', title: '중요 문서함', dot: 'pink' },
];

// 사이드바 목록
export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 's-vivr', title: '비브리지', dot: 'green', isOwnerCrown: true },
  { id: 's-codeit', title: '코드잇', dot: 'purple', isOwnerCrown: true },
  { id: 's-q3', title: '3분기 계획', dot: 'orange' },
  { id: 's-meet', title: '회의록', dot: 'blue' },
  { id: 's-important', title: '중요 문서함', dot: 'pink' },
];

// 초대받은 대시보드 (테이블)
export const INVITED_DASHBOARDS: InviteRow[] = [
  { id: 'i-1', name: '프로젝트 디자인', inviter: '손동희', status: 'pending' },
  { id: 'i-2', name: '새로운 기획 문서', inviter: '안귀영', status: 'pending' },
  { id: 'i-3', name: '유닛 A', inviter: '장혁', status: 'pending' },
  { id: 'i-4', name: '유닛 B', inviter: '강나무', status: 'pending' },
  { id: 'i-5', name: '유닛 C', inviter: '김태현', status: 'pending' },
  { id: 'i-6', name: '유닛 D', inviter: '김태현', status: 'pending' },
];

// 페이지네이션(1페이지 예시)
export const INVITE_PAGINATION = {
  page: 1,
  pageSize: 6,
  total: INVITED_DASHBOARDS.length,
};

// 검색 헬퍼 (간단 포함 검색)
export function searchInvites(keyword: string): InviteRow[] {
  const q = keyword.trim();
  if (!q) return INVITED_DASHBOARDS;
  return INVITED_DASHBOARDS.filter(
    (row) => row.name.includes(q) || row.inviter.includes(q)
  );
}

/** 구성원: 이미지처럼 4명 예시 */
export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm-001',
    name: '정진성',
    email: 'jjseong@taskify.com',
    avatarBg: '#E9E2FF',
    initial: 'J',
    role: 'owner',
    joinedAt: '2024-12-01T09:00:00Z',
  },
  {
    id: 'm-002',
    name: '김태순',
    email: 'kts@taskify.com',
    avatarBg: '#C5E4FF',
    initial: 'K',
    role: 'member',
    joinedAt: '2025-01-03T08:30:00Z',
  },
  {
    id: 'm-003',
    name: '최주빈',
    email: 'cjb@taskify.com',
    avatarBg: '#FFE28A',
    initial: 'C',
    role: 'member',
    joinedAt: '2025-02-10T12:10:00Z',
  },
  {
    id: 'm-004',
    name: '오진혁',
    email: 'ojh@taskify.com',
    avatarBg: '#FBD0FF',
    initial: 'Y',
    role: 'member',
    joinedAt: '2025-03-02T14:45:00Z',
  },
];

/** 초대 내역: 대기중(pending) 위주로 5~6개 예시 */
export const MOCK_INVITES: Invite[] = [
  {
    id: 'i-101',
    email: 'credItA@codeit.com',
    status: 'pending',
    invitedBy: '정진성',
    sentAt: '2025-08-20T02:10:00Z',
    expiresAt: '2025-09-03T02:10:00Z',
  },
  {
    id: 'i-102',
    email: 'credItB@codeit.com',
    status: 'pending',
    invitedBy: '정진성',
    sentAt: '2025-08-20T02:15:00Z',
    expiresAt: '2025-09-03T02:15:00Z',
  },
  {
    id: 'i-103',
    email: 'credItC@codeit.com',
    status: 'pending',
    invitedBy: '김태순',
    sentAt: '2025-08-21T05:00:00Z',
    expiresAt: '2025-09-04T05:00:00Z',
  },
  {
    id: 'i-104',
    email: 'codeitD@codeit.com',
    status: 'pending',
    invitedBy: '김태순',
    sentAt: '2025-08-22T09:20:00Z',
    expiresAt: '2025-09-05T09:20:00Z',
  },
  {
    id: 'i-105',
    email: 'codeitE@codeit.com',
    status: 'pending',
    invitedBy: '최주빈',
    sentAt: '2025-08-22T09:25:00Z',
    expiresAt: '2025-09-05T09:25:00Z',
  },
  {
    id: 'i-106',
    email: 'codeitF@codeit.com',
    status: 'canceled',
    invitedBy: '오진혁',
    sentAt: '2025-08-10T10:00:00Z',
  },
];
