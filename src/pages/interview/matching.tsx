/** @format */

import { InterviewSpinner } from "@/components/ui/spinner";
import { setStep } from "@/store/slices/progress";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
//인터뷰 매칭에서는 적절한 대상을 찾아 매칭을 하는 단계
//일정인원수가 매칭이되면 다음 단계로 넘어간다.
//
const InterviewMatching = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setStep(2));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-[36px] mb-[100px] font-semibold leading-[150%]">
        매칭을 준비 중이에요
      </h2>
      <InterviewSpinner></InterviewSpinner>
      <div className="mt-[100px]">
        <span>다른 면접자들의 연결을 기다리는 중이에요</span>
        <Link to={paths.chatroom.main.path}>채팅방</Link>
      </div>
    </div>
  );
};

export default InterviewMatching;
