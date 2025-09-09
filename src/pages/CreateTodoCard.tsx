import { useState } from "react";
import { useTaskStore } from "@/stores/task";
import Image from "next/image";
import uploadImageBanner from "@/assets/images/upload-image-banner.svg";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

type CreateTodoCardProps = {
  onClose: () => void;
  onCreate?: (todo: {
    name: string;
    title: string;
    desc: string;
    date: string;
    tag: string;
  }) => void;

  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
};

export default function CreateTodoCard({
  onClose,
  onCreate,
  assigneeUserId,
  dashboardId,
  columnId,
}: CreateTodoCardProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");

  const isValid = title !== "" && desc !== "";

  const { createTask, isCreating, createError, resetCreateState } =
    useTaskStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isCreating) return;

    try {
      await createTask({
        assigneeUserId,
        dashboardId,
        columnId,
        title: title.trim(),
        description: desc.trim(),
        dueDate: date || new Date().toISOString(),
        tags: tag
          ? tag
              .split(/[,\s]+/)
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        imageUrl: null,
      });

      onCreate?.({ name, title, desc, date, tag });
      onClose();
    } catch {}
  };

  return (
    <div className="flex flex-col justify-evenly w-[327px] lg:w-[584px] h-[766px] lg:h-[966px] mx-auto">
      <div className="w-[327px] lg:w-[520px] lg:h-[816px] mx-auto">
        <header>
          <h1 className="text-[#333236] font-bold text-[24px] leading-[32px]">
            할 일 생성
          </h1>
        </header>
        <main className="flex flex-col justify-between lg:h-[752px] mt-[32px]">
          <section>
            <div className="text-[#333236] font-medium text-[18px]">담당자</div>
            <div className="mt-[8px]">
              <Input
                placeholder="이름을 입력해 주세요"
                type="text" // select 로 변경
                value={name}
                className="w-full h-[42px] lg:h-[50px]"
                onChange={setName}
              />
            </div>
          </section>
          <section>
            <div className="flex gap-[2px]">
              <div className="text-[#333236] font-medium text-[18px]">제목</div>
              <div className="text-[#5534DA] font-[400px] text-[16px] leading-[26px]">
                *
              </div>
            </div>
            <div>
              <div className="mt-[8px]">
                <Input
                  placeholder="제목을 입력해 주세요"
                  type="text"
                  value={title}
                  className="w-full h-[42px] lg:h-[50px]"
                  onChange={setTitle}
                />
              </div>
            </div>
          </section>
          <section>
            <div className="flex gap-[2px]">
              <div className="text-[#333236] font-medium text-[18px]">설명</div>
              <div className="text-[#5534DA] font-[400px] text-[16px] leading-[26px]">
                *
              </div>
            </div>
            <div className="mt-[8px]">
              <Input
                placeholder="설명을 입력해 주세요"
                type="textarea"
                value={desc}
                className="w-full h-[84px] lg:h-[126px]"
                onChange={setDesc}
              />
            </div>
          </section>
          <section>
            <div className="text-[#333236] font-medium text-[18px]">마감일</div>
            <div className="mt-[8px]">
              <Input
                type="date"
                value={date}
                className="w-full h-[42px] lg:h-[50px]"
                onChange={setDate}
              />
            </div>
          </section>
          <section>
            <div className="text-[#333236] font-medium text-[18px]">태그</div>
            <div className="mt-[8px]">
              <Input
                placeholder="입력 후 Enter"
                type="text"
                value={tag}
                className="w-full h-[42px] lg:h-[50px]"
                onChange={setTag}
              />
            </div>
          </section>
          <section>
            <div className="text-[#333236] font-medium text-[18px]">이미지</div>
            <div className="mt-[5px] w-[58px] lg:w-[76px] h-[58px] lg:h-[76px]">
              <Image src={uploadImageBanner} alt="이미지 업로드 배너" />
            </div>
          </section>
        </main>
      </div>
      <div className="flex w-[327px] lg:w-[520px] h-[42px] lg:h-[54px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div>
              <Button
                type="button"
                disabled={false}
                label="취소"
                className="w-[256px] h-[54px] bg-[#FFFFFF] rounded-xl text-[#787486] text-[16px] leading-[26px] font-medium border border-[#D9D9D9]"
                onClick={onClose}
              />
            </div>
            <div className="ml-[8px]">
              <Button
                type="submit"
                disabled={false}
                label="생성"
                className="w-[256px] h-[54px] bg-[#5534DA] rounded-xl text-[#FFFFFF] text-[16px] leading-[26px] font-medium"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
