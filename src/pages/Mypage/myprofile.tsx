/** @format */

import { useUser } from "@/lib/auth";
import { useJobCategory } from "./api/get-jobcategory";
const labelMap: Record<string, string> = {
  name: "이름",
  phone: "휴대폰 번호",
  email: "이메일",
  birthday: "생년월일",
  job: "직무",
  education: "학교(전공)",

  targetCompanySize: "희망 기업",
};
const MyProfile = () => {
  //데이터 가공필요 , useUser에서 code를 주면 code를 jobcategory매칭해서
  //새로운 data [{ }] 쌍을 만들어 반환하기 useMemo? 쓰면 좋을듯.

  const { data: userData } = useUser();
  const { data: jobData } = useJobCategory({});

  console.log(userData, jobData);

  const job = jobData?.data.find((el) => {
    return el.jobCode === userData?.jobCode || "10026";
  });
  //job을찾고
  console.log(job);

  const jobDetail = job?.details?.find((el) => {
    return el.jobDetailCode === userData?.jobDetailCode || "100185";
  });

  console.log(jobDetail?.jobDetail);

  const profile = {
    name: userData?.name,
    phone: "010-0000-000",

    email: userData?.email,
    birthday: userData?.birthday,
    job: `${job?.jobGroup} / ${jobDetail?.jobDetail} `,
    targetCompanySize: userData?.targetCompanySize,
    education: userData?.educationLevel,
  };

  return (
    <div className="border-[1px] rounded-[20px] border-[#488FFF] pt-[38px] pb-[84px] px-[60px] max-h-[626px] w-[915px]">
      <ul className="flex gap-y-[30px] flex-col">
        {Object.entries(labelMap ?? {}).map(([key, value]) => {
          //   const value = userData?.[actualKey];
          console.log(key, value);
          return (
            <li
              key={key}
              className="flex flex-row border-b-1 pb-[16px] border-blue-500 "
            >
              <div className="w-[250px] leading-[150%] font-semibold text-[#488FFF] ">
                {" "}
                {value}
              </div>
              <div> {profile[key] ?? "없음"}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyProfile;
