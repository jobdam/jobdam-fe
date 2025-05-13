/** @format */

import { Button } from "@/components/ui/button";
import { labelMap } from "./myprofile";
import { useUser } from "@/lib/auth";
import { useJobCategory } from "./api/get-jobcategory";

const ProfileEdit = () => {
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
        <div className="flex justify-end">
          <Button
            className=" cursor-pointer border-[1px] bg-white flex rounded-[10px] justify-center 
          items-center text-[#488fff] w-[74px] h-[30px] text-[16px]  font-semibold"
          >
            저장
          </Button>
        </div>

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

export default ProfileEdit;
