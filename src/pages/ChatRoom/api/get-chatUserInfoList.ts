/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { ChatUserInfo } from "@/types/chat";

//유저정보를 전부가져온다 room에 있는
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
