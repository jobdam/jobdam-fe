/** @format */

interface ProfileCardProps {
  name: string;
  profileImgUrl: string;
  isReady?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ProfileCard({
  name,
  profileImgUrl,
  isReady = false,
  isSelected = false,
  onClick,
}: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-40 cursor-pointer transition
        ${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      {/* 준비 완료 표시 (왼쪽 상단 파란 동그라미) */}
      {isReady && (
        <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-blue-500" />
      )}

      <img
        src={profileImgUrl}
        alt={name}
        className="w-16 h-16 rounded-full mb-2"
      />
      <div className="font-semibold text-sm">{name}</div>
    </div>
  );
}
