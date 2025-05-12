/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

//나의 프로필정보를 가져와서 매칭때 사용(필요한정보만 가져옴)
export const getMatchingProfile = async () => {
  const res = await api.get("/user/me/matching-profile");
  return res.data;
};

export const getMatchingProfileQuery = () =>
  queryOptions({
    queryKey: ["matching-profile"],
    queryFn: getMatchingProfile,
  });

export const useMatchingProfile = (
  queryConfig?: QueryConfig<typeof getMatchingProfile>
) => {
  return useQuery({
    ...getMatchingProfileQuery(),
    ...queryConfig,
  });
};
