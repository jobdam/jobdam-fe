/** @format */

import * as React from "react";
// import { useSearchParams } from "react-router";

import { cn } from "@/utils/cn";
import { useUser } from "@/lib/auth";
import { useNavigate, useSearchParams } from "react-router";
import { paths } from "@/config/paths";
import { useLocation } from "react-router";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: React.ReactNode;
  entry?: boolean;
  login?: boolean;
  profile?: boolean;
};

export const AuthLayout = ({
  children,
  title,
  subtitle,
  className,
  profile,
  entry = false,
  login = false,
}: LayoutProps) => {
  //auth 에서 useUser를 하면 내정보를 불러오고,
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();
  const location = useLocation();
  //auth 영역은 useUser에서 제외한다.
  const shouldRunAuth = ![
    "/auth/login",
    "/auth/register",
    "/auth/sign-up",
    "/auth/authEntry",
    "/auth/oauth-callback",
    "/verify",
    "/verify/*",
  ].includes(location.pathname);

  const { data } = shouldRunAuth ? useUser() : { data: null };

  // const { data } = useUser();

  React.useEffect(() => {
    if (data) {
      navigate(redirectTo ? redirectTo : paths.home.getHref(), {
        replace: true,
      });
    }
  }, [navigate, redirectTo]);

  // console.log(user);
  //   useEffect(() => {
  //     if (user.data) {
  //       navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
  //         replace: true,
  //       });
  //     }
  //   }, [user.data, navigate, redirectTo]);

  return (
    <>
      <div
        className={cn(
          "flex w-full h-[1370px]  justify-center items-center",
          entry && "bg-gradient-auth-entry ",
          login && "bg-gradient-auth-login"
        )}
      >
        <div
          className={cn(
            "w-[588px]  rounded-[20px] absolute px-16 py-[52px] bg-white",
            className
          )}
        >
          {title ? (
            <div
              className={cn(
                "mb-[80px] text-center flex gap-[15px] flex-col",

                profile && "text-left"
              )}
            >
              <h2 className="  text-[32px] font-semibold text-gray-900">
                {title}
              </h2>
              <p className=" text-center leading-[30px] font-medium text-black text-[20px]">
                {subtitle}
              </p>
            </div>
          ) : (
            <></>
          )}
          {children}
        </div>
      </div>
    </>
  );
};
