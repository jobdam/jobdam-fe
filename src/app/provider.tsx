/** @format */

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@/components/ui/notification";
import { MainErrorFallback } from "@/components/errors/main";
import { ErrorBoundary } from "react-error-boundary";
import LoadingGradient from "@/components/ui/spinner/loadingSpinner";

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
    <React.Suspense fallback={<LoadingGradient></LoadingGradient>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.VITE_ENV && <ReactQueryDevtools />}
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Notifications />
            {children}
          </HydrationBoundary>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
