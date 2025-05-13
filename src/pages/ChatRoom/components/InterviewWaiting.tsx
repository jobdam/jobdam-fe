/** @format */

import { useState } from "react";
import ProfileCard from "./profilecard";

interface UserProfile {
  id: number;
  name: string;
  role: string;
  image: string;
  isMe: boolean;
}

const InterviewWaiting = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const participants = [
    { id: 1, name: "김지윤님", profileImgUrl: "/user1.jpg", isReady: true },
    { id: 2, name: "오예린님", profileImgUrl: "/user2.jpg", isReady: false },
  ];
  //role을 나눠서 guest는 아래쪽에, me는 보기쉽게 위쪽에 배치
  return (
    <div className="flex flex-col items-center gap-y-8 p-8 bg-gray-100 min-h-screen">
      {/* 내 프로필 (위쪽) */}
      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">내 프로필</h2>/
      </div>

      {/* 나머지 사람들 프로필 (아래쪽) */}
      <div className="items-center gap-y-6"></div>
    </div>
  );
};
export default InterviewWaiting;

{
  /* {data.map((el) => {
        //여기 me일때는 위에 존재하고 아래 guest일때는 아래로 나누는 방법
        if (el.role === "me") {
          return (
            <div className="text-center">
              <div key={el.id}>
                <div>{el.profile}</div>
              </div>
              <div>
                <div>{el.name}</div>
                <div>{el.job}</div>
                <div>이력서 요약 보기</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-row gap-y-6">
              <div className="grid grid-cols-3" key={el.id}>
                <div>
                  <div>{el.profile}</div>
                </div>
                <div>
                  <div>{el.name}</div>
                  <div>{el.job}</div>
                  <div>이력서 요약 보기</div>
                </div>
              </div>
            </div>
          );
        }
      })} */
}
