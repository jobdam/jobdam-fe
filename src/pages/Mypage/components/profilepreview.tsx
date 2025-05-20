/** @format */

import AlertDialog from "@/components/ui/alertdialog/alertdialog";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useLocation } from "react-router";
import { useUser } from "@/lib/auth";

type FormValues = {
  profileImage: any;
};
type Props = {
  onSelectFile?: (file: File | null) => void | undefined;
  mypage?: boolean;
};
const ProfilePreview = ({ onSelectFile, mypage }: Props) => {
  const { data } = useUser();

  const defaultImageUrl = data?.profileImgUrl ?? null;

  const location = useLocation();
  const pathname = location.pathname;

  const isEditing = pathname === "/mypage/edit"; // 예시
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const currentImageUrl = uploadPreview || defaultImageUrl;
  const { watch } = useForm<FormValues>({
    defaultValues: { profileImage: null },
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const imageUrl = watch("profileImage");

  const [preview, setPreview] = useState(imageUrl || "");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 설정

      //!데이터 api 사용할때 사용

      //
      //   const {data} = postProfileImage(file)

      //   2. form 상태에 등록
      //   setValue("profileImageUrl", uploadedUrl);
      //   setPreview(uploadedUrl);
    }
  };
  const handleChangeClick = () => {
    if (file) {
      onSelectFile?.(file); // ✅ 부모에 파일 전달
      setUploadPreview(URL.createObjectURL(file));
    } else if (!file) {
      setUploadPreview(null);
      onSelectFile?.(null); // ✅ 부모에 파일 전달
    }

    setOpen(false); // 모달 닫기
  };
  const handleResetClick = () => {
    setFile(null);
    setPreview(null); // 미리보기 URL 설정
  };

  const prContents = () => {
    return (
      <section>
        <div className="w-[150px] h-[150px] rounded-full bg-gray-300">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-500 relative left-10 top-[65px] ">
              + 사진 업로드
            </span>
          )}
        </div>

        <input
          ref={fileInputRef}
          id="upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
          className="hidden"
        />
        <div className=" flex flex-row gap-x-[5px] mt-[10px]">
          <button
            type="button"
            onClick={handleImageClick}
            className="px-1 border-[1px] rounded hover:translate-y-[1px] active:translate-y-[2px] transition-transform duration-150"
          >
            파일 선택
          </button>
          {!preview ? <span> 선택된 파일 없음</span> : <></>}
        </div>

        <div className="my-[10px]">
          <button className="cursor-pointer" onClick={handleChangeClick}>
            변경
          </button>

          <button
            className=" cursor-pointer mx-[10px]"
            onClick={handleResetClick}
          >
            리셋
          </button>
        </div>
      </section>
    );
  };
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
      className="flex-col flex justify-center items-center"
      contents={prContents()}
      title="프로필 사진 변경"
    >
      <button
        className={cn(
          "pointer-events-none",
          isEditing && "pointer-events-auto"
        )}
      >
        <div
          className={cn(
            "w-[170px] h-[170px] rounded-full bg-[#D9D9D9] cursor-pointer overflow-hidden",
            mypage && "w-[150px] h-[150px]"
          )}
        >
          {/* {uploadPreview ? ( */}
          <img
            src={currentImageUrl ?? undefined}
            className="w-full h-full object-cover rounded-full"
          />
          {/* ) : (
            <></>
          )} */}
        </div>
        {/* //카메라 이미지 커스텀하기 */}
        <div className="w-[24px] h-[24px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "right-0 left-30 bottom-7 relative cursor-pointer lucide lucide-camera-icon lucide-camera fill-black",

              !isEditing && "hidden"
            )}
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle className="text-white" cx="12" cy="13" r="4" />
          </svg>
        </div>
      </button>
    </AlertDialog>
  );
};

export default ProfilePreview;
