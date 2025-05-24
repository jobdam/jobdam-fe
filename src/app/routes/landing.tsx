/** @format */
import Footer from "./footer";
import LandingTopImage from "./components/landingTopImage";
import LandingCard from "./components/landingCard";
import LandingExplain from "./components/landingExplain";
import End from "./components/end";

function Apps() {
  return (
    <div className=" h-[100vh]">
      {/* <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

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

      <div></div> */}

      {/* 랜딩 페이지 전체 */}
      <div className=" bg-gradient-landing-top">
        {/* 랜딩 페이지 배경 넣기  */}
        <div>
          {/* 이미지 및 면접하러가기 */}
          <div className="relative flex flex-col justify-center items-center">
            <LandingTopImage></LandingTopImage>
          </div>
          {/* 카드형 ui 그래픽 함께 */}
          <div
            className="    
"
          >
            <div
              className="
          flex items-center justify-center"
            >
              <LandingCard></LandingCard>
            </div>
            {/* 프로젝트를 설명하는 부분 레이아웃 */}
            <LandingExplain></LandingExplain>
          </div>
        </div>

        {/* 서비스 이용 안내 및 마지막부분에 시작하기 넣기(로그인, 면접하러가기) */}
      </div>
      <div>
        <End></End>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Apps;
