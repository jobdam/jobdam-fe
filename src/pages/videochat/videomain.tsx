/** @format */

import { useWebSocketConnect } from "@/services/useWebSocketConnect";
import { useEffect } from "react";

const Videomain = () => {
  useEffect(() => {
    useWebSocketConnect(true);
  }, []);
  return <div>여기는 비디오 메인입니다.</div>;
};

export default Videomain;
