/** @format */

import { paths } from "@/config/paths";
import { Link } from "@/components/ui/link";
import Menu from "@/components/ui/navigation/menu";
import { useUser } from "@/lib/auth";
import { getAccessToken } from "@/lib/authSerivices";
const Logo = () => {
  return (
    <Link className="flex items-center text-white" to={paths.home.getHref()}>
      <img className="h-8 w-auto" src="/logo.png" alt="Workflow" />
    </Link>
  );
};
//width 조절로 좌우 여백 조절
const LoggedInHeader = () => {
  const token = getAccessToken();
  const { data: userData } = useUser({
    enabled: !!token,
  });

  return (
    <>
      {/* 헤더의 구조, 색 z로 띄윅등 */}
      <header
        className="

      px-[78px] flex sticky top-0 h-[70px] max-w-[1980px] min-w-[1200px[] z-[100] bg-[#202020]"
      >
        {/* 헤더의 컨텐츠부분 */}
        <div
          className="
        flex  justify-between items-center w-full w-auto mx-auto "
        >
          {/* 헤더구성요소중 왼쪽 로고 */}
          <Logo></Logo>
          {/* 헤더구성 요소중 오른쪽 메인 기능 */}
          <nav className="relative flex gap-[55px] items-center  h-full text-sm font-medium text-gray-800">
            <Link
              to="/"
              className="cursor-pointer text-white text-[16px] font-semibold leading-normal "
            >
              잡담 소개
            </Link>
            <Link
              to={paths.interview.register.path}
              className="cursor-pointer text-white text-[16px] font-semibold leading-normal "
            >
              면접 보러가기
            </Link>
            <Menu title={userData?.name + "님" || "세영님"}></Menu>

            {/* <button
              type="button"
              onClick={() => logout.mutate({})}
              className="text-white cursor-pointer
            rounded-[20px] bg-[#488fff]
              flex items-center justify-center mx-2 z-[20] w-[106px] h-[32px]"
            >
              로그아웃
            </button>
            <Link
              to={paths.mypage.root.path}
              className="cursor-pointer text-white text-[16px] font-semibold leading-normal "
            >
              마이페이지
            </Link> */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default LoggedInHeader;
