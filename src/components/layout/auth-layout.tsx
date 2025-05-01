/** @format */

import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import { cn } from "@/utils/cn";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: React.ReactNode;
};

export const AuthLayout = ({
  children,
  title,
  subtitle,
  className,
}: LayoutProps) => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

//auth 에서 useUser를 하면 내정보를 불러오고, 
  const navigate = useNavigate();
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
      <div className="flex min-h-screen justify-center items-center">
        <div
          className={cn(
            "w-[588px] h-[600px]  shadow rounded px-16 py-[40px]",
            className
          )}
        >
          <div className="mb-[80px] text-center flex gap-[15px] flex-col ">
            <h2 className="  text-[32px] font-semibold text-gray-900">
              {title}
            </h2>
            <p className=" text-center leading-[30px] font-medium text-black text-[20px]">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
