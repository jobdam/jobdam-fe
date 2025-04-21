/** @format */

import { useState } from "react";
import { Flex, Text, Button, DropdownMenu } from "@radix-ui/themes";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Select } from "./components/ui/form/select";
import LoggedOutHeader from "./components/common/header/LoggedOutHeader";
import { RadioGroup, Textarea } from "./components/ui/form/index";

function App() {
  const [count, setCount] = useState(0);

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
      <Button>
        <Link to="/login">로그인페이지</Link>
      </Button>
      <Button>
        <Link to="/authEntry">로그인진입페이지</Link>
      </Button>
      <Button>
        <Link to="/termsAgreement">이용약관</Link>
      </Button>
      <Select options={["개발", "디자인", "기획"]} defaultValue="개발"></Select>
      <div>
        <RadioGroup
          // className={}
          options={[
            { label: "남성", value: "male" },
            { label: "여성", value: "female" },
            { label: "기타", value: "other" },
            { label: "선택 안 함", value: "none" },
          ]}
        ></RadioGroup>
      </div>

      <RadioGroup
        className="bg-[#D9D9D9] w-[216px] h-[156px] mr-[30px] flex justify-center pb-[40px] items-end"
        options={[
          { label: "인성", value: "personality" },
          { label: "직무", value: "female" },
          { label: "기타", value: "other" },
          { label: "선택 안 함", value: "none" },
        ]}
      ></RadioGroup>
      <Textarea
        className="bg-[#D9D9D9] rounded-none h-[164px] border-none"
        label="입력해주세요"
      ></Textarea>
    </div>
  );
}
export default App;
