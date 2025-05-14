/** @format */

import { useState } from "react";
import ResumeCard from "./ResumeCard";
import ProfileCard from "./Profilecard";
import { ChatUserInfo } from "@/types/chat";

interface UserPanelProps {
  userList: ChatUserInfo[];
  myUserId: number;
  onReady: (ready: boolean) => void;
}

interface ParticipantView {
  id: number;
  name: string;
  profileImgUrl: string;
  isReady: boolean;
}

const UserPanel = ({ userList, myUserId, onReady }: UserPanelProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isMeReady, setIsMeReady] = useState(false);

  const participants: ParticipantView[] = userList.map((user) => ({
    id: user.userId,
    name: user.name,
    profileImgUrl: user.profileImgUrl,
    isReady: user.ready,
  }));

  //내정보 골라내기
  const me = participants.find((p) => p.id === myUserId);
  //다른 유저정보 골라내기
  const others = participants.filter((p) => p.id !== myUserId);
  //둘의 정보를 합치기(null때문에)
  const allParticipants = [...(me ? [me] : []), ...others];

  //선택된 유저찾아서 정보보여주기
  const selectedUser = userList.find((u) => u.userId === selectedUserId);

  //준비상태 토글
  const handleToggleReady = () => {
    const newReady = !isMeReady;
    setIsMeReady(newReady);
    onReady(newReady);
  };

  return (
    <div className="w-[800px] bg-blue-50 p-4 flex flex-col justify-between h-full">
      {/* 상단 안내 */}
      <div>
        <div className="text-sm font-semibold mb-1 flex items-center gap-1">
          🕒 <span>면접 시작까지 00:10</span>
        </div>
        <p className="text-xs text-gray-600 mb-6">
          모두가 준비되면 바로 면접이 시작돼요.
        </p>
      </div>
      <div className="flex gap-4">
        {/* 프로필카드 리스트 */}
        <div className="flex flex-col gap-4 w-[200px] bg-blue-50 p-4 overflow-y-auto">
          {allParticipants.map((user) => (
            <ProfileCard
              key={user.id}
              name={user.id === myUserId ? "내 프로필" : user.name}
              profileImgUrl={user.profileImgUrl}
              isReady={user.isReady}
              isSelected={selectedUserId === user.id}
              onClick={() => setSelectedUserId(user.id)}
            />
          ))}
        </div>

        {/*이력서 카드 */}
        {selectedUser && (
          <div className="flex-1">
            <ResumeCard user={selectedUser} />
          </div>
        )}
      </div>

      {/* 준비 버튼 */}
      <button
        onClick={handleToggleReady}
        className={`w-full py-2 rounded-md mt-4 text-white 
    ${isMeReady ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isMeReady ? "준비 취소" : "준비됐어요"}
      </button>
    </div>
  );
};
export default UserPanel;
