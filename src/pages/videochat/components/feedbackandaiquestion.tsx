/** @format */

import { Input } from "@/components/ui/form";
import { setAiState, setResumeState } from "@/store/slices/uistate";
import { useDispatch } from "react-redux";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
const data = [
  { question: "팀프로젝트에서 갈등을 겪엇던 경험은?" },
  { question: "팀프로젝트에서 갈등을 겪엇던 경험은?" },
  { question: "팀프로젝트에서 갈등을 겪엇던 경험은?" },
  { question: "팀프로젝트에서 갈등을 겪엇던 경험은?" },
  { question: "팀프로젝트에서 갈등을 겪엇던 경험은?" },
];

const FeedbackandAiQuestion = () => {
  //클릭된걸 아래에 나타낸다.{

  const ai = useSelector((state: RootState) => state.ui.aiState);
  const resume = useSelector((state: RootState) => state.ui.resumeState);
  // const selectList = useSelector((state: RootState) => state.ui.selectList);
  const dispatch = useDispatch();
  const onAiChange = () => {
    dispatch(setAiState(true));
    dispatch(setResumeState(false));
  };
  const onResumeChange = () => {
    dispatch(setAiState(false));
    dispatch(setResumeState(true));
  };

  return (
    <>
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
      {/* 질문 리스트 하고 이력서 내용 */}
      <div
        className="
      bg-[#488FFF] rounded-[20px]
      w-[500px] max-h-[300px] px-[24px] py-[41px]"
      >
        <ul className="list-disc px-[24px] flex gap-y-[20px] flex-col">
          {data.map((el, index) => {
            return (
              <li key={index} className="text-[white] opacity-50 focus-white">
                {el.question}
              </li>
            );
          })}
        </ul>
      </div>

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
    </>
  );
};

export default FeedbackandAiQuestion;
