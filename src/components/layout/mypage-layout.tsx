/** @format */

import { ReactNode } from "react";
import { paths } from "@/config/paths";
import { Link } from "../ui/link";
import { cn } from "@/utils/cn";

interface MypageLayoutProps {
  children: ReactNode;
  title: string;
  button?: boolean;
  subtitle?: string;
}

const data = [
  { id: 1, name: "내 프로필", link: paths.mypage.me.path },
  { id: 2, name: "면접 피드백", link: paths.mypage.feedback.path },
  { id: 3, name: "이력서 관리", link: paths.mypage.resume.path },
];

const MypageLayout = ({
  children,
  title,
  button = false,
  subtitle,
}: MypageLayoutProps) => {
  return (
    <div className="flex min-h-screen w-[1920px] flex-row justify-center items-center">
      <div className="flex gap-x-[117px]">
        {/* 사이드바 */}
        <div className="flex flex-col">
          <div>
            {/* 프로필 사진 */}
            <div className="w-[150px] h-[150px] mb-[43px] rounded-full bg-[#D9D9D9]"></div>

            {/* 메뉴 리스트 */}
            <ul className="flex flex-col gap-y-[20px]">
              {data.map((opt) => (
                <li
                  key={opt.id}
                  className="border-b-[3px] pl-[5px] border-[#D9D9D9] w-[158px]"
                >
                  <Link
                    className="no-underline w-[150px] font-medium text-black"
                    to={opt.link}
                  >
                    {opt.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="flex flex-col gap-y-[47px]">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h2 className="text-[32px] font-semibold leading-[150%]">
                {title}
              </h2>
              {subtitle ? (
                <span className="text-[20px] mt-[5px] font-semibold leading-[150%]">
                  {subtitle}
                </span>
              ) : (
                <></>
              )}
            </div>
            {button && <Link to={paths.mypage.editdata.path}>수정하기</Link>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default MypageLayout;
