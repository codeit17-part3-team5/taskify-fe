import instance from "./axios";
import { CreateTaskRequest, Task } from "@/type/task";

export async function createTask(payload: CreateTaskRequest) {
  // TODO: 실제 엔드포인트 경로 확인 필요
  const { data } = await instance.post<Task>("/tasks", payload);
  return data;
}
