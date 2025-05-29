/** @format */

import {
  UseMutationOptions,
  DefaultOptions,
  QueryClient,
  useQueryClient as useBaseQueryClient,
} from "@tanstack/react-query";

// ! gctime에 대하여

// 자주 갱신되는 데이터	1분	5분
// 잘 안 바뀌는 데이터	10분	30분
// 민감한 데이터 (보안 등)	30초	1분
// 거의 안 바뀌는 코드북 등	1시간	24시간

// refetchOnWindowFocus: false	사용자가 브라우저 탭을 다시 포커싱할 때 데이터를 자동으로 다시 가져오지 않음	불필요한 refetch 방지 → 성능 최적화에 좋음
// retry: false	요청 실패 시 재시도하지 않음	API가 404나 400 등으로 실패했을 때 자동 재요청 X
// staleTime: 1000 * 60	데이터를 신선하다고 간주하는 시간 (1분)	1분 동안은 같은 queryKey로 요청해도 네트워크 요청 안 하고 캐시만 사용함
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 30,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const useQueryClient = (): QueryClient => {
  return useBaseQueryClient();
};
