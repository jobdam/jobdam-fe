/** @format */

import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";
import ProfilePost from "@/pages/Mypage/profilepost";
import { useNavigate, useSearchParams } from "react-router";

const PostProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout
      profile={true}
      className=" text-left w-[700px] h-[1573px] "
      title="프로필을 입력해주세요"
    >
      <ProfilePost
        onSuccess={() => {
          navigate(redirectTo ? redirectTo : paths.home.getHref(), {
            replace: true,
          });
        }}
      ></ProfilePost>
    </AuthLayout>
  );
};

export default PostProfile;
