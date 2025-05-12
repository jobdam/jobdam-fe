/** @format */
import { Link } from "@/components/ui/link";
import { useFeedback } from "../api/get-feedback";

const data = [
  {
    title: "2025.04.22 디자이너 모의면접",
    merits: ["논리적 구조", "목소리 톤 안정"],
    improvements: ["사례 구체화", "시선처리 부족"],
  },
];

const FeedbackContents = () => {
  return (
    <>
      {data?.map((el, index) => {
        return (
          <div className="flex flex-row ">
            <div className="flex flex-col  justify-center mr-[45px] items-center">
              <div className=" w-[15px] h-[15px] border-[#488FFF] bg-[#488FFF] rounded-full "></div>

              <div className=" w-[2px] max-h-full border-[#488FFF] h-[300px] bg-[#488FFF] "></div>
            </div>

            <div
              key={index}
              className=" rounded-[20px] bg-[#E5F3FF] p-[22px] w-[800px] max-h-[300px] h-[240px] "
            >
              <div className=" flex justify-between flex-row">
                <h2 className="text-[20px] font-semibold leading-[150%] ">
                  {el.title}
                </h2>
                <Link
                  className="flex items-center justify-center bg-[#488fff] rounded-[30px] text-center  w-[130px] h-[40px]  text-[white] text-[14px]"
                  to="detail"
                >
                  <span>피드백 전체보기</span>
                </Link>
              </div>
              <div className="flex m-y-[20px]">
                <div>AI요약 리포트</div>
              </div>
              {/* 잘한점 */}
              <div className=" flex flex-row gap-x-[10px]">
                <div>잘한 점</div>
                {el.merits.map((el) => {
                  return <div>{el}</div>;
                })}
              </div>
              <div className=" flex flex-row gap-x-[10px]">
                <div>개선할 점</div>
                {el.improvements.map((el) => {
                  return <div>{el}</div>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeedbackContents;
