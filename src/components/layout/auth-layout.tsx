/** @format */

import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const navigate = useNavigate();

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
        <div className="w-[588px] h-[600px] bg-[#D9D9D980] shadow rounded px-16 py-[40px]">
          <h2 className="mb-[80px]  text-center text-[32px] font-semibold text-gray-900">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </>
  );
};
