/** @format */

import { AuthLayout } from "@/components/layout/auth-layout";
import ProfilePost from "@/pages/Mypage/profilepost";

const PostProfile = () => {
  return (
    <AuthLayout className="w-[950px]" title="프로필을 입력해주세요">
      <ProfilePost></ProfilePost>
    </AuthLayout>
  );
};

export default PostProfile;
