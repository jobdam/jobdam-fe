import { useEffect, useState } from "react";

/** @format */
const InterviewTimer = () => {
  const [seconds, setSeconds] = useState(0);

  // 타이머 시작
  useEffect(() => {
    const interval = setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 초기화 함수
  const handleReset = () => {
    setSeconds(0);
  };

  // 분:초 포맷 변환
  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className="flex items-center justify-center space-x-2 cursor-pointer"
      onClick={handleReset}
      title="클릭 시 시간 초기화"
    >
      <span className="text-sm">🕒</span>
      <span className="font-bold text-sm">
        면접 시간: {formatTime(seconds)}
      </span>
    </div>
  );
};

export default InterviewTimer;
