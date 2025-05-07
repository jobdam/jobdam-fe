/** @format */

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
}

export default function ProfileCard({ name, role, image }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-40">
      <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2" />
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-gray-500">{role}</div>
    </div>
  );
}
