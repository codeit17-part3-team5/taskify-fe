import Image from "next/image";
import moreVert from "@/assets/icons/more-vert.svg";
import largeExit from "@/assets/icons/large-exit.svg";
import TodoCardStatus from "@/components/todocarddetail/TodoCardStatus";
import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "@/stores/task";
import {
  CommentItem,
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "@/lib/comments";

type ReadTodoCardProps = {
  cardId: number;
};

function InitialAvatar({ label }: { label: string }) {
  const initial = (label ?? "").trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">
      {initial}
    </div>
  );
}

export default function ReadTodoCard({ cardId }: ReadTodoCardProps) {
  const current = useTaskStore((s) => s.current);
  const isLoadingCurrent = useTaskStore((s) => s.isLoadingCurrent);
  const currentError = useTaskStore((s) => s.currentError);
  const [comment, setComment] = useState("");
  const [isManageOpen, setIsManageOpen] = useState(false);

  const lastIdRef = useRef<number | null>(null);

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [actionErrorId, setActionErrorId] = useState<number | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string>("");

  // 수정 시작
  const handleStartEdit = (c: CommentItem) => {
    setEditingId(c.id);
    setEditText(c.content);
    setActionErrorId(null);
    setActionErrorMsg("");
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setActionErrorId(null);
    setActionErrorMsg("");
  };

  // 수정 저장
  const handleSaveEdit = async (commentId: number) => {
    const next = editText.trim();
    if (!next) {
      setActionErrorId(commentId);
      setActionErrorMsg("내용을 입력해 주세요.");
      return;
    }
    setActionLoadingId(commentId);
    setActionErrorId(null);
    setActionErrorMsg("");

    try {
      const updated = await updateComment({ commentId, content: next });
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                content: updated?.content ?? next,
                updatedAt: updated?.updatedAt ?? c.updatedAt,
              }
            : c
        )
      );
      handleCancelEdit();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // 삭제
  const handleDelete = async (commentId: number) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("이 댓글을 삭제하시겠습니까?");
      if (!ok) return;
    }
    setActionLoadingId(commentId);
    setActionErrorId(null);
    setActionErrorMsg("");

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      if (editingId === commentId) handleCancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  // 최초/카드 변경 시 목록 로딩
  useEffect(() => {
    if (!cardId) return;
    let cancelled = false;

    (async () => {
      setIsLoadingComments(true);
      setCommentsError(null);
      try {
        const res = await fetchComments({ cardId, size: 10 });
        if (cancelled) return;
        setComments(res.comments);
        setNextCursor(res.cursorId);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setIsLoadingComments(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cardId]);

  // 더 보기
  const handleLoadMore = async () => {
    if (nextCursor == null || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await fetchComments({
        cardId,
        size: 10,
        cursorId: nextCursor,
      });
      // 중복 방지(혹시 서버가 중복을 줄 경우 대비)
      setComments((prev) => {
        const existing = new Set(prev.map((c) => c.id));
        const merged = [
          ...prev,
          ...res.comments.filter((c) => !existing.has(c.id)),
        ];
        return merged;
      });
      setNextCursor(res.cursorId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!cardId) return;
    if (lastIdRef.current === cardId) return;
    lastIdRef.current = cardId;
    useTaskStore.getState().loadCurrent(cardId);
  }, [cardId]);

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setComment(e.currentTarget.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      await createComment({
        content: comment.trim(),
        cardId: Number(cardId),
        columnId: Number(54935), // TODO: 동적으로 변경 필요
        dashboardId: Number(16248), // TODO: 동적으로 변경 필요
      });

      setComment(""); // 성공 시 입력창 비우기
      useTaskStore.getState().loadCurrent(cardId);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoadingCurrent) {
    return (
      <div className="max-w-[372px] tablet:max-w-[678px] desktop:max-w-[730px] mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="mt-4 h-4 bg-gray-200 rounded w-1/3" />
        <div className="mt-6 h-40 bg-gray-100 rounded" />
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="text-red-600">
        상세를 불러오는 중 오류가 발생했습니다: {currentError}
      </div>
    );
  }

  if (!current) return null;

  const isValid = comment.trim().length > 0;

  return (
    <div className="max-w-[372px] tablet:max-w-[678px] desktop:max-w-[730px] mx-auto pl-[18px] pt-[30px] pr-[38px]">
      <header className="relative">
        <div className="flex justify-between">
          <h1 className="text-[#333236] font-bold text-[24px] leading-[32px]">
            새로운 일정 관리 Taskify
          </h1>
          <div className="flex items-center">
            <button
              type="button"
              aria-label={isManageOpen ? "관리 패널 닫기" : "관리 패널 열기"}
              onClick={() => setIsManageOpen((v) => !v)}
              className="flex justify-center items-center w-[28px] h-[28px]"
            >
              <Image src={moreVert} alt="메뉴" />
            </button>
            <div className="ml-[24px] w-[32px] h-[32px]">
              <Image src={largeExit} alt="닫기" />
            </div>
          </div>
        </div>
      </header>

      {isManageOpen && (
        <div className="flex flex-col items-center justify-center absolute z-[9999] ml-[528px] w-[93px] h-[82px] border border-[#D9D9D9] rounded-sm bg-[#FFFFFF]">
          <div className="flex flex-col items-center justify-center w-[81px] h-[68px]">
            <button
              type="button"
              className="w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD] transition-colors cursor-pointer"
            >
              수정하기
            </button>
            <button
              type="button"
              className="mt-[4px] w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD] transition-colors cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}

      <main className="mt-[24px]">
        {/* 모바일: 세로 스택 / 태블릿 이상: 가로 배치 */}
        <div className="relative flex flex-col gap-3 tablet:flex-row">
          {/* ASIDE: 모바일/태블릿에서는 두 번째(오른쪽), 데스크톱에서는 우측 고정 */}
          <aside
            className="
              order-2 tablet:order-2 w-full
              tablet:w-[200px]
              desktop:absolute desktop:top-0 desktop:right-0 desktop:max-h-40 desktop:z-10
              overflow-y-auto border border-[#D9D9D9] rounded-lg p-2 bg-white"
          >
            <div className="w-[120px] h-[126px] font-medium flex flex-col justify-between items-center tablet:items-start ml-[16px] my-auto">
              <div>
                <div className="text-[12px] text-[#000000] font-semibold leading-[20px]">
                  담당자
                </div>
                <div className="flex mt-[6px]">
                  <div className="flex items-center gap-2">
                    {current.assignee?.profileImageUrl ? (
                      <Image
                        src={current.assignee.profileImageUrl}
                        alt={current.assignee.nickname}
                        width={34}
                        height={34}
                        className="rounded-full"
                      />
                    ) : (
                      <InitialAvatar label={current.assignee?.nickname ?? ""} />
                    )}
                  </div>
                  <div className="flex items-center text-[14px] text-[#333236] leading-[24px] font-medium ml-[8px]">
                    {current.assignee?.nickname ?? "-"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[12px] text-[#000000] font-semibold leading-[20px]">
                  마감일
                </div>
                <div className="text-[14px] text-[#333236] font-normal leading-[24px] mt-[6px]">
                  {current.dueDate}
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENT: 모바일/태블릿에서 첫 번째(왼쪽), 데스크톱에서는 오른쪽 패딩 확보 */}
          <div className="order-1 tablet:order-1 flex justify-between desktop:pr-40">
            <div className="flex">
              <div className="pr-[20px] border-r border-[#D9D9D9]">
                <TodoCardStatus size="small" status="todo" />
              </div>
              <div className="ml-[20px]">해시태그</div>
            </div>
          </div>
        </div>
      </main>

      <article>
        <div className="max-w-[295px] tablet:max-w-[349px] desktop:max-w-[470px] mt-[16px] text-[#000000] text-[14px] leading-[24px]">
          {current.description}
        </div>

        {current.imageUrl ? (
          <div className="relative mt-[8px] w-full max-w-[445px] h-[260px] overflow-hidden rounded-lg">
            <Image
              src={current.imageUrl.trim()}
              alt="첨부 이미지"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 744px) 100vw, 445px"
            />
            <noscript>
              <a href={current.imageUrl}>이미지 열기</a>
            </noscript>
          </div>
        ) : null}
      </article>

      <section className="w-[295px] desktop:w-[450px] mt-[16px]">
        <div className="text-[16px] text-[#333236] leading-[26px] font-medium">
          댓글
        </div>
        <div className="relative mt-[4px]">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="댓글 작성하기"
              value={comment}
              onChange={handleCommentChange}
              className="w-full h-[110px] pt-[16px] pl-[16px] rounded-md border border-[#D9D9D9]"
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`absolute right-2 bottom-4 z-10 px-3 py-1 text-sm bg-[#FFFFFF] text-[#5534DA] rounded-md w-[83px] h-[32px] border border-[#D9D9D9] ${
                isValid ? "cursor-pointer" : "text-[#D9D9D9] cursor-not-allowed"
              }`}
            >
              입력
            </button>
          </form>
        </div>
      </section>
      {/* 목록/상태 */}
      <div className="mt-3 space-y-3">
        {isLoadingComments && (
          <div className="animate-pulse space-y-2">
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded w-4/5" />
          </div>
        )}

        {commentsError && (
          <p className="text-sm text-red-600">{commentsError}</p>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="text-sm text-gray-500">첫 댓글을 남겨보세요.</p>
        )}

        {comments.map((c) => {
          const isEditing = editingId === c.id;
          const isBusy = actionLoadingId === c.id;
          const hasError = actionErrorId === c.id;

          return (
            <div key={c.id} className="flex items-start gap-3">
              {/* 아바타 */}
              {c.author?.profileImageUrl ? (
                <Image
                  src={c.author.profileImageUrl}
                  alt={c.author.nickname ?? "작성자"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <InitialAvatar label={c.author?.nickname ?? ""} />
              )}

              <div className="flex-1">
                {/* 작성자/시간 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#333236]">
                    {c.author?.nickname ?? "익명"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString("ko-KR", {
                      timeZone: "Asia/Seoul",
                    })}
                  </span>
                </div>

                {/* 본문 or 편집 폼 */}
                {!isEditing ? (
                  <p className="mt-1 text-sm text-[#333236] leading-5 whitespace-pre-wrap">
                    {c.content}
                  </p>
                ) : (
                  <div className="mt-1">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.currentTarget.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          e.preventDefault();
                          handleCancelEdit();
                        }
                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                          e.preventDefault();
                          handleSaveEdit(c.id);
                        }
                      }}
                      className="w-full h-[88px] p-2 rounded-md border border-[#D9D9D9]"
                      autoFocus
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(c.id)}
                        disabled={isBusy || editText.trim().length === 0}
                        className={`px-3 py-1 text-sm rounded-md border border-[#D9D9D9]
                  ${
                    isBusy || editText.trim().length === 0
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-[#F7F7F7]"
                  }`}
                      >
                        {isBusy ? "저장 중…" : "저장"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isBusy}
                        className="px-3 py-1 text-sm underline disabled:opacity-60"
                      >
                        취소
                      </button>
                    </div>
                    {hasError && (
                      <p className="mt-1 text-sm text-red-600">
                        {actionErrorMsg}
                      </p>
                    )}
                  </div>
                )}

                {/* 액션 버튼들 */}
                {!isEditing && (
                  <div className="mt-2 flex gap-2 text-[12px] font-normal text-[#9FA6B2]">
                    <button
                      type="button"
                      className="underline disabled:opacity-60"
                      onClick={() => handleStartEdit(c)}
                      disabled={isBusy}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="underline disabled:opacity-60"
                      onClick={() => handleDelete(c.id)}
                      disabled={isBusy}
                    >
                      삭제
                    </button>
                  </div>
                )}

                {/* 에러 (편집 모드가 아닐 때) */}
                {!isEditing && hasError && (
                  <p className="mt-1 text-sm text-red-600">{actionErrorMsg}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 더 보기 */}
      {nextCursor != null && (
        <div className="mt-3">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className={`px-3 py-2 text-sm rounded-md border border-[#D9D9D9]
        ${
          isLoadingMore ? "cursor-not-allowed opacity-60" : "hover:bg-[#F7F7F7]"
        }`}
          >
            {isLoadingMore ? "불러오는 중…" : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
}
