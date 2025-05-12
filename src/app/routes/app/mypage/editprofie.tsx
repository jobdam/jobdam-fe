/** @format */

import MypageLayout from "@/components/layout/mypage-layout";
import ProfileEdit from "@/pages/Mypage/profileEdit";

const EditProfile = () => {
  return (
    <MypageLayout title="프로필 수정">
      <ProfileEdit></ProfileEdit>
    </MypageLayout>
  );
};

export default EditProfile;
