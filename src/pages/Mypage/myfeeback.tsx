/** @format */

import FeedbackContents from "./components/feedbackcontents";

const data = [
  {
    title: "2025.04.22 디자이너 모의면접",
    merits: ["논리적 구조", "목소리 톤 안정"],
    improvements: ["사례 구체화", "시선처리 부족"],
  },
];

const MyFeedback = () => {
  return (
    <>
      <div className="flex flex-row  items-stretch gap-x-[20px]">
        <div className="flex flex-col justify-center items-center">
          <div className=" w-[15px] h-[15px] bg-[#a8a8a8] rounded-full "></div>

          <div className=" w-[2px] max-h-full h-[200px] bg-[#a8a8a8] "></div>
        </div>
        <FeedbackContents></FeedbackContents>
      </div>
    </>
  );
};

export default MyFeedback;
