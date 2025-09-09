import { useState, useMemo, useEffect } from "react";
import ColorChipSection from "../ColorChipSection";
import { getDashboard, updateDashboard } from "@/lib/dashboard";
import type { Dashboard } from "@/lib/types";
import axios from "axios";

type DashboardEditSectionProps = {
  dashboardId: number;
};

export default function DashboardEditSection({
  dashboardId,
}: DashboardEditSectionProps) {
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [color, setColor] = useState<string>("");
  const [initial, setInitial] = useState<Pick<
    Dashboard,
    "title" | "color"
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setMessage(null);
      try {
        const data = await getDashboard(dashboardId);
        if (cancelled) return;
        setTitle(data.title);
        setEditTitle("");
        setColor(data.color);
        setInitial({ title: data.title, color: data.color });
      } catch (e: unknown) {
        if (cancelled) return;
        if (axios.isAxiosError(e)) {
          setError(
            e.response?.data?.message ??
              e.message ??
              "대시보드 정보를 불러오지 못했습니다."
          );
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("대시보드 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dashboardId]);

  const newTitle = useMemo(() => {
    const t = editTitle.trim();
    return t.length ? t : initial?.title ?? title;
  }, [editTitle, initial?.title, title]);

  const titleChanged = useMemo(() => {
    if (!initial) return false;
    return newTitle !== initial.title;
  }, [initial, newTitle]);

  const colorChanged = useMemo(() => {
    if (!initial) return false;
    return color !== initial.color;
  }, [initial, color]);

  const isDirty = !!initial && (titleChanged || colorChanged);

  const onSubmit = async () => {
    if (!isDirty || saving) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const payload: Partial<Pick<Dashboard, "title" | "color">> = {};
      if (titleChanged) payload.title = newTitle;
      if (colorChanged) payload.color = color;

      await updateDashboard(dashboardId, payload);

      if (titleChanged) setTitle(newTitle);
      setEditTitle("");
      setInitial((prev) =>
        prev ? { title: newTitle, color } : { title: newTitle, color }
      );
      setMessage("변경되었습니다.");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(
          e.response?.data?.message ??
            e.message ??
            "변경 중 오류가 발생했습니다."
        );
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("변경 중 오류가 발생했습니다.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-[28px] py-8 rounded-[16px] bg-white flex flex-col gap-10">
      <div className="flex flex-col gap-6 text-[24px] font-bold">
        {title}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-[18px] font-medium">
            대시보드 이름
            <input
              type="text"
              placeholder="뉴프로젝트"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-[50px] px-4 py-[15px] rounded-[8px] border border-[#D9D9D9] text-[16px] focus:outline-none"
            />
          </div>
          <ColorChipSection selectedColor={color} onSelect={setColor} />
        </div>
      </div>
      <button
        className="w-full h-[54px] text-center rounded-[8px] bg-[#5534DA] font-semibold text-white"
        onClick={onSubmit}
      >
        변경
      </button>
    </div>
  );
}
