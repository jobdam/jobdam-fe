/** @format */

// profileImage가 url로

import { Camera } from "lucide-react";
// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// type FormValues = {
//   profileImageUrl: string | null;
// };

const ProfileImageUpload = () => {
  // const form = useForm<FormValues>({
  //   defaultValues: {
  //     profileImageUrl: "", // 서버에서 받아온 초기 URL (있다면)
  //   },
  // });

  return (
    <>
      <div>
        <div className="relative w-[170px] rounded-full h-[170px] bg-[#D9D9D9]"></div>
        <Camera className="absolute text-black right-0" />
      </div>
    </>
  );
};

export default ProfileImageUpload;
