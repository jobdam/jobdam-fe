/** @format */
import { Link } from "@/components/ui/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFeedback } from "../api/get-feedback";
import React from "react";

const FeedbackDetailContents = () => {
  const { data } = useFeedback({ interviewId: 4 });
  const [openPage, setOpenPage] = React.useState(false);

  const open = () => {
    setOpenPage(true);
  };
  const close = () => {
    setOpenPage(false);
  };
  console.log(data?.data);
  return (
    <div className="flex flex-row ">
      {/* 왼쪽 여백 or 날짜 */}

      <div className="flex flex-row ">
        <div className=" flex flex-col justify-between mr-[10px] ">
          <div className="w-[70px] text-[16px] leading-6">4월 22일 화요일</div>

          <div className="translate-y-13 w-[70px] ext-[16px] text-[#A7A7A7] leading-6">
            4월 16일 화요일
          </div>
        </div>

        {/* 왼쪽 타임라인 */}

        <div className="flex flex-col justify-center mr-[45px] mb-[-20px] items-center">
          <div className="w-[15px] h-[15px] border-[#488FFF] bg-[#488FFF] rounded-full"></div>
          <div className="w-[2px] flex-1  border-[#488FFF] bg-[#488FFF]"></div>

          <div className="w-[15px] h-[15px] border-[#488FFF] bg-[#488FFF] rounded-full"></div>
        </div>
      </div>

      {/* 콘텐츠 및 제목 */}

      <div
        className="rounded-[20px] overflow-y-auto scrollbar-custom items-stretch translate-x-[10px]
      bg-[#E5F3FF] p-[25px] w-[800px] max-h-[625px]"
      >
        <div className="flex justify-between flex-row">
          <h2 className="text-[20px] font-semibold leading-[150%]">
            2025.04.22 UX디자이너 모의면접
          </h2>
        </div>
        {!openPage && (
          <div className="flex justify-end mt-[40px]">
            <ChevronDown onClick={open}></ChevronDown>
          </div>
        )}
        {/* 질문 및 피드백 리스트 */}

        {openPage && (
          <>
            {data?.data?.map((item) => (
              <div key={item.questionId}>
                <div className="flex items-center max-w-[400px] bg-white mt-[20px] h-[40px]">
                  <div className="pl-[10px] text-black text-[14px] font-semibold leading-[146%]">
                    {`Q${item.questionId - 1}. ${item.question}`}
                  </div>
                </div>

                <ul className="list-disc text-[#474747] pl-5 mt-[20px]">
                  {item.feedbacks.map((feedback, index) => (
                    <li className="pb-[10px]" key={index}>
                      {feedback}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex justify-end">
              {openPage && <ChevronUp onClick={close}></ChevronUp>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetailContents;
