/** @format */

import React from "react";

const PrivacyContents = () => {
  return (
    <div className="max-h-[100px] border-box overflow-y-auto p-4 text-sm mb-[9px] bg-[#D9D9D9]">
      <h2 className="text-base font-semibold mb-2">개인정보 처리방침</h2>
      <p>
        본 서비스는 사용자의 개인정보를 중요시하며, 「개인정보 보호법」을
        준수하고 있습니다.
      </p>
      <p>
        수집하는 개인정보 항목은 이름, 이메일 주소, 전화번호 등이며, 이는 서비스
        제공을 위한 최소한의 정보입니다.
      </p>
      <p>
        수집한 개인정보는 다음의 목적에 따라 활용됩니다: 회원 관리, 서비스 제공,
        민원 처리 등.
      </p>
      <p>
        사용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제 요청할 수 있습니다.
      </p>
      <p>
        개인정보의 보관 기간은 수집 및 이용 목적이 달성될 때까지이며, 관련
        법령에 따라 일정 기간 동안 보관됩니다.
      </p>
      <p>더 자세한 내용은 개인정보 처리방침 전문을 참고해주세요.</p>
    </div>
  );
};

export default PrivacyContents;
