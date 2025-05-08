/** @format */

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

export const postProfileImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export type UseUploadImageOptions = {
  mutationConfig?: MutationConfig<typeof postProfileImage>;
};
//사진을 등록하면 user 정보 최신화 필요.
export const useUploadProfileImage = ({
  mutationConfig,
}: UseUploadImageOptions = {}) => {
  const { ...restConfig } = mutationConfig || {};
  return useMutation({
    // onSuccess: (...args) => {
    //   queryClient.invalidateQueries({
    //     queryKey: useUser,
    //   });
    //   onSuccess?.(...args);
    // },
    ...restConfig,
    mutationFn: postProfileImage,
  });
};
