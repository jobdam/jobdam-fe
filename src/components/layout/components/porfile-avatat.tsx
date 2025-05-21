/** @format */

import { useUser } from "@/lib/auth";

const ProfileAvatar = () => {
  const { data } = useUser();
  console.log(data?.profileImgUrl);
  //profile이 존쟇면 프로 필로 존재하지않으면 없애도록
  //profile edit 페이지로 가면 eidt
  return (
    <>
      <div className="w-[150px] h-[150px] mb-[43px] bg-[] rounded-full bg-[#D9D9D9]">
        {!data?.profileImgUrl && (
          <img src={data?.profileImgUrl || "/public/react.svg"}></img>
        )}
      </div>
    </>
  );
};
export default ProfileAvatar;
