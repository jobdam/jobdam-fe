/** @format */

import * as React from "react";
// import { useSearchParams } from "react-router";

import { cn } from "@/utils/cn";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: React.ReactNode;
  entry?: boolean;
  login?: boolean;
};

export const AuthLayout = ({
  children,
  title,
  subtitle,
  className,
  entry = false,
  login = false,
}: LayoutProps) => {
  //auth 에서 useUser를 하면 내정보를 불러오고,
  // const user = useUser();

  // useEffect(() => {
  //   if (user.data) {
  //     navigate(redirectTo ? redirectTo : paths.home.getHref(), {
  //       replace: true,
  //     });
  //   }
  // }, [user.data, navigate, redirectTo]);

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
          "flex min-h-screen justify-center items-center",
          entry && "bg-gradient-auth-entry ",
          login && "bg-gradient-auth-login"
        )}
      >
        <div
          className={cn(
            "w-[588px] max-h-[800px] rounded-[20px] absolute px-16 py-[52px] bg-white",
            className
          )}
        >
          {title ? (
            <div className="mb-[80px] text-center flex gap-[15px] flex-col ">
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
