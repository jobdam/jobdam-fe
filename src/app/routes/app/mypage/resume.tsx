/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import PDFUploadDialog from "@/pages/Mypage/components/pdfuploadfile";
import Myresume from "@/pages/Mypage/myresume";

const Resume = () => {
  return (
    <MypageLayout
      className="bg-gradient-auth-login w-[100vw] z-0"
      resume
      title={<>내 이력서 관리</>}
    >
      <Myresume />
    </MypageLayout>
  );
};

export default Resume;
