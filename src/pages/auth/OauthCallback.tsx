/** @format */

import { useNavigate, useSearchParams } from "react-router";
import { useGetOauth } from "./api/get-oauth";
import { useEffect } from "react";
import { saveTokens } from "@/lib/authSerivices";

const OauthCallback = () => {
  const navigate = useNavigate();

  const [URLsearchParams] = useSearchParams();

  const token = URLsearchParams.get("token") ?? "";

  const { data, isSuccess } = useGetOauth({ params: token });

  useEffect(() => {
    if (isSuccess) {
      const token = data.headers["authorization"].replace("Bearer ", "");
      saveTokens(token);
      navigate("/", { replace: true });
    }
  }, [data]);

  return <div>OAuth 처리 중...</div>;
};

export default OauthCallback;
