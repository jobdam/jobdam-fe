/** @format */

import { paths } from "@/config/paths";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// clientLoader: 라우터에서 사용하는 데이터 로딩 함수
// clientAction: 라우터에서 사용하는 form action 함수
// default: 기본 컴포넌트 → Component라는 이름으로 바뀜
// ...rest: 나머지 속성들 (예: path, errorElement 등)

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("@/App").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () =>
        import("@/app/routes/app/auth/signin").then(convert(queryClient)),
    },
    {
      path: paths.auth.entry.path,
      lazy: () =>
        import("@/app/routes/app/auth/authEntry").then(convert(queryClient)),
    },
    {
      path: paths.auth.TermsAgreement.path,
      lazy: () =>
        import("@/app/routes/app/auth/termsAgreement").then(
          convert(queryClient)
        ),
    },
    {
      path: paths.interview.main.path,
      lazy: () =>
        import("@/app/routes/app/interview/index").then(convert(queryClient)),
    },
  ]);
};
export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
