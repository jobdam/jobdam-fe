/** @format */

import { useNavigate } from "react-router";
import { useGetOauth } from "./api/get-oauth";

const OauthCallback = () => {
  console.log("여기에 도착");
  const navigate = useNavigate();

  const { data, isSuccess } = useGetOauth({});

  if (isSuccess) {
    navigate("/");
  }

  //데이털ㄹ 불러오는데 성공하면 다시 메인으로 넘어가기

  console.log(data);

  return <div>OAuth 처리 중...</div>;
};

export default OauthCallback;
