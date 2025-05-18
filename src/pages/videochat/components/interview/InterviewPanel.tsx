/** @format */

import { Input } from "@/components/ui/form";
import { setAiState, setResumeState } from "@/store/slices/uistate";
import { useDispatch } from "react-redux";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSelectedUserId } from "@/store/slices/videoChatInterview";
import ResumeViewer from "./resumeViewer";

const InterviewPanel = () => {
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
      bg-white rounded-[20px] pt-[39px] pb-[28px] px-[18px]
      flex flex-col justify-between"
      >
        {" "}
        {/* //ai추천질문 버튼 이력서 보기 버튼 */}
        <div className="pb-[39px] flex flex-row ">
          <button
            onClick={onAiChange}
            className={cn(
              "rounded-[20px] w-[123px] text-[#488FFF]  border-[#488FFF]  border-[1px] h-[40px]  bg-white ",
              ai && "bg-[#488FFF] text-white"
            )}
          >
            {" "}
            ai추천 질문
          </button>
          <button
            className={cn(
              "rounded-[20px] w-[123px] h-[40px] border-[1px] border-[#488FFF]  text-[#488FFF] bg-white ",
              resume && "bg-[#488FFF] text-white"
            )}
            onClick={onResumeChange}
          >
            이력서 보기
          </button>
        </div>
        {/* 질문 + 피드백 영역 */}
        {ai && (
          <div>
            {/* 질문 영역 */}
            <div className="bg-[#488FFF] rounded-[20px] w-[500px] max-h-[300px] px-[24px] py-[41px]">
              <ul className="list-disc px-[24px] flex gap-y-[20px] flex-col">
                {interviewQuestions?.map((el, index) => (
                  <li
                    key={index}
                    className="text-[white] opacity-50 focus-white"
                  >
                    {el.context}
                  </li>
                ))}
              </ul>
            </div>
            {/* 피드백/질문 입력 */}
            <div className="mt-[19px]">
              <Input
                className="w-[495px] h-[120px]"
                placeholder="피드백을 작성해주세요"
              ></Input>

              <Input
                className="w-[495px]h-[180px]"
                placeholder="질문을 작성해주세요"
              ></Input>
            </div>
          </div>
        )}
        {/* 이력서 영역 */}
        {resume && (
          <div className="mt-4 px-2">
            <div className="text-sm text-gray-500 mb-2">이력서</div>
            {resumeUrl ? (
              <ResumeViewer resumeUrl={resumeUrl} />
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
