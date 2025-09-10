import axios from "./axios";
import { CreateTaskRequest, Task, GetTask } from "@/type/task";
import { mapGetTaskToTask } from "./task.mapper";

export async function createTask(payload: CreateTaskRequest) {
  const { data } = await axios.post<Task>("/cards", payload);
  return data;
}

export async function getTask(id: number) {
  const { data } = await axios.get<GetTask>(`/cards/${id}`);
  return mapGetTaskToTask(data);
}

export async function getTaskDetail(id: number) {
  const { data } = await axios.get<GetTask>(`/cards/${id}`);
  return data; // GetTask
}
