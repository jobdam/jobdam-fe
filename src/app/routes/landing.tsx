/** @format */
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { paths } from "@/config/paths";
import Avatars from "../../components/ui/avatar/avatars";
import Footer from "./footer";

function Apps() {
  return (
    <div className=" min-h-[100vh] min-w-[1440px]">
      <h1>Vite + React</h1>
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
      <div>
        <Avatars
          users={[
            {
              name: "Colm Tuite",
              image:
                "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
            },
          ]}
        ></Avatars>
        <Avatars
          size="sm"
          users={[
            {
              name: "Colm Tuite",
              image:
                "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
            },
          ]}
        ></Avatars>
        <Avatars
          size="lg"
          users={[
            {
              name: "Colm Tuite",
              image:
                "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
            },
          ]}
        ></Avatars>
        <div className="relative w-full">
          <button className="inline-flex size-[35px] items-center justify-center rounded-full bg-black text-violet11 outline-none hover:bg-violet3">
            <Plus strokeWidth={1} className=" text-white size-[30px]" />
          </button>
        </div>
        <div className="flex gap-2">
          <Avatars
            showName={true}
            size="sm"
            users={[
              {
                name: "Colm Tuite",
                image:
                  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
              },
            ]}
          ></Avatars>
          <div className=" space-y-5 mt-[10px] max-w-xs">
            <div className="text-sm text-gray-600">서연</div>

            <div className="self-start bg-white p-2  max-w-xs">안녕하세요!</div>
          </div>
        </div>
        <div className="flex gap-2.5 mt-[10px]">
          <Avatars
            showName={true}
            size="sm"
            users={[
              {
                name: "Colm Tuite",
                image:
                  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
              },
            ]}
          ></Avatars>
          <div className=" space-y-5 mt-[10px] max-w-xs">
            <div className="text-sm text-gray-600">서연</div>

            <div className="self-start bg-white p-2 outline max-h-[300px] max-w-xs">
              안녕하세요!
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[800px] h-[452px] bg-[#D9D9D9]">
          <span className=" text-[64px] font-medium leading-normal">
            면접 매칭 중입니다.
          </span>
        </div>
        <div>
          <img className="relative right-0 top-5" src="/Ellipse 16.svg"></img>
          <div className=" flex gap-10 flex-row">
            <Avatars
              users={[
                {
                  name: "Colm Tuite",
                  image:
                    "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
                },
              ]}
              size="default"
            ></Avatars>
            <div className="flex items-start flex-col mt-[10px] gap-[15px] max-w-[400px]">
              <span>"데이터보다 사람 마음을 읽을 마케터를 꿈꿔요"</span>
              <ul className="flex gap-10">
                <li className="">대기업 희망</li>
                <li>UX/UI 디자인 직무</li>

                <li>인성 면접 준비</li>
              </ul>

              <Button>내 이력서 보기</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
export default Apps;
