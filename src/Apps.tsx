/** @format */
import * as React from "react";
import { Button } from "@radix-ui/themes";

import LoggedOutHeader from "./components/common/header/LoggedOutHeader";
import { Checkbox, Radio, Textarea } from "./components/ui/form/index";
import { InterviewSpinner, Spinner } from "./components/ui/spinner";
import Avatars from "./components/ui/avatar/avatars";
import { SendHorizontal } from "lucide-react";
import { Plus } from "lucide-react";

import { useUser } from "@/lib/auth";
import { Link } from "react-router";
function Apps() {
  const user = useUser();
  console.log(user.data, "user");

  const [count, setCount] = React.useState(0);

  return (
    <div className=" min-h-[100vh] min-w-[1440px]">
      <LoggedOutHeader></LoggedOutHeader>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to="post-profile">마이페이지</Link>
      <Link to="/chatRoom">채팅방</Link>
      <Button>
        <Link to="/login">로그인페이지</Link>
      </Button>
      <Button>
        <Link to="/authEntry">로그인진입페이지</Link>
      </Button>
      <Button>
        <Link to="/termsAgreement">이용약관</Link>
      </Button>
      <div>
        <Radio
          // className={}
          options={[
            { label: "남성", value: "male" },
            { label: "여성", value: "female" },
            { label: "기타", value: "other" },
            { label: "선택 안 함", value: "none" },
          ]}
        ></Radio>
      </div>
      <Radio
        className="bg-[#D9D9D9] w-[216px] h-[156px] mr-[30px] flex justify-center pb-[40px] items-end"
        options={[
          { label: "인성", value: "personality" },
          { label: "직무", value: "female" },
          { label: "기타", value: "other" },
          { label: "선택 안 함", value: "none" },
        ]}
      ></Radio>
      <Textarea
        className="bg-[#D9D9D9] rounded-none h-[164px] border-none"
        label="입력해주세요"
      ></Textarea>
      <Spinner size="xl" variant="primary"></Spinner>
      <InterviewSpinner></InterviewSpinner>
      <Checkbox></Checkbox>
      <Checkbox checked={true} label="신청 완료"></Checkbox>
      <Checkbox checked={true} label="면접 준비"></Checkbox>
      <Checkbox></Checkbox>
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
        <Textarea
          placeholder="메세지를 입력하세요"
          className="bg-[#777777] rounded-[20px]
        placeholder:text-white placeholder:font-medium h-[122px] "
        ></Textarea>{" "}
        <SendHorizontal className="text-[#D9D9D9] w-[28.5px] h-[36px] absolute right-4 bottom-4 cursor-pointer z-10"></SendHorizontal>
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
      <div>{/* <Text>🕒 면접 시작 까지... {formatTime(seconds)}</Text> */}</div>
    </div>
  );
}
export default Apps;
