/** @format */

import { ChatUserInfo } from "@/types/chat";
import { Strong } from "@radix-ui/themes";

interface ResumeCardProps {
  user: ChatUserInfo;
}

export default function ResumeCard({ user }: ResumeCardProps) {
  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow border border-blue-200 w-[380px]">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.profileImgUrl}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <div className="text-sm font-bold text-gray-800">
            {user.jobGroup} {user.jobDetail}
          </div>
          <div className="text-sm font-semibold text-gray-600">
            {user.name}님
          </div>
          <br />
          <div className="text-sm font-semibold text-gray-600">
            <Strong>소개</Strong>
            <p>{user.introduce}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
