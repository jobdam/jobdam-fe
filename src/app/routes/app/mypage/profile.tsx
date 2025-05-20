/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import Myprofile from "@/pages/Mypage/myprofile";

const Profile = () => {
  return (
    <MypageLayout className="bg-gradient-auth-login" title="내 프로필">
      <Myprofile></Myprofile>
    </MypageLayout>
  );
};

export default Profile;
