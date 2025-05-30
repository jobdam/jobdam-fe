/** @format */

import React, { ReactNode } from "react";
import { paths } from "@/config/paths";
import { Link } from "../ui/link";
import { cn } from "@/utils/cn";
import { useLocation } from "react-router";
import ProfilePreview from "@/pages/Mypage/components/profilepreview";

interface MypageLayoutProps {
  children: ReactNode;
  title: ReactNode;
  button?: boolean;
  subtitle?: string;
  className?: any;
  resume?: boolean;
  onSelectFile?: (file: File | null) => void | undefined;
}

const data = [
  { id: 1, name: "내 프로필", link: paths.mypage.root.path },
  { id: 2, name: "면접 피드백", link: paths.mypage.feedback.path },
  { id: 3, name: "이력서 관리", link: paths.mypage.resume.path },
];

const MypageLayout = ({
  children,
  title,
  button = false,
  subtitle,
  className,
  resume = false,
  onSelectFile,
}: MypageLayoutProps) => {
  const location = useLocation(); // 현재 URL 위치
  const [activeTab, setActiveTab] = React.useState(1);

  React.useEffect(() => {
    const activeTabFromUrl = data.findIndex(
      (opt) => opt?.link === location?.pathname
    );
    setActiveTab(activeTabFromUrl === -1 ? 1 : activeTabFromUrl + 1); // 기본값 1로 설정
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-30px)] flex-row justify-center mt-[30px] ",
        className
      )}
    >
      {/* <div className="flex gap-x-[117px] items-start "> */}
      {/* 사이드바 */}
      <div className="flex flex-col w-[200px] shrink-0 mt-[107px] mr-[102px] relative">
        <div>
          {/* 프로필 사진  mypage에선 카메라가 안보이다가 edit일때 보이고 preview가 활성화 되어야 한다.*/}
          <ProfilePreview
            onSelectFile={onSelectFile}
            mypage={true}
          ></ProfilePreview>
          {/* 메뉴 리스트 */}
          <ul className="flex flex-col mt-[43px] gap-y-[20px]">
            {data.map((opt) => (
              <li
                key={opt.id}
                className={cn(
                  "pl-[5px] border-[#D9D9D9] w-[183px] h-[51px] cursor-pointer rounded-[20px]",
                  activeTab === opt.id && "bg-[rgba(72,143,255,0.20)]"
                )}
              >
                <Link
                  onClick={() => setActiveTab(opt.id)}
                  className="flex items-center no-underline pl-[10px] h-full w-full font-medium text-black"
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
      <div
        className={cn(
          "flex flex-col mt-[75px] gap-y-[46px]",
          resume && "gap-y-[26px]"
        )}
      >
        <div className="flex flex-row ">
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
    // </div>
  );
};

export default MypageLayout;
