/** @format */

// import * as React from "react";
// import { CustomImage } from "../image/image";
import { paths } from "@/config/paths";
import { Link } from "@/components/ui/link";
// import { Button } from "@/components/ui/button";
const Logo = () => {
  return (
    <Link className="flex items-center text-white" to={paths.home.getHref()}>
      <img className="h-8 w-auto" src="/logo.png" alt="Workflow" />
    </Link>
  );
};
//width 조절로 좌우 여백 조절
const LoggedOutHeader = () => {
  return (
    <header className="flex items-center justify-center sticky top-0 h-[70px] z-[100] bg-[#D9D9D9]">
      <div className="flex justify-between items-center max-w-full min-w-[1300px] mx-auto">
        <Logo></Logo>
        <nav className="relative flex gap-10 items-center  h-full text-sm font-medium text-gray-800">
          <Link to="/" className="cursor-pointer h-[20px] ">
            잡담 소개
          </Link>
          <Link to="/main" className="cursor-pointer ">
            면접 보러가기
          </Link>
          <Link
            to={paths.auth.login.path}
            className="text-white  flex items-center justify-center mx-2 z-[20] bg-black w-[100px] h-[35px]"
          >
            로그인
          </Link>
          <Link className="cursor-pointer h-[20px]" to="/mypage">
            마이페이지
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LoggedOutHeader;
