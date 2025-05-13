/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import MyFeedback from "@/pages/Mypage/myfeeback";
import MyFeedbackDetail from "@/pages/Mypage/myfeedbackdetail";

const Feedbackdetail = () => {
  return (
    <MypageLayout
      subtitle="지난 피드백은 나의 성장 기록이에요"
      title="면접 피드백"
    >
      <MyFeedbackDetail></MyFeedbackDetail>
    </MypageLayout>
  );
};

export default Feedbackdetail;
