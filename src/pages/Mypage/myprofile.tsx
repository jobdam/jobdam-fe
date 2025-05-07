/** @format */

import { useUser } from "@/lib/auth";
const labelMap: Record<string, string> = {
  name: "이름",
  phone: "전화번호",
  email: "이메일",
  birth: "생년월일",
  job: "직무",
  targetCompany: "목표 기업",
};
const MyProfile = () => {
  const profile = useUser();
  //   const profile = data[0];
  //user데이터가 있으면 그대로 사용가능

  return (
    <div className="bg-[#f3f3f3] py-[64px] px-[40px] h-[500px] w-[915px]">
      <ul className="flex gap-y-[30px] flex-col">
        {Object.entries(profile).map(([key, value]) => {
          return (
            <li key={key} className="flex flex-row">
              <div className="w-[120px] ]"> {labelMap[key] ?? key}</div>
              <div>{value}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyProfile;
