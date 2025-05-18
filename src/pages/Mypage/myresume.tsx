/** @format */

import { Button } from "@/components/ui/button";
import Pdfupload from "./components/pdfupload";

const Myresume = () => {
  return (
    <>
      <div className=" flex flex-col  justify-center items-center w-[915px] h-[617px] pb-[24px] p-[36px] bg-[#f3f3f3]">
        {/* <Button>파일 불러오기</Button> */}
        <div className="bg-[white] w-full h-full">
          {/* 글자수 및 파일 불러오기 */}
        </div>

        <div className="flex flex-row justify-between"></div>
        <Pdfupload file={"/리뷰데이 6주차.pdf"}></Pdfupload>
      </div>
      <div className="flex justify-center items-center">
        <Button>내용 저장하기</Button>
      </div>
    </>
  );
};

export default Myresume;
