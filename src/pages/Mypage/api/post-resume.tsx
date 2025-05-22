/** @format */

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

import { addNotification } from "@/store/slices/notifications";
import { store } from "../../../store/index";

export const postResume = (data: FormData) => {
  return api.post("/user/resume", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export type UseUploadImageOptions = {
  mutationConfig?: MutationConfig<typeof postResume>;
};
//사진을 등록하면 user 정보 최신화 필요.
export const usePostResume = ({
  mutationConfig,
}: UseUploadImageOptions = {}) => {
  //   const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      store.dispatch(
        addNotification({
          type: "success",
          title: "업로드 성공",
          message: `5초 후에 사라집니다.`,
        })
      );
      console.log(...args);

      //성공하면 파일 이름과 함께 이미지가 등록
      //무효화해서 실행

      //   queryClient.invalidateQueries({ queryKey: [""] });
    },

    ...restConfig,
    mutationFn: postResume,
  });
};
