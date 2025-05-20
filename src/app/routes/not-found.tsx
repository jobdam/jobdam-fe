/** @format */

import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import { CustomImage } from "@/components/common/image/image";

const NotFoundRoute = () => {
  return (
    <div className=" flex min-h-screen  flex-col justify-center items-center font-semibold bg-[#E5F3FF]">
      {/* 겹치는 이미지 */}
      <div>
        <div className="relative w-[543px] h-[287px] mb-[180px]">
          <div
            className="absolute size-[403px]
        left-1/2 -translate-x-1/2 
        z-[0] bg-[#f2f9ff] rounded-full"
          ></div>

          <CustomImage
            className="absolute left-1/2 -translate-x-1/2 z-10"
            src={"/not-found.svg"}
          ></CustomImage>
        </div>
        {/* 텍스트 + 버튼 */}

        <div className="flex flex-col w-full mt-[0px] justify-center items-center">
          <p className="text-[#20202066] text-center">
            앗! 페이지를 찾을 수 없어요. <br></br>  입력하신 주소가
            잘못되었거나, 삭제된 페이지일 수 있어요.
          </p>
          <Link
            className="text-[#488fff] mt-[50px] flex justify-center items-center text-center w-[168px] h-[54px] rounded-[20px] bg-[#fff]"
            to={paths.home.getHref()}
            replace
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundRoute;
