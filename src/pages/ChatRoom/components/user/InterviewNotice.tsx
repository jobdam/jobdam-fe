import { useEffect, useState } from "react";

interface InterviewNoticeProps {
  created: Date;
  onStartInterview: () => void;
}

const INTERVIEW_WAIT_MINUTES = 10;

const InterviewNotice = ({
  created,
  onStartInterview,
}: InterviewNoticeProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const diffMs =
      INTERVIEW_WAIT_MINUTES * 60 * 1000 -
      (Date.now() - new Date(created).getTime());
    return Math.max(Math.floor(diffMs / 1000), 0);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - new Date(created).getTime()) / 1000
      );
      const newRemaining = Math.max(
        0,
        INTERVIEW_WAIT_MINUTES * 60 - elapsedSeconds
      );
      setRemainingSeconds(newRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [created]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      // 면접 시작 신호를 여기서 보낼 수 있음 (옵션)
      onStartInterview();
    }
  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${
    isNaN(minutes) ? "00" : String(minutes).padStart(2, "0")
  }:${isNaN(seconds) ? "00" : String(seconds).padStart(2, "0")}`;

  return (
    <div>
      <div className="text-sm font-semibold mb-1 flex items-center gap-1">
        🕒 <span>면접 시작까지 {formattedTime}</span>
      </div>
      <p className="text-xs text-gray-600 mb-6">
        모두가 준비되면 바로 면접이 시작돼요.
      </p>
    </div>
  );
};

export default InterviewNotice;
