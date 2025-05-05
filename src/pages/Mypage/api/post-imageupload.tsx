/** @format */

import { api } from "@/lib/api-client";
import {
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";
import { MutationConfig } from "@/lib/react-query";
import { useUser } from "@/lib/auth";

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
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
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
