/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import ProfileEdit from "@/pages/Mypage/profileEdit";
import { useState } from "react";

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    // 서버 업로드 or FormData 처리 등
  };

  return (
    <MypageLayout
      onSelectFile={handleFileSelect}
      className="bg-gradient-auth-login"
      title="프로필 수정"
    >
      <ProfileEdit selectedFile={selectedFile}></ProfileEdit>
    </MypageLayout>
  );
};

export default EditProfile;
