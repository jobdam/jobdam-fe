/** @format */

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
      {data.map((el, index) => {
        return (
          <div
            key={index}
            className=" p-[22px] w-[900px] max-h-[300px] h-[240px] bg-[#ececec]"
          >
            <h2> {el.title}</h2>
            <div className="flex m-y-[20px]">
              <div>AI요약 리포트</div>
            </div>
            {/* 잘한점 */}
            <div className=" flex flex-row gap-x-[10px]">
              <div>잘한 점</div>
              {el.merits.map((el, index) => {
                return <div>{el}</div>;
              })}
            </div>
            <div className=" flex flex-row gap-x-[10px]">
              <div>개선할 점</div>
              {el.improvements.map((el, index) => {
                return <div>{el}</div>;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeedbackContents;
