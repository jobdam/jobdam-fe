/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { ChatUserInfo } from "@/types/chat";

//나의 프로필정보를 가져와서 매칭때 사용(필요한정보만 가져옴)
export const getChatUserInfoList = async (
  roomId: string
): Promise<ChatUserInfo[]> => {
  const res = await api.get(`/chat/userInfos/${roomId}`);
  return res.data;
};

export const getChatUserInfoListQueryOptions = (roomId: string) =>
  queryOptions({
    queryKey: ["chat-userInfoList", roomId],
    queryFn: () => getChatUserInfoList(roomId),
  });

export const useMatchingProfileList = (
  roomId: string,
  queryConfig?: QueryConfig<typeof getChatUserInfoList>
) => {
  return useQuery({
    ...getChatUserInfoListQueryOptions(roomId),
    ...queryConfig,
  });
};
