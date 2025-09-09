import type { GetTask, Task } from "@/type/task";

export function mapGetTaskToTask(a: GetTask): Task {
  return {
    id: a.id,
    assigneeUserId: a.assignee.id,
    dashboardId: a.dashboardId,
    columnId: a.columnId,
    title: a.title,
    description: a.description,
    dueDate: a.dueDate,
    tags: a.tags,
    imageUrl: a.imageUrl,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}
