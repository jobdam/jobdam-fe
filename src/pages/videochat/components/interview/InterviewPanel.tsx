/** @format */

import { setAiState, setResumeState } from "@/store/slices/uistate";
import { useDispatch } from "react-redux";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSelectedUserId } from "@/store/slices/videoChatInterview";
import QuestionFeedbackBox from "./QuestionFeedbackBox";
import { useState } from "react";
import ResumeViewer from "./ResumeViewer";
import { useEdgeAutoScroll } from "@/services/useEdgeAutoScroll";

const InterviewPanel = () => {
  //질문영역 마우스 스크롤조절
  const { scrollRef, handleMouseMove, handleMouseLeave } = useEdgeAutoScroll(
    70,
    4
  );

  //클릭된걸 아래에 나타낸다.
  const ai = useSelector((state: RootState) => state.ui.aiState);
  const resume = useSelector((state: RootState) => state.ui.resumeState);
  //선택된 아이디
  const selectedUserId = useSelector(
    (state: RootState) => state.videoChatInterview.selectedUserId
  );
  //초기 데이터들
  const interviewData = useSelector((state: RootState) =>
    selectedUserId !== null
      ? state.videoChatInterview.interviewDataMap[selectedUserId]
      : null
  );
  const dispatch = useDispatch();
  const onAiChange = () => {
    dispatch(setAiState(true));
    dispatch(setResumeState(false));
  };
  const onResumeChange = () => {
    dispatch(setAiState(false));
    dispatch(setResumeState(true));
  };
  //질문선택한거!
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  if (!selectedUserId) {
    dispatch(setSelectedUserId(37));
    // return (
    //   <div className="w-[530px] h-[90%] flex items-center justify-center text-gray-500 text-center bg-white border border-[#d9d9d9] rounded-[20px] shadow-custom">
    //     <p>
    //       썸네일을 클릭해 상대방의 인터뷰 정보를 확인해보세요
    //       <br /> (자신에 대한 인터뷰 정보는 확인할 수 없습니다.)
    //     </p>
    //   </div>
    // );
  }

  if (!interviewData) {
    return (
      <div className="w-[530px] h-[90%] flex items-center justify-center text-gray-500 text-center bg-white border border-[#d9d9d9] rounded-[20px] shadow-custom">
        <p>이력서를 등록하지 않은 유저입니다.</p>
      </div>
    );
  }
  //null검사 위에서하고 데이터 가져오기
  const { resumeUrl, interviewQuestions } = interviewData;
  return (
    <>
      <div
        className="w-[530px] h-[90%]
      border-[1px] border-[#d9d9d9] shadow-custom
      bg-white rounded-[20px] pt-[28px] pb-[28px] px-[18px]
      flex flex-col justify-start"
      >
        {" "}
        {/* //ai추천질문 버튼 이력서 보기 버튼 */}
        <div className="pb-[35px] pl-[10px] flex flex-row gap-[12px] justify-start ">
          <button
            onClick={onAiChange}
            className={cn(
              "rounded-[20px] w-[123px] text-[#488FFF]  border-[#488FFF]  border-[1px] h-[35px]  bg-white ",
              ai && "bg-[#488FFF] text-white"
            )}
          >
            {" "}
            AI 추천 질문
          </button>
          <button
            className={cn(
              "rounded-[20px] w-[123px] h-[35px] border-[1px] border-[#488FFF]  text-[#488FFF] bg-white ",
              resume && "bg-[#488FFF] text-white"
            )}
            onClick={onResumeChange}
          >
            이력서 보기
          </button>
        </div>
        {/* 질문+인터뷰 영역 */}
        {ai && (
          <div>
            {/* 질문 영역 */}
            <div
              ref={scrollRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-[#488FFF] rounded-[20px] w-full max-h-[350px] overflow-y-auto scrollbar-none px-[24px] py-[23px]"
            >
              <ul className="list-disc px-[15px] flex gap-y-[20px] flex-col">
                {interviewQuestions?.map((el) => (
                  <li
                    key={el.interviewQuestionId}
                    onClick={() =>
                      setSelectedQuestionId(el.interviewQuestionId)
                    }
                    className={cn(
                      "group relative cursor-pointer text-white transition-opacity duration-200 pr-[70px]",
                      selectedQuestionId === el.interviewQuestionId
                        ? "font-bold opacity-100"
                        : "opacity-50 hover:opacity-100"
                    )}
                  >
                    {el.context}
                    {/* 오른쪽에 나타나는 질문하기 텍스트 */}
                    <span className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/20 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                      <span className="text-sm">💬</span>
                      질문하기
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 피드백/질문 입력 */}
            <div className="mt-4 w-full space-y-4">
              <QuestionFeedbackBox
                questionId={selectedQuestionId}
                interviewId={interviewData.interviewId}
                context={
                  interviewQuestions?.find(
                    (q) => q.interviewQuestionId === selectedQuestionId
                  )?.context || ""
                }
                onNewQuestionCreated={(newId) => setSelectedQuestionId(newId)}
              />
            </div>
          </div>
        )}
        {/* 이력서 영역 */}
        {resume && (
          <div className="mt-1 px-2">
            {resumeUrl ? (
              <ResumeViewer resumeUrl="{resumeUrl}" />
            ) : (
              <p className="text-gray-400 text-sm">
                이력서를 등록하지 않은 유저입니다.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InterviewPanel;
