/** @format */

import message from "@/assets/landingImage/imagefolder2/flamel-collectiodn-FLAMEL-3D-401699-1x 1.svg";
import goodImage from "@/assets/landingImage/imagefolder2/flamel-collection-FLAMEL-3D-1021067-1x 1.svg";
import folder from "@/assets/landingImage/imagefolder2/flamel-csollecdtion-FLAMEL-3D-610468-1x 1.svg";
import { InterviewSpinner } from "@/components/ui/spinner";

const LandingCard = () => {
  return (
    <div
      className="z-2 grid gap-x-[40px] 
    mt-[150px]
    max-w-[calc(90vw-350px)] grid-cols-3 h-[600px] min-w-[1050px]  w-[calc(100vw-350px)] "
    >
      <div
        className="relative 
        pt-[40px] px-[40px] max-w-[453px] aspect-[453/319] 
       max-h-[319px] min-w-[calc(230px*453/319)] min-h-[calc(230px*319/453)]
        rounded-[10px] bg-[#282828]"
      >
        <span className="text-white text-[24px] font-bold leading-[150%]">
          잡담 AI로 내 면접 예상질문<br></br>
          쉽고 빠르게 뽑아요
        </span>
        <div className="absolute left-[40%] top-[42%] aspect-square   max-w-[289px] max-h-[289px]">
          <img className="" src={folder}></img>
        </div>
      </div>
      <div
        className=" relative  pt-[40px] px-[40px]  max-w-[453px] aspect-[453/319]
       max-h-[319px]
 min-w-[calc(230px*453/319)] min-h-[calc(230px*319/453)]       rounded-[10px] bg-[#282828]"
      >
        <span className="text-white text-[24px] font-bold leading-[150%]">
          같은 면접자들끼리 <br></br>
          면접자·면접관 역할 바꿔가며 실전처럼 <br></br>
          연습해요
        </span>
        <div className="absolute left-[40%] top-[42%] aspect-square max-w-[289px] max-h-[289px]">
          <img className="" src={goodImage}></img>
        </div>
      </div>
      <div
        className=" relative  pt-[40px] px-[40px] max-w-[453px] aspect-[453/319]
       max-h-[319px]
       rounded-[10px] bg-[#282828]
 min-w-[calc(230px*453/319)] min-h-[calc(230px*319/453)]       "
      >
        <span className="text-white text-[24px] font-bold leading-[150%]">
          받은 피드백은 질문별로 저장해<br></br>
          나중에 다시 볼 수 있어요
        </span>
        <div className="absolute left-[40%] top-[42%] aspect-square  max-w-[289px] max-h-[289px]">
          <img className="" src={message}></img>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
