import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createTask, getTask as getTaskApi, getTaskDetail } from "@/lib/task";
import type { CreateTaskRequest, Task, GetTask } from "@/type/task";

type TaskState = {
  tasks: Task[];
  isCreating: boolean;
  createError: string | null;

  // CRUD
  createTask: (p: CreateTaskRequest) => Promise<Task>;
  getTask: (id: number) => Promise<Task>;

  current: GetTask | null;
  isLoadingCurrent: boolean;
  currentError: string | null;
  loadCurrent: (id: number) => Promise<void>;

  // 로컬 상태 유틸
  upsertLocal: (t: Task) => void;
  resetCreateState: () => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      isCreating: false,
      createError: null,

      async createTask(payload) {
        set({ isCreating: true, createError: null });
        try {
          const created = await createTask(payload);
          get().upsertLocal(created);
          return created;
        } catch (err) {
          console.error(err);
          throw err;
        } finally {
          set({ isCreating: false });
        }
      },

      async getTask(id) {
        const data = await getTaskApi(id);
        return data;
      },

      current: null,
      isLoadingCurrent: false,
      currentError: null,
      async loadCurrent(id) {
        set({ isLoadingCurrent: true, currentError: null });
        try {
          const data = await getTaskDetail(id);
          set({ current: data });
        } catch (err: unknown) {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === "string"
              ? err
              : "상세 조회에 실패했습니다.";
          set({ currentError: message });
        } finally {
          set({ isLoadingCurrent: false });
        }
      },

      upsertLocal(task) {
        const exists = get().tasks.some((t) => t.id === task.id);
        set({
          tasks: exists
            ? get().tasks.map((t) => (t.id === task.id ? task : t))
            : [task, ...get().tasks],
        });
      },

      resetCreateState() {
        set({ isCreating: false, createError: null });
      },
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ tasks: s.tasks }),
    }
  )
);
