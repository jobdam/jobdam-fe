/** @format */

//스키마

// import { useQuery, queryOptions } from "@tanstack/react-query";
// import { api } from "@/lib/api-client";
// import { QueryConfig } from "@/lib/react-query"

// export const postProfileData = async() =>{

// const response =await api.post()

// }
/** @format */

import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

export const postProfile = (data: FormData) => {
  return api.post("/user/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export type UseUploadImageOptions = {
  mutationConfig?: MutationConfig<typeof postProfile>;
};
//사진을 등록하면 user 정보 최신화 필요.
export const usePostProfile = ({
  mutationConfig,
}: UseUploadImageOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      //무효화해서 실행
      queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: postProfile,
  });
};
