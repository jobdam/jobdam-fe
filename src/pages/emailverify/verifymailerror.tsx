/** @format */
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { useVerifyEmail } from "./api/get-emailverify";
import VerifyExpired from "./components/verifyexpired";
import VerifyAlready from "./components/verifyalready";
import { AxiosError } from "axios";
const VerifyError = () => {
  //재발급할때는 기존토큰으로 다시 넣어서 재발급 받는다.
  //에러에는 2가지가 존재하니 2가지를 여기서 분기.

  const [URLsearchParams] = useSearchParams();

  const token = URLsearchParams.get("token") ?? "";
  const { isSuccess, isError, error, data, refetch } = useVerifyEmail({
    token,
  });
  const axiosError = error as AxiosError;
  const status = axiosError?.status;

  return (
    <>
      {status === 401 && <VerifyExpired refetch={refetch}></VerifyExpired>}
      {status === 404 && <VerifyAlready></VerifyAlready>}
    </>
  );
};

export default VerifyError;
