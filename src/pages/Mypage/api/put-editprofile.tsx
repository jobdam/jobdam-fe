/** @format */

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editProfile = (userId: string, updateData) => {
  return api.put(`/users/${userId}`, updateData);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof editProfile>;
};

export const useEditProfile = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: editProfile,
    onSuccess: (...args) => {
      // 유저 정보 쿼리 무효화 → 최신화
      //   queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
