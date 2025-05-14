/** @format */

// /** @format */

// //여기서는 dlapdl/** @format */
// import { useQuery, queryOptions } from "@tanstack/react-query";
// import { api } from "@/lib/api-client";
// import { QueryConfig } from "@/lib/react-query";

// //이메일 인증하기 get을통해 불러오고 인증을통해 넘어가게끔.
// export const getReVerifyEmail = async (token) => {
//   const response = await api.post("/resend-verification");

//   return response;
// };

// type UseVerifyEmailOptions = {
//   queryConfig?: QueryConfig<typeof getReVerifyEmail>;
// };

// export const getVerifyEmailQuery = () => {
//   return queryOptions({
//     queryKey: ["verify"],
//     queryFn: () => getReVerifyEmail(),
//     // 바로바로 요청
//     enabled: false,
//   });
// };

// export const useVerifyEmail = ({ queryConfig }: UseVerifyEmailOptions) => {
//   return useQuery({
//     ...getVerifyEmailQuery(),

//     ...queryConfig,
//   });
// };
