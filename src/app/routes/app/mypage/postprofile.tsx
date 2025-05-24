/** @format */

import ProfilePost from "@/pages/Mypage/profilepost";

const PostProfile = () => {
  return (
    // 전체 레이아웃
    <div className="flex justify-center">
      {/* 정보 입력칸이 들어가는곳 */}
      <div className="w-[750px] h-[1572px]">
        {/* 제목 칸*/}
        <div className="mb-[52px] mt-[80px] ">
          <h2 className="  text-[32px] font-semibold text-gray-900">
            프로필을 입력해주세요.
          </h2>
        </div>
        <ProfilePost></ProfilePost>
      </div>
    </div>
  );
};

export default PostProfile;
