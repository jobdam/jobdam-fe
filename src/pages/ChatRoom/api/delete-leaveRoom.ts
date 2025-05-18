/** @format */

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

//방나가기
export const deleteLeaveRoom = async (roomId: string): Promise<void> => {
  await api.delete(`/chat/${roomId}`);
};

type UseLeaveRoomOptions = {
  mutationConfig?: MutationConfig<typeof deleteLeaveRoom>;
};

export const useLeaveRoomMutation = ({
  mutationConfig,
}: UseLeaveRoomOptions = {}) => {
  return useMutation<void, Error, string>({
    mutationFn: deleteLeaveRoom,
    ...mutationConfig,
  });
};
