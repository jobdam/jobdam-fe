/** @format */

import register from "@/assets/landingImage/register.svg";
import register2 from "@/assets/landingImage/register2.svg";
import video from "@/assets/landingImage/video.svg";
import feedback from "@/assets/landingImage/feedback.svg";
const LandingExplain = () => {
  return (
    <>
      <div
        className="w-[calc(100vw-240px)] z-3 gap-y-[151px] pb-[220px]  min-w-[1000px] max-w-[1980px] 
      flex flex-col items-center justify-center mx-auto"
      >
        <div className="flex h-[600px] z-[10]  gap-[40px]  justify-between items-center  flex-row">
          <div className="flex items-center min-w-[700px] flex-col">
            <div
              className="z-[15] relative flex justify-center items-center w-[716px] h-[416px] 
            rounded-[10px] bg-[#000] shadow-custom"
            >
              <img className="aspect-[346/195]" src={register} />
            </div>
            <div className=" translate-y-[-50px] w-[750.44px] h-[214px] z-[10]">
              <img
                className=" 
                            aspect-[694.44/214]
              "
                src={register2}
              />
            </div>
          </div>

          <div className=" ">
            <h2 className="text-[24px] text-[#488fff] font-bold leading-[150%] ">
              1. 관심직무 기반 면접 매칭
            </h2>
            <div className="mt-[30px] text-[20px] font-semibold leading-[150%]">
              나와 비슷한 목표를 가진 사람들과 자동 매칭돼요.<br></br>
              희망 직무, 경력 여부, 면접 인원 수 등을 입력하면, 비슷한 상황의
              지원자들과 함께 준비할 수 있어요.{" "}
            </div>
          </div>
        </div>

        <div className="flex gap-[40px] mb-[40px] justify-between items-center  flex-row">
          <div className="">
            <h2 className="text-[24px] text-[#488fff] font-bold leading-[150%] ">
              2. 실시간 화상 면접 진행
            </h2>
            <div className="mt-[30px] text-[20px] font-semibold leading-[150%]">
              질문하고, 답하고, 피드백까지 주고받는 실전 연습!<br></br>
              이전에 작성한 이력서를 기반으로 직접 질문을 던지고, 답변을
              연습하며, <br></br>
              서로의 강점과 개선점을 정확하게 피드백해줄 수 있어요. AI 질문
              추천도 함께 제공돼요.<br></br>
            </div>
          </div>
          <div className="z-[15] relative flex min-w-[715px] justify-center items-center w-[716px] h-[416px] rounded-[10px] bg-[#000] shadow-custom">
            <img className="aspect-[346/195]" src={video} />
          </div>
        </div>

        <div className="flex  gap-[40px] justify-between items-center  flex-row">
          <div className="z-[15] relative flex min-w-[715px] justify-center items-center w-[716px] h-[416px] rounded-[10px] bg-[#000] shadow-custom">
            <img className="aspect-[346/195]" src={feedback} />
          </div>

          <div className="">
            <h2 className="text-[24px] text-[#488fff] font-bold leading-[150%] ">
              3. 피드백 리포트로 면접 복기
            </h2>
            <div className="mt-[30px] text-[20px] font-semibold leading-[150%]">
              받은 피드백과 영상으로 내 답변을 돌아보며 성장해요.<br></br>
              면접이 끝나면, 질문별로 받은 피드백과 내 답변 영상이 정리된 맞춤형
              피드백 리포트가 제공돼요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingExplain;
