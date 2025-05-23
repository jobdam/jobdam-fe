/** @format */
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import Footer from "./footer";
import NavigationMenuDemo from "@/components/ui/navigation/menu";

function Apps() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <NavigationMenuDemo title="세영님"></NavigationMenuDemo>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to={paths.emailverify.verifycheck.path}>이메일 인증 페이지</Link>
      <br></br>
      <Link to={paths.mypage.postdata.path}>마이페이지</Link>
      <br></br>
      <Link to={paths.chatroom.main.path}>채팅방</Link>
      <br></br>
      <Button>
        <Link to="/login">로그인페이지</Link>
        <br></br>
      </Button>
      <br></br>
      <Button>
        <Link to={paths.auth.entry.path}>로그인진입페이지</Link>
      </Button>
      <br></br>
      <Button>
        <Link to="/termsAgreement">이용약관</Link>
      </Button>

      <div></div>

      {/* 랜딩 페이지 전체 */}
      <div>
        {/* 이미지 및 면접하러가기 */}
        <div className="mt-[196px] items-center flex flex-col">
          <div className="text-[64px] font-semibold leading-[150%]">
            지금 나에게 딱 맞는<br></br> 모의 면접자들과 함께 연습해요
          </div>
          <Link
            className="h-[82px] px-[40px] mt-[10px] text-[32px] font-semibold bg-[#e1e1e1] flex justify-center items-center"
            to={paths.interview.register.path}
          >
            면접 매칭하러 가기
          </Link>
        </div>
        {/* 카드형 ui 그래픽 함께 */}
        <div></div>
        {/* 서비스 이용 안내 및 마지막부분에 시작하기 넣기(로그인, 면접하러가기) */}
        <div></div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Apps;
