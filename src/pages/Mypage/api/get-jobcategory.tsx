/** @format */

import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryConfig } from "@/lib/react-query";

//직무 설정을 위한 데이터
export const getJobCategory = () => {
  return api.get("/jobs");
};
//카테고리가 쓰이는곳은(매칭 잡을때 , 프로필 설정 및 수정할때)
//
export const getJobCategoryQuery = () => {
  return queryOptions({
    queryKey: ["jobCategory"],
    queryFn: () => getJobCategory(),
    gcTime: 1000 * 60,
  });
};

type useJobCategoryOptions = {
  queryConfig?: QueryConfig<typeof getJobCategoryQuery>;
};

export const useJobCategory = ({ queryConfig }: useJobCategoryOptions) => {
  return useQuery({
    ...getJobCategoryQuery(),
    ...queryConfig,
  });
};
