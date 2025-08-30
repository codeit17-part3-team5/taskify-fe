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
