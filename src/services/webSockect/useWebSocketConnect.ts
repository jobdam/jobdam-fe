/** @format */

import { AppDispatch, RootState } from "@/store";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "@/store/slices/websockets";
import { getAccessToken } from "@/lib/authSerivices";

const apiUrl = import.meta.env.VITE_API_URL;

//클라이언트 연결정보 참조
let globalClientRef: Client | null = null;
export const getWebSocketClient = () => globalClientRef;

export const useWebSocketConnect = (connect: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector((s: RootState) => s.websocket.isConnected);
  const hasActivatedRef = useRef(false); // 전역관리할때 지연로딩쓰면 부모쪽은 초기랜더링이2번됨 그걸 억지로 제거

  const disConnectHandler = () => {
    globalClientRef = null;
    hasActivatedRef.current = false;
    dispatch(setConnected(false));
  };

  useEffect(() => {
    if (!connect) {
      console.log("웹소켓 연결 취소요청!");
      globalClientRef?.deactivate();
      disConnectHandler();
      return;
    } else {
      if (hasActivatedRef.current) return; //두번로딩 방지!
      //연결요청을 받음
      if (isConnected) {
        //이미 연결되어있으면 종료.
        console.log("[웹소켓 연결 요청] : 이미 연결 되어 있습니다.");
        return;
      }

      //연결이 안되어 있으면 연결시도.
      const accessToken = getAccessToken();
      const sockjs = new SockJS(`${apiUrl}/ws`);
      console.log(accessToken);
      const client = new Client({
        webSocketFactory: () => sockjs,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        reconnectDelay: 0,
        onConnect: () => {
          console.log("웹소켓 Connect");
          globalClientRef = client; //클로저로 참조
          hasActivatedRef.current = true;
          dispatch(setConnected(true));
        },

        onDisconnect: () => {
          console.log("웹소켓 Disconnect");
          disConnectHandler();
        },

        onStompError: (frame) => {
          console.error(
            "웹소켓연결에러 차후에 refresh토큰발급등에 사용해야함",
            frame
          );
          disConnectHandler();
        },
      });
      client.activate(); //연결시작!
    }
  }, [connect, isConnected, dispatch]);
};
