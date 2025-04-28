/** @format */

import { Router, useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import { SignIn } from "@/pages/auth/SignIn";
import { InterviewLayout } from "@/components/layout/interview-layout";
import Interview from "@/pages/interview/main";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";

import InterviewMatching from "@/pages/interview/matching";
import { InterviewSpinner } from "@/components/ui/spinner";
const InterviewMatchingRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const progressStep = useSelector((state: RootState) => state.progress.step);

  return (
    <>
      <InterviewLayout matching={true}>
        <InterviewMatching></InterviewMatching>
      </InterviewLayout>
    </>
  );
};

export default InterviewMatchingRoute;
//div className="min-h-screen flex flex-col bg-white">
{
  /* Top bar */
}

//     <div className="flex flex-1">
//       {/* Left Progress Bar */}
//       <div className="w-24 flex flex-col items-center justify-center space-y-16 text-sm text-gray-600">
//         <div className="flex flex-col items-center space-y-2">
//           <div className="w-3 h-3 rounded-full bg-gray-400"></div>
//           <span>단계 선택</span>
//         </div>
//         <div className="flex flex-col items-center space-y-2">
//           <div className="w-3 h-3 rounded-full bg-black"></div>
//           <span>반려견 매칭중</span>
//         </div>
//         <div className="flex flex-col items-center space-y-2">
//           <div className="w-3 h-3 rounded-full bg-gray-400"></div>
//           <span>상세정보 입력</span>
//         </div>
//       </div>

//       {/* Center Main Content */}
//       <div className="flex-1 flex flex-col justify-center items-center text-center px-8">
//         <h2 className="text-[36px] font-semibold mb-[101px]">
//           매칭을 준비 중이에요
//         </h2>

//         {/* Circle Animation */}
//         <div className="relative w-[480px] h-[480px] mb-8">
//           {/* 4 gradient circles */}
//           <InterviewSpinner></InterviewSpinner>
//           {/* Center Text */}
//         </div>

//         <p className="text-[#000] text-[24px] font-medium">
//           다른 면접자들과의 연결을 기다리는 중이에요.
//         </p>
//       </div>
//     </div>
//   </div>
