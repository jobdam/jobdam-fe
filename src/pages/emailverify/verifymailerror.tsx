/** @format */
import { useSearchParams } from "react-router";
import { useVerifyEmail } from "./api/get-emailverify";
import VerifyExpired from "./components/verifyexpired";
import VerifyAlready from "./components/verifyalready";
import { AxiosError } from "axios";
const VerifyError = () => {
  //여기서 분기하고 expired에서 재발급 버튼을 누르면 재발급 되도

  const [URLsearchParams] = useSearchParams();

  const token = URLsearchParams.get("token") ?? "";
  const { error, refetch } = useVerifyEmail({
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
