/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import Myresume from "@/pages/Mypage/myresume";

const Resume = () => {
  return (
    <MypageLayout
      className="bg-gradient-auth-login  absolute z-0"
      resume
      title={<>내 이력서 관리</>}
    >
      <Myresume />
    </MypageLayout>
  );
};

export default Resume;
