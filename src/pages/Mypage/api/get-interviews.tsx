/** @format */

import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { InterviewDateGroup } from "@/types/interview";

//한번에 가져올 값
const LIMITPAGE = 5;
// 날짜별 인터뷰 그룹 리스트(무한스크롤)
export const getPagedInterviewGroups = async (
  lastId?: number
): Promise<InterviewDateGroup[]> => {
  // 쿼리스트링 생성
  let url = `/user/interviews/paged?limit=${LIMITPAGE}`;
  if (lastId) url += `&lastId=${lastId}`;
  const res = await api.get(url);
  return res.data;
};

export const useInterviewGroupsInfinite = (queryConfig = {}) => {
  return useInfiniteQuery<InterviewDateGroup[], Error>({
    queryKey: ["interview-groups"],
    queryFn: ({ pageParam }) =>
      getPagedInterviewGroups(pageParam as number | undefined),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.length) return undefined;
      const lastGroup = lastPage[lastPage.length - 1];
      const interviews = lastGroup.interviews;
      if (!interviews.length) return undefined;
      return interviews[interviews.length - 1].id;
    },
    initialPageParam: undefined,
    ...queryConfig,
  });
};
