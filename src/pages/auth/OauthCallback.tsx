/** @format */

import { api } from "@/lib/api-client";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OauthCallback = () => {
  const email = "test1@gmail.com";

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("state"), searchParams.get("code"));
  //구글 네이버 분기를 해야한다.
  //   const state = searchParams.get("state");

  useEffect(() => {
    // if (state === "google") {
    //   const response = api.get("/oauth2/authorization/google");
    //   //로그인하면 성공후 token발급.

    //   // getAccessToken(response)
    //   console.log(response);
    // }

    // if (state === "naver") {
    const response = api.post("/user/profile", email);

    console.log(response);
    // }
  }, []);

  return <div>OAuth 처리 중...</div>;
};

export default OauthCallback;
