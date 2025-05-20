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
    <div className={`relative flex flex-col items-center p-4 `}>
      <div onClick={onClick}>
        {/* 준비 완료 표시 (왼쪽 상단 파란 동그라미) */}
        {isReady && (
          <div className="absolute w-4 h-4 rounded-full bg-blue-500" />
        )}
        <img
          src={profileImgUrl}
          alt={name}
          className={`w-16 h-16 rounded-full mb-2 cursor-pointer transition border-3 ${
            isSelected ? "border-blue-500" : "border-transparent"
          }`}
        />
      </div>
      <div className="font-semibold text-sm">{name}</div>
    </div>
  );
}
