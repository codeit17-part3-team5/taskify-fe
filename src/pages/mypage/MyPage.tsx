import { useRouter } from "next/router";
import Image from "next/image";
import prevIcon from "@/assets/icons/prev-icon.svg";
import Button from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/stores/token";
import { getMe, updateMe } from "@/lib/user";
import ProfileImageUploader from "./ProfileImageUploader";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

export default function MyPage() {
  const [email, setEmail] = useState(""); // 이메일 표시용
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { accessToken } = useTokenStore();

  useEffect(() => {
    if (!accessToken) return;
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const me = await getMe();
        if (ignore) return;
        setEmail(me.email);
        setNickname(me.nickname ?? "");
        setProfileImageUrl(me.profileImageUrl || null);
      } catch (err) {
        console.error(err);
      } finally {
        if (ignore) return;
        setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [accessToken]);

  const confirmError =
    newPassword && confirmNewPassword && newPassword !== confirmNewPassword
      ? "비밀번호가 일치하지 않습니다."
      : "";
  const onConfirmBlur = () => {};

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const updated = await updateMe({
        nickname,
        profileImageUrl: profileImageUrl ?? "", // 없으면 빈 문자열 전달
      });

      // 응답으로 최신 데이터 반영
      setNickname(updated.nickname);
      setProfileImageUrl(updated.profileImageUrl || null);
      alert("프로필이 성공적으로 저장되었습니다!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      {/* 좌측 사이드바 */}
      <aside className="w-[300px] border-r border-[#EAEAEA] bg-white">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        {/* 상단 내브바: 제목 가운데 */}
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mt-[20px] ml-[20px]">
            <div className="flex">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="뒤로 가기"
                className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
              >
                <Image src={prevIcon} alt="뒤로가기" width={20} height={20} />
              </button>
              <div className="flex items-center text-[16px] leading-[26px] text-[#333236]">
                돌아가기
              </div>
            </div>
            <section
              id="프로필"
              className="w-[672px] h-[366px] p-[24px] mt-[29px] rounded-2xl bg-[#FFFFFF]"
            >
              <div className="font-bold text-[24px] leading-[32px] text-[#333236]">
                프로필
              </div>
              <div className="mt-[24px] flex items-start">
                <ProfileImageUploader
                  profileImageUrl={profileImageUrl}
                  setProfileImageUrl={setProfileImageUrl}
                />
                <div className="w-[400px] h-[262px] ml-[42px]">
                  <div>
                    <div className="font-normal text-[16px] text-[#333236] leading-[26px]">
                      이메일
                    </div>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-[400px] h-[50px] mt-[8px] pl-[16px] border border-[#D9D9D9] rounded-lg 
               text-base text-[#333236] placeholder-[#9FA6B2] focus:outline-none focus:border-[#D9D9D9]"
                    />
                  </div>
                  <div className="mt-[16px]">
                    <div className="font-normal text-[16px] text-[#333236] leading-[26px]">
                      닉네임
                    </div>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-[400px] h-[50px] mt-[8px] pl-[16px] border border-[#D9D9D9] rounded-lg 
               text-base text-[#333236] placeholder-[#9FA6B2] focus:border-[#5334DA] outline-none"
                    />
                  </div>
                  <div className="mt-[24px]">
                    <Button
                      type="submit"
                      disabled={false}
                      onClick={handleSave}
                      label="저장"
                      className="w-[400px] h-[54px] rounded-lg text-[#FFFFFF]"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section
              id="비밀번호변경"
              className="w-[672px] h-[466px] p-[24px] mt-[24px] rounded-2xl bg-[#FFFFFF]"
            >
              <div className="font-bold text-[24px] leading-[32px] text-[#333236]">
                비밀번호 변경
              </div>
              <div className="mt-[24px]">
                <div>현재 비밀번호</div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={onConfirmBlur}
                  aria-invalid={!!confirmError}
                  aria-describedby={confirmError ? "confirm-error" : undefined}
                  className="w-[624px] h-[50px] mt-[8px] pl-[16px] border border-[#D9D9D9] rounded-lg 
              text-base text-[#333236] placeholder-[#9FA6B2] focus:border-[#5334DA] outline-none"
                />
              </div>
              <div className="mt-[16px]">
                <div>새 비밀번호</div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={onConfirmBlur}
                  aria-invalid={!!confirmError}
                  aria-describedby={confirmError ? "confirm-error" : undefined}
                  className="w-[624px] h-[50px] mt-[8px] pl-[16px] border border-[#D9D9D9] rounded-lg 
              text-base text-[#333236] placeholder-[#9FA6B2] focus:border-[#5334DA] outline-none"
                />
              </div>
              <div className="mt-[16px]">
                <div>새 비밀번호 확인</div>
                <input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해 주세요"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  onBlur={onConfirmBlur}
                  aria-invalid={!!confirmError}
                  aria-describedby={confirmError ? "confirm-error" : undefined}
                  className="w-[624px] h-[50px] mt-[8px] pl-[16px] border border-[#D9D9D9] rounded-lg 
              text-base text-[#333236] placeholder-[#9FA6B2] focus:border-[#5334DA] outline-none"
                />
              </div>
              <Button
                type="submit"
                disabled={false}
                label="변경"
                className="w-[624px] h-[54px] mt-[24px] rounded-lg text-[#FFFFFF]"
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
