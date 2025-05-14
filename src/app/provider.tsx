/** @format */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";

import * as React from "react";
import { Spinner } from "@/components/ui/spinner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthLoader } from "@/lib/auth";
// import { Notifications } from "@/components/ui/notification";
import { MainErrorFallback } from "@/components/errors/ main";
import { ErrorBoundary } from "react-error-boundary";

type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.VITE_ENV && <ReactQueryDevtools />}
          {/* <Notifications /> */}

          {children}
          {/* <AuthLoader
            renderLoading={() => (
              <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="xl" />
              </div>
            )}
          >
            {children}
          </AuthLoader> */}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
