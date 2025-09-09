// src/stores/task.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createTask } from "@/lib/task";
import type { CreateTaskRequest, Task } from "@/type/task";

type TaskState = {
  tasks: Task[];
  isCreating: boolean;
  createError: string | null;

  // CRUD
  createTask: (p: CreateTaskRequest) => Promise<Task>;
  // 필요 시 확장:
  // fetchTasks: (q?: { dashboardId?: number; columnId?: number }) => Promise<void>;
  // updateTask: (id: number, patch: Partial<CreateTaskRequest>) => Promise<Task>;
  // deleteTask: (id: number) => Promise<void>;

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
          console.log(payload);
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
