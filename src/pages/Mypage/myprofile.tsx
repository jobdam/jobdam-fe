/** @format */

import { useUser } from "@/lib/auth";
import { useJobCategory } from "./api/get-jobcategory";
import { paths } from "@/config/paths";
import { Link } from "@/components/ui/link";
import { companySizeMap, educationMap } from "@/types/api";
import { formatBirthday } from "../../utils/format";
export const labelMap: Record<string, string> = {
  name: "이름",
  email: "이메일",
  birthday: "생년월일",
  job: "직무",
  education: "학교(전공)",
  experienceType: "경력 여부",
  targetCompanySize: "희망 기업",
};
const MyProfile = () => {
  //데이터가공필요 userData에 들어가는 데이터는 영어
  //target company size가

  const { data: userData } = useUser();
  const { data: jobData } = useJobCategory({});

  console.log(userData, jobData);

  const job = jobData?.data.find((el) => {
    return el.jobCode === userData?.jobCode;
  });
  //job을찾고
  console.log(job, "job");

  const jobDetail = job?.details?.find((el) => {
    return el.jobDetailCode === userData?.jobDetailCode;
  });

  //userData에서
  //formatbirthday 생년월일 , 타입 대문자로 바꾸면 해결
  const profile = {
    name: userData?.name,
    email: userData?.email,
    experienceType: userData?.experienceType,
    birthday: formatBirthday(userData?.birthday ?? ""),
    job: `${job?.jobGroup} / ${jobDetail?.jobDetail} `,
    targetCompanySize: companySizeMap[userData?.targetCompanySize ?? ""],
    education: educationMap[userData?.educationLevel ?? ""],
  };
  return (
    <div className="border-[1px] bg-[white] rounded-[20px] border-[#488FFF] pt-[38px] px-[60px] h-[670px] w-[915px]">
      <ul className="flex gap-y-[30px]  flex-col">
        <div className="flex justify-end">
          <Link
            to={paths.mypage.editdata.path}
            className=" cursor-pointer flex rounded-[30px] bg-[#488fff] justify-center items-center w-[102px] h-[42px] text-[16px] text-white font-semibold"
          >
            수정하기
          </Link>
        </div>

        {Object.entries(labelMap ?? {}).map(([key, value]) => {
          //   const value = userData?.[actualKey];
          console.log(key, value);
          return (
            <li
              key={key}
              className="flex flex-row border-b-1 pb-[16px] border-blue-500 "
            >
              <div className="w-[250px] pl-[15px] leading-[150%] font-semibold text-[#488FFF] ">
                {" "}
                {value}
              </div>
              <div> {profile[key] || "없음"}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyProfile;
