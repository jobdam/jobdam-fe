/** @format */

import { InterviewSpinner } from "@/components/ui/spinner";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { paths } from "@/config/paths";

import { setProgressStep } from "@/store/slices/uistate";
import { useMatchingSubscribe } from "@/services/webSockect/matching/useMatchingSubscribe";
//인터뷰 매칭에서는 적절한 대상을 찾아 매칭을 하는 단계
//일정인원수가 매칭이되면 다음 단계로 넘어간다.
//여기서부터 web
const InterviewMatching = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state;

  const [subEnabled, setSubEnabled] = React.useState(true); //중복구독방지

  React.useEffect(() => {
    dispatch(setProgressStep(2));
  }, []);

  const headers = React.useMemo(
    //불필요한 랜더링방지
    () => ({
      jobDetailCode: formData.jobDetailCode,
      experienceType: formData.experienceType,
      matchType: formData.matchType,
      introduce: formData.introduce,
      interviewType: formData.interviewType,
    }),
    [formData]
  );

  const onMessage = React.useCallback(
    (msg) => {
      console.log(" 매칭완료 수신:", msg.body);
      const { roomId, isFirstJoin } = JSON.parse(msg.body);
      setSubEnabled(false); //구독취소

      navigate(paths.chatroom.main.getHref(roomId), {
        state: { isFirstJoin },
        replace: true,
      });
    },
    [navigate]
  );
  useMatchingSubscribe({
    destination: `/user/queue/matching/${formData.jobCode}`,
    onMessage,
    headers,
    enabled: subEnabled, //활성화 상태여야 구독
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-[36px] mb-[100px] font-semibold leading-[150%]">
        매칭을 준비 중이에요
      </h2>
      <InterviewSpinner></InterviewSpinner>
      <div className="mt-[100px]">
        <span>다른 면접자들의 연결을 기다리는 중이에요</span>
        <div onClick={() => navigate(paths.chatroom.main.getHref("1abt5"))}>
          채팅방으로{" "}
        </div>
      </div>
    </div>
  );
};

export default InterviewMatching;
