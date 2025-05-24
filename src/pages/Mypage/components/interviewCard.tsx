/** @format */

import { useFeedback } from "../api/get-feedback";
import { ChevronUp } from "lucide-react";

interface InterviewCardProps {
  interview: {
    id: number;
    interviewDay: string;
    jobName: string;
    wellDone: string | null;
    toImprove: string | null;
  };
  opened: boolean;
  onToggleOpen: () => void;
}

const InterviewCard = ({
  interview,
  opened,
  onToggleOpen,
}: InterviewCardProps) => {
  const { data } = useFeedback({
    interviewId: interview.id,
    queryConfig: { enabled: opened },
  });

  //기본인터뷰 카드
  if (!opened) {
    return (
      <div className="rounded-[10px] bg-white p-[25px] w-[807px] h-[240px] items-stretch translate-x-[10px] shadow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-[20px] font-semibold leading-[150%]">
            {interview.interviewDay} {interview.jobName} 모의면접 {interview.id}
          </h2>
          <button
            className="flex items-center justify-center bg-[#488fff] rounded-[30px] text-center  w-[127px] h-[40px]  text-[white] text-[14px]"
            onClick={onToggleOpen}
          >
            피드백 전체보기
          </button>
        </div>
        <div className="flex flex-row gap-x-30">
          {/* 잘한 점 */}
          <div className="w-[130px] break-words">
            <div className="inline-block bg-[#E5F3FF] text-[14px] px-4 rounded-xl mb-2">
              잘한 점
            </div>
            <div className="text-black text-[14px] font-normal mt-1">
              {interview.wellDone || ""}
            </div>
          </div>
          {/* 개선할 점 */}
          <div className="w-[130px] break-words">
            <div className="inline-block bg-[#E5F3FF] text-[14px] px-4 rounded-xl mb-2">
              개선할 점
            </div>
            <div className="text-black text-[14px] font-normal mt-1">
              {interview.toImprove || ""}
            </div>
          </div>
        </div>
      </div>
    );
    //상세보기인터뷰카드
  } else {
    return (
      <div
        className="rounded-[10px] bg-white p-[25px] w-[807px] min-h-[240px] overflow-y-auto  
                   interview-scroll max-h-[500px] items-stretch translate-x-[10px] shadow flex flex-col"
      >
        <h2 className="text-[20px] font-semibold leading-[150%]">
          {interview.interviewDay} {interview.jobName} 모의면접
        </h2>
        {data?.data && data.data.length > 0 ? (
          data?.data?.map((item, idx) => (
            <div key={item.questionId}>
              <div className="inline-block bg-[#E5F3FF] max-w-[600px] mt-[20px] py-[8px] px-[14px] rounded">
                <span className="text-black text-[14px] font-semibold leading-[146%]">
                  {`Q${idx + 1}. ${item.question}`}
                </span>
              </div>

              <ul className="list-disc text-[#474747] pl-5 mt-[20px]">
                {item.feedbacks.map((feedback, index) => (
                  <li className="pb-[10px]" key={index}>
                    {feedback}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-base">
            받은 피드백이 없습니다.
          </div>
        )}
        <div className="flex justify-end">
          <ChevronUp onClick={onToggleOpen}></ChevronUp>
        </div>

        <style>
          {`
        .interview-scroll::-webkit-scrollbar {
          width: 10px;
          background: #fff;
        }
        .interview-scroll::-webkit-scrollbar-thumb {
          background: #E5F3FF;
          border-radius: 8px;
        }
        .interview-scroll {
          scrollbar-color: #E5F3FF #fff;
        }
        `}
        </style>
      </div>
    );
  }
};

export default InterviewCard;
