/** @format */

import { Button } from "@/components/ui/button";

const Myresume = () => {
  return (
    <>
      <div className=" flex flex-col  justify-center items-center w-[815px] h-[617px] bg-[#f3f3f3]">
        <div className="bg-[white] w-[400px] h-[400px]">
          {/* 글자수 및 파일 불러오기 */}
        </div>
        <div className="flex flex-row justify-between">
          <div>글자수:23</div>

          <Button>파일 불러오기</Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button>내용 저장하기</Button>
      </div>
    </>
  );
};

export default Myresume;
