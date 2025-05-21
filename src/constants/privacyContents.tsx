/** @format */

const PrivacyPolicy = () => {
  return (
    <div className="space-y-6 text-sm text-gray-800 leading-relaxed max-w-3xl mx-auto p-4 ">
      <p>
        개인정보보호법에 따라 잡담에 회원가입 신청하시는 분께 수집하는
        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
        이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
      </p>

      <details open>
        <summary className="font-semibold cursor-pointer">
          1. 수집하는 개인정보
        </summary>
        <div className="pl-4 mt-2 space-y-2">
          <p>
            회원가입 시 필수항목: 아이디, 비밀번호, 이름, 생년월일, 성별,
            휴대전화번호
            <br />
            선택항목: 본인확인 이메일주소
          </p>
          <p>
            비밀번호 없이 가입 시: 아이디, 이름, 생년월일, 휴대전화번호(필수),
            비밀번호(선택)
          </p>
          <p>
            서비스 이용 중 수집: 별명, 프로필 사진, IP 주소, 쿠키, 기기정보,
            위치정보, 서비스 이용 기록 등
          </p>
          <p>이미지·음성 검색 시 해당 이미지 및 음성도 수집될 수 있음</p>
        </div>
      </details>

      <details>
        <summary className="font-semibold cursor-pointer">
          2. 개인정보의 이용 목적
        </summary>
        <div className="pl-4 mt-2 space-y-2">
          <ul className="list-disc list-inside">
            <li>회원관리: 본인확인, 회원 식별, 탈퇴 의사 확인 등</li>
            <li>서비스 제공 및 개선: AI 기술 포함</li>
            <li>부정 이용 방지 및 서비스 운영</li>
            <li>유료 서비스 결제 및 배송</li>
            <li>이벤트 및 광고성 정보 제공</li>
            <li>맞춤형 서비스 제공 및 통계 분석</li>
            <li>보안 및 안정성 확보</li>
          </ul>
        </div>
      </details>

      <details>
        <summary className="font-semibold cursor-pointer">
          3. 개인정보 보관 기간
        </summary>
        <div className="pl-4 mt-2 space-y-2">
          <ul className="list-disc list-inside">
            <li>회원 탈퇴 시 지체없이 파기</li>
            <li>부정 가입 방지 목적: DI, 휴대전화번호 등 6개월</li>
            <li>통신사 정보: 1년</li>
            <li>전자상거래 기록: 최대 5년</li>
            <li>전자문서 유통 기록: 10년</li>
            <li>로그인 기록: 3개월</li>
          </ul>
        </div>
      </details>

      <details>
        <summary className="font-semibold cursor-pointer">
          4. 동의 거부 시 불이익
        </summary>
        <div className="pl-4 mt-2">
          <p>
            이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다.
            그러나 필수 항목에 대한 동의를 거부할 경우 회원가입이 제한될 수
            있습니다.
          </p>
        </div>
      </details>
    </div>
  );
};

export default PrivacyPolicy;
