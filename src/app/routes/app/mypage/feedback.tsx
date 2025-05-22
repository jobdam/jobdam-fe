/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import MyFeedback from "@/pages/Mypage/myfeeback";

const Feedback = () => {
  return (
    <MypageLayout
      className="bg-gradient-auth-login"
      subtitle="지난 피드백은 나의 성장 기록이에요"
      title="면접 피드백"
    >
      <MyFeedback></MyFeedback>
    </MypageLayout>
  );
};

export default Feedback;
