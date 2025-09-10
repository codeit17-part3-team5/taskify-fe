import { useState } from "react";
import { useTaskStore } from "@/stores/task";
import Image from "next/image";
import uploadImageBanner from "@/assets/images/upload-image-banner.svg";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import axios from "@/lib/axios";
import type { Member } from "@/components/dashboarddetail/ColumnView";

type CreateTodoCardProps = {
  onClose: () => void;
  onCreate?: (todo: {
    name: string;
    title: string;
    desc: string;
    date: string;
    tag: string;
    imageUrl?: string | null;
  }) => void;

  // assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  members: Member[];
};

export default function CreateTodoCard({
  onClose,
  onCreate,
  // assigneeUserId,
  dashboardId,
  columnId,
  members = [], // 테스트용 빈 배열
}: CreateTodoCardProps) {
  const [name, setName] = useState(""); // assigneeUserId
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  // 미리보기
  const [previewUrl, setPreviewUrl] = useState("");
  // 이미지
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const isValid = title !== "" && desc !== "";

  const { createTask, isCreating, createError, resetCreateState } =
    useTaskStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFile(file);

    await uploadImage(file);
  };

  const uploadImage = async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(
        `/columns/${columnId}/card-image`,
        formData,
        {}
      );

      const data = res.data ?? {};
      const url: string | undefined =
        data.imageUrl ?? data.url ?? data.location;

      if (!url) throw new Error("서버 응답에서 이미지 URL을 찾을 수 없습니다.");

      setUploadedImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const toDueDateString = (value?: string) => {
    if (value) {
      return value.slice(0, 16).replace("T", " ");
    }
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isCreating) return;

    // member 배열에서 id === Number(name)인 멤버를 찾음 -> 있다면 userId를 꺼내서 assigneeUserId에 넣음
    const selectMember = members.find((member) => member.id === Number(name));
    const assigneeUserId = selectMember?.userId ?? 0;

    try {
      await createTask({
        assigneeUserId, // select로 받은 userId
        dashboardId,
        columnId,
        title: title.trim(),
        description: desc.trim(),
        dueDate: toDueDateString(date),
        tags: tag
          ? tag
              .split(/[,\s]+/)
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        imageUrl: uploadedImageUrl ?? undefined,
      };

      if (!payload.title) throw new Error("제목은 필수입니다.");
      if (!payload.description) throw new Error("설명은 필수입니다.");
      if (
        [payload.assigneeUserId, payload.dashboardId, payload.columnId].some(
          (v) => !Number.isFinite(v)
        )
      ) {
        throw new Error("숫자 필드를 확인해 주세요.");
      }

      await createTask(payload);

      onCreate?.({ name, title, desc, date, tag, imageUrl: uploadedImageUrl });
      onClose();
    } catch (err) {
      console.error(err);
    }
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
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[295px] lg:w-full h-[42px] lg:h-[50px]"
              >
                <option value="">담당자 선택</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.nickname}
                  </option>
                ))}
              </select>
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
                  className="w-[295px] lg:w-full h-[42px] lg:h-[50px]"
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
                className="w-[295px] lg:w-full h-[84px] lg:h-[126px]"
                onChange={setDesc}
              />
            </div>
          </section>
          <section>
            <div className="text-[#333236] font-medium text-[18px]">마감일</div>
            <div className="mt-[8px]">
              <Input
                type="datetime-local"
                value={date}
                className="w-[295px] lg:w-full h-[42px] lg:h-[50px]"
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
                className="w-[295px] lg:w-full h-[42px] lg:h-[50px]"
                onChange={setTag}
              />
            </div>
          </section>
          <section>
            <div className="text-[#333236] font-medium text-[18px]">이미지</div>
            <div className="mt-[5px] w-[58px] lg:w-[76px] h-[58px] lg:h-[76px]">
              <div className="mt-[8px]">
                <label
                  htmlFor="imageFile"
                  className="relative inline-flex items-center justify-center w-[76px] h-[76px] rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] cursor-pointer select-none hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5534DA]/40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      (
                        document.getElementById("imageFile") as HTMLInputElement
                      )?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="이미지 업로드"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="이미지 미리보기"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Image src={uploadImageBanner} alt="이미지 업로드 배너" />
                  )}
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
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
                className="w-[144px] lg:w-[256px] h-[54px] bg-[#FFFFFF] rounded-xl text-[#787486] text-[16px] leading-[26px] font-medium border border-[#D9D9D9]"
                onClick={onClose}
              />
            </div>
            <div className="ml-[8px]">
              <Button
                type="submit"
                disabled={!isValid}
                label="생성"
                className="w-[144px] lg:w-[256px] h-[54px] rounded-xl text-[#FFFFFF] text-[16px] leading-[26px] font-medium"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
