/** @format */

import { CustomImage } from "@/components/common/image/image";
import { Form } from "@/components/ui/form";
import { Link } from "@/components/ui/link";
import { oauthLoginSchema } from "@/lib/auth";
import { UseFormReturn } from "react-hook-form";

export const AuthEntry = () => {
  //네이버 로그인(이미지), 카카오 로그인,(이미지) 이메일 로그인

  //onSubmit Oauth

  return (
    <>
      <Form
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
              <CustomImage
                className="cursor-pointer"
                src="/카카오 시작하기.png"
              ></CustomImage>

              <CustomImage
                className="cursor-pointer"
                src="/네이버 시작하기.png"
              ></CustomImage>
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
