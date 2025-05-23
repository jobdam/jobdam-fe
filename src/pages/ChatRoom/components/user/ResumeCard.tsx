/** @format */

import { ChatUserInfo } from "@/types/chat";
import { expMap, educationMap, companySizeMap } from "@/types/api";

interface ResumeCardProps {
  user: ChatUserInfo;
}

export default function ResumeCard({ user }: ResumeCardProps) {
  return (
    <div
      className="mt-2 ml-2 p-6 bg-white rounded-2xl shadow border border-[#488FFF] 
      min-w-[280px] w-[80%] relative"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.profileImgUrl}
          alt={user.name}
          className="w-16 h-16 rounded-2xl"
        />
        <div>
          <div className="text-sm font-bold text-gray-800">
            {user.jobGroup} {user.jobDetail}
          </div>
          <div className="text-sm font-semibold text-gray-700">
            {user.name}님
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-800">
        <strong>자기소개</strong>
        <p className="mb-4">{user.introduce}</p>

        <div className="flex flex-col gap-2">
          <div className="inline-block w-fit px-3 py-2 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg border border-blue-300">
            {expMap[user.experienceType]}
          </div>
          <div className="inline-block w-fit px-3 py-2 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg border border-blue-300">
            🎓 {educationMap[user.educationLevel]} · {user.educationStatus}
          </div>

          <div className="inline-block w-fit px-3 py-2 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg border border-blue-300">
            {companySizeMap[user.targetCompanySize]} 희망
          </div>
        </div>
      </div>
    </div>
  );
}
