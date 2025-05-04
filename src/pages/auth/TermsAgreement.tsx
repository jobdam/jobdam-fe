/** @format */

import { Form, Input } from "@/components/ui/form";
import * as React from "react";
import { type } from "../../store/index";
import { termsSchema } from "@/lib/auth";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "@/components/ui/link";
import { useNavigate } from "react-router";
import TermsContents from "@/constants/termsContents";
import PrivacyContents from "@/constants/privacyContents";

//약관동의는 로컬에서 확인만하고 넘어간다. 만약 db에 같이 넘기고싶다면 추가적인 방법 필요.
const TermsAgreement = () => {
  console.log("tersmagree");
  // 전체 동의 체크 시 나머지 체크박스도 true로
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅 사용
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);
  const [allChecked, setAllChecked] = React.useState(false);
  React.useEffect(() => {
    if (allChecked) {
      setAgreeTerms(true);
      setAgreePrivacy(true);
    } else {
      setAgreeTerms(false);
      setAgreePrivacy(false);
    }
  }, [allChecked]);

  // 각각 체크 상태 변경 시 전체 동의 자동 판단
  React.useEffect(() => {
    setAllChecked(agreeTerms && agreePrivacy);
  }, [agreeTerms, agreePrivacy]);

  const handleSubmit = () => {
    if (agreeTerms && agreePrivacy) {
      // 약관 동의가 완료되었을 경우, 다음 페이지로 이동
      navigate("/Signup"); // "/next-page"로 경로를 변경하세요.
    }
  };
  return (
    <div className=" flex flex-col gap-[140px]">
      {/* <Form
        onSubmit={() => {
          //전부다 동의 한경우
          console.log("✅ 제출 성공 약관 동의");
        }}
        schema={termsSchema}
      >
        {({ register, formState, watch }) => {
          const agreeTerms = watch("agreeTerms");
          const agreePrivacy = watch("agreePrivacy");
          const allChecked = watch("AllCheck");

          console.log(agreePrivacy, agreeTerms, allChecked); */}
      {/* // 전체 동의하기 체크박스 상태를 관리 return ( */}
      {/* <> */}

      <div className=" flex  flex-col gap-[15px]">
        <div>
          <Checkbox
            label="전체 동의하기"
            checked={allChecked}
            onCheckedChange={(checked) => setAllChecked(Boolean(checked))}
          ></Checkbox>
          <div className="w-[540px] min-h-[150px] border-box overflow-y-auto p-4 text-sm bg-[#D9D9D9]"></div>
        </div>

        <div>
          <Checkbox
            label="개인정보 약관"
            onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
            checked={agreeTerms}

            // disabled={formState.errors["agreeTerms"] ? true : false}
          ></Checkbox>
          <PrivacyContents></PrivacyContents>
        </div>
        <div>
          <Checkbox
            label="서비스이용 약관"
            onCheckedChange={(checked) => setAgreePrivacy(Boolean(checked))}
            checked={agreePrivacy}
            // disabled={formState.errors["agreePrivacy"] ? true : false}
          ></Checkbox>
          <TermsContents></TermsContents>
        </div>
      </div>
      <div className="flex gap-[130px] w-full">
        {/* Button 컴포넌트의 disabled 속성 조건을 올바르게 작성 */}
        <Button
          className="w-full min-h-[75px] flex justify-center items-center text-2xl text-center text-black bg-[#D9D9D9]"
          onClick={handleSubmit}
          disabled={!(agreeTerms && agreePrivacy)}
        >
          약관에 동의했어요
        </Button>
      </div>
    </div>
    //   {/* ); */}
    //   {/* }}
    //   </Form> */}
    // // </div>
  );
};

export default TermsAgreement;
