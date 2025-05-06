/** @format */

import { InterviewLayout } from "@/components/layout/interview-layout";
import InterviewMatchingFinish from "@/pages/interview/matchingwaiting";

const MatchingWaiting = () => {
  return (
    <InterviewLayout title="면접 대기방에 입장했어요">
      <div>
        <span>모두 준비되면 바로 시작해요</span>
      </div>
      <InterviewMatchingFinish></InterviewMatchingFinish>
    </InterviewLayout>
  );
};

export default MatchingWaiting;
