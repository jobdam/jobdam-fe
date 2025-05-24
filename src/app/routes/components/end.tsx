/** @format */

import bg from "@/assets/landingImage/bgimage.png";

const End = () => {
  return (
    <div className="relative h-[460px] min-w-[1200px] w-full ">
      <img className="min-w-[1200px] w-full h-full" src={bg} />
      <div
        className=" 
        relative bottom-[70%] flex flex-col justify-center items-center "
      >
        <div
          className=" z-[30] min-w-[1200px]
      text-[32px] font-bold leading-[150%] text-center text-[#fff]
      
      "
        >
          지금 바로 실전처럼 연습해보세요.<br></br>
          AI가 질문하고, 사람들이 직접 피드백해줘요.
        </div>
        <button
          className=" text-black px-[60px]  h-[98px]
        bg-[white] w-[333px] rounded-[20px] mt-[40px] text-[32px]
       cursor-pointer flex justify-center items-center font-semibold        "
        >
          <span className="text-center">무료로 시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default End;
