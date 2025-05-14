/** @format */

import { CustomImage } from "@/components/common/image/image";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { oauthLoginSchema } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GoogleSignin from "./components/googlesignin";
import NaverSignin from "./components/naversignin";

export const AuthEntry = () => {
  //네이버 카카오 Auth로그인
  const form = useForm({
    resolver: zodResolver(oauthLoginSchema),
  });

  //onSubmit Oauth

  return (
    <>
      <Form
        className="mt-[50px] flex justify-center items-center flex-col"
        form={form}
        onSubmit={(values) => {
          console.log(values);
        }}
        schema={oauthLoginSchema}
      >
        {() => (
          <>
            <div className="w-[263px] gap-[10px] h-[255px] flex flex-col items-center justify-center space-y-4">
              <CustomImage width={116} src="/graphic.svg"></CustomImage>
              <CustomImage width={264} src="/logo.png"></CustomImage>
            </div>

            <div className="mt-[50px] space-y-3">
              <GoogleSignin></GoogleSignin>

              <NaverSignin></NaverSignin>
            </div>

            <div className=" flex justify-center items-center">
              <Link
                className="underline text-[rgba(0,0,0,0.50)]  text-[20px]"
                to="/login"
              >
                이메일 로그인/회원가입
              </Link>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
