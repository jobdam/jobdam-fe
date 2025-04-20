/** @format */

import React from "react";

const TermsContents = () => {
  return (
    <div className="max-h-[100px] border-box overflow-y-auto p-4  text-sm mb-[9px] bg-[#D9D9D9]">
      <h2 className="text-lg font-semibold mb-2">이용약관</h2>
      <p>
        본 이용약관은 귀하가 본 서비스를 이용함에 있어 필요한 권리, 의무 및
        책임사항, 기타 필요한 사항을 규정합니다.
      </p>

      <h3 className="font-semibold mt-4">제1조 (목적)</h3>
      <p>
        이 약관은 회사(이하 '회사')가 제공하는 서비스의 이용조건 및 절차,
        이용자와 회사의 권리∙의무 및 책임사항 등을 규정함을 목적으로 합니다.
      </p>

      <h3 className="font-semibold mt-4">제2조 (정의)</h3>
      <p>
        본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        <br />
        1. "서비스"라 함은 회사가 제공하는 모든 웹, 앱 기반의 기능을 말합니다.
        <br />
        2. "회원"이라 함은 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
      </p>

      <h3 className="font-semibold mt-4">제3조 (약관의 게시와 개정)</h3>
      <p>
        회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 내에 게시합니다.
        <br />
        회사는 필요 시 관련 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수
        있습니다.
      </p>

      <h3 className="font-semibold mt-4">제4조 (서비스의 제공 및 변경)</h3>
      <p>
        회사는 회원에게 아래와 같은 서비스를 제공합니다.
        <br />
        - 콘텐츠 제공 서비스
        <br />- 기타 회사가 정하는 서비스
      </p>

      <h3 className="font-semibold mt-4">...</h3>
      <p>
        (이곳에 추가 약관 내용을 이어서 작성하세요. 필요하다면 외부 JSON
        파일로도 분리 가능합니다.)
      </p>
    </div>
  );
};

export default TermsContents;
