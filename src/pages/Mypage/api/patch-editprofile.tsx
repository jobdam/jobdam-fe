/** @format */

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const editProfile = (updateData) => {
  return api.patch(`/user/profile`, updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof editProfile>;
};

export const useEditProfile = ({ mutationConfig }: UseUpdateUserOptions) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: ({ updateData }: any) => editProfile(updateData),
    onSuccess: () => {
      // 유저 정보 쿼리 무효화 → 최신화
      queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
      navigate("/mypage");
    },
    ...restConfig,
  });
};
