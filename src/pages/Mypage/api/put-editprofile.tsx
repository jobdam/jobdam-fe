/** @format */

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

const editProfile = (userId, updateData) => {
  return api.put(`/users/${userId}`, updateData);
};

type UseUpdateUserOptions = {
  userId: number;
  updateData: any;
  mutationConfig?: MutationConfig<typeof editProfile>;
};

export const useEditProfile = ({ mutationConfig }: UseUpdateUserOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: ({ userId, updateData }: { userId: number; updateData: any }) =>
      editProfile(userId, updateData),
    onSuccess: (...args) => {
      // 유저 정보 쿼리 무효화 → 최신화
      //   queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
