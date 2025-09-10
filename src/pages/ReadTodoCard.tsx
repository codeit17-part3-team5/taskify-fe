import Image from "next/image";
import moreVert from "@/assets/icons/more-vert.svg";
import largeExit from "@/assets/icons/large-exit.svg";
import TodoCardStatus from "@/components/todocarddetail/TodoCardStatus";
import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "@/stores/task";

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

export default function ReadTodoCard({ cardId = 14131 }: ReadTodoCardProps) {
  const current = useTaskStore((s) => s.current);
  const isLoadingCurrent = useTaskStore((s) => s.isLoadingCurrent);
  const currentError = useTaskStore((s) => s.currentError);
  const [comment, setComment] = useState("");
  const [isManageOpen, setIsManageOpen] = useState(false);

  const lastIdRef = useRef<number | null>(null);
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

  if (isLoadingCurrent) {
    return (
      <div className="max-w-[372px] md:max-w-[678px] lg:max-w-[730px] mx-auto animate-pulse">
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

  return (
    <div className="max-w-[372px] md:max-w-[678px] lg:max-w-[730px] mx-auto pl-[18px] pt-[30px] pr-[38px]">
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
              className="w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD]
                   transition-colors cursor-pointer"
            >
              수정하기
            </button>
            <button
              type="button"
              className="mt-[4px] w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD]
                   transition-colors cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}

      <main className="mt-[24px]">
        <div className="relative flex flex-col gap-3 md:flex-row">
          <aside
            className="order-first w-full
              md:order-none md:w-[200px] md:absolute md:top-0 md:right-0 md:max-h-40 md:z-10
              overflow-y-auto border border-[#D9D9D9] rounded-lg p-2 bg-white"
          >
            <div className="w-[120px] h-[126px] font-medium flex flex-col justify-between items-center md:flex-col md:items-start ml-[16px] my-auto">
              <div>
                <div className="text-[12px] text-[#000000] font-semibold leading-[20px]">
                  담당자
                </div>
                {/* <div className="flex">
                  <div className="flex items-center gap-2">
                    <div>프로필 사진 /</div>
                    <div>유저네임</div>
                  </div>
                </div> */}
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
              {/* 마감일 */}
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
          <div className="order-last md:order-none flex justify-between md:pr-40">
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
        <div className="max-w-[295px] md:max-w-[349px] lg:max-w-[470px] mt-[16px] text-[#000000] text-[14px] leading-[24px]">
          {current.description}
        </div>
        <div className="max-w-[290px] md:max-w-[420px] lg:max-w-[445px] mt-[8px]">
          {current.imageUrl}
        </div>
      </article>
      <section className="w-[295px] lg:w-[450px] mt-[16px]">
        <div className="text-[16px] text-[#333236] leading-[26px] font-medium">
          댓글
        </div>
        <div className="relative mt-[4px]">
          <form>
            <textarea
              placeholder="댓글 작성하기"
              value={comment}
              onChange={handleCommentChange}
              className="w-full h-[110px] pt-[16px] pl-[16px] rounded-md border border-[#D9D9D9]"
            />
            <button
              type="button"
              className="absolute right-2 bottom-4 z-10 px-3 py-1 text-sm bg-[#FFFFFF] text-[#5534DA] rounded-md w-[83px] h-[32px] border border-[#D9D9D9]"
            >
              입력
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
