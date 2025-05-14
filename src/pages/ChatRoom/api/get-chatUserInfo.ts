/** @format */
import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { ChatUserInfo } from "@/types/chat";

//나의 프로필정보를 가져와서 매칭때 사용(필요한정보만 가져옴)
export const getChatUserInfo = async (
  roomId: string,
  userId: number
): Promise<ChatUserInfo> => {
  const res = await api.get(`/chat/userInfo/${roomId}/${userId}`);
  return res.data;
};

export const getChatUserInfoQueryOptions = (roomId: string, userId: number) =>
  queryOptions({
    queryKey: ["chat-userInfo", roomId, userId],
    queryFn: () => getChatUserInfo(roomId, userId),
  });

export const useMatchingProfile = (
  roomId: string,
  userId: number,
  queryConfig?: QueryConfig<typeof getChatUserInfo>
) => {
  return useQuery({
    ...getChatUserInfoQueryOptions(roomId, userId),
    ...queryConfig,
  });
};
