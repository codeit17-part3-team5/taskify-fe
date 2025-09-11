import instance from "./axios";

export type CreateComment = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

export type CommentAuthor = {
  id?: number;
  nickname?: string;
  profileImageUrl?: string | null;
};

export type CommentItem = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  cardId: number;
  author?: CommentAuthor;
};

export type FetchCommentsResponse = {
  comments: CommentItem[];
  cursorId: number | null;
};

export async function createComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: CreateComment) {
  const { data } = await instance.post("/comments", {
    content,
    cardId,
    columnId,
    dashboardId,
  });
  return data;
}

export async function fetchComments(params: {
  cardId: number;
  size?: number;
  cursorId?: number | null;
}): Promise<FetchCommentsResponse> {
  const { cardId, size = 10, cursorId } = params;
  const { data } = await instance.get("/comments", {
    params: {
      size,
      cardId,
      ...(cursorId != null ? { cursorId } : {}),
    },
  });
  return data as FetchCommentsResponse;
}

export async function updateComment({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}): Promise<CommentItem> {
  const { data } = await instance.put(`/comments/${commentId}`, { content });
  return data;
}

export async function deleteComment(commentId: number) {
  const { data } = await instance.delete(`/comments/${commentId}`);
  return data;
}
