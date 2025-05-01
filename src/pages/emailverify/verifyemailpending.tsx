/** @format */

import { Button } from "@/components/ui/button";

export default function VerifyEmailPending() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-2xl font-bold mb-4">이메일 인증이 필요합니다</h1>
      <p className="mb-6">
        입력하신 이메일로 인증 링크를 보냈어요.
        <br />
        받은 편지함을 확인해주세요.
      </p>
      <Button onClick={() => window.location.reload()}>
        인증 완료 후 계속하기
      </Button>
    </div>
  );
}
