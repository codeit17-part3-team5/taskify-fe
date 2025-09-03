export const COLOR_DOTS = {
  green: "#22C55E",
  purple: "#8B5CF6",
  orange: "#F59E0B",
  blue: "#3B82F6",
  pink: "#EC4899",
  gray: "#9CA3AF",
} as const;

export type DotColor = keyof typeof COLOR_DOTS;

export type DashboardCard = {
  id: string;
  title: string;
  dot: DotColor;
  isOwnerCrown?: boolean;
  href?: string;
};
