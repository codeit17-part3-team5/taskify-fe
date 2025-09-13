import { useRef } from "react";
import Image from "next/image";
import largeUploadImageBanner from "@/assets/images/large-upload-image-banner.svg";

export default function ProfileImageUploader({
  profileImageUrl,
  setProfileImageUrl,
}: {
  profileImageUrl: string | null;
  setProfileImageUrl: (url: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div onClick={handleImageClick} className="cursor-pointer">
        <Image
          src={profileImageUrl || largeUploadImageBanner}
          alt="프로필이미지"
          width={182}
          height={182}
          className="object-cover"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
