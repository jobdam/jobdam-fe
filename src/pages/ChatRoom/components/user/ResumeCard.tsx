/** @format */

import { ChatUserInfo } from "@/types/chat";
import { X } from "lucide-react"; // 또는 heroicons
interface ResumeCardProps {
  user: ChatUserInfo;
  onClose: () => void;
}

export default function ResumeCard({ user, onClose }: ResumeCardProps) {
  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow border border-blue-200 w-[350px] relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-[#488FFF] hover:text-blue-700 text-xl font-bold"
      >
        <X size={20} />
      </button>

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
        <p>{user.introduce}</p>
      </div>
    </div>
  );
}
