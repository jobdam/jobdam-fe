/** @format */

import InterviewLayout from "@/components/layout/interview-layout";
import MatchingResume from "@/pages/interview/matchingResume";

const MatchingWaiting = () => {
  return (
    <InterviewLayout
      register={true}
      title={
        <>
          👋 이력서/자기소개를 업로드하면,  <br></br>
          AI가 당신만을 위한 질문을 준비해드려요.
        </>
      }
    >
      <MatchingResume></MatchingResume>
    </InterviewLayout>
  );
};

export default MatchingWaiting;
