/** @format */

import { CustomImage } from "@/components/common/image/image";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { oauthLoginSchema } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
        form={form}
        onSubmit={(values) => {
          console.log("Oauth");
        }}
        schema={oauthLoginSchema}
      >
        {({ register, formState }) => (
          <>
            <div className="mt-[50px] flex flex-col items-center justify-center space-y-4">
              <CustomImage
                width={110}
                height={160}
                src="/graphic.png"
              ></CustomImage>
              <CustomImage
                width={270}
                height={50}
                src="/logo.png"
              ></CustomImage>
            </div>

            <div className="mt-[50px] space-y-3">
              <GoogleSignin></GoogleSignin>

              <NaverSignin></NaverSignin>
            </div>

            <div className="mt-[80px] text-sm flex justify-center items-center">
              <Link className="underline" to="/login">
                이메일 로그인/회원가입
              </Link>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
