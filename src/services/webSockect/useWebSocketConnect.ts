/** @format */

import { AppDispatch, RootState } from "@/store";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "@/store/slices/websockets";
import { getAccessToken, refreshAccessToken } from "@/lib/authSerivices";

const apiUrl = import.meta.env.VITE_API_URL;

//클라이언트 연결정보 참조
let globalClientRef: Client | null = null;
export const getWebSocketClient = (): Client | null => globalClientRef;

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
    let retryCount = 0;
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
      const connectWebSocket = async () => {
        let accessToken = getAccessToken();
        let client: Client | null = null;

        const sockjs = new SockJS(`${apiUrl}/ws`);
        client = new Client({
          webSocketFactory: () => sockjs,
          connectHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
          reconnectDelay: 0,
          onConnect: () => {
            globalClientRef = client!;
            hasActivatedRef.current = true;
            dispatch(setConnected(true));
          },
          onDisconnect: () => {
            disConnectHandler();
          },
          onStompError: async (frame) => {
            // 1) 최초 에러 → Refresh 시도
            console.log("토큰 재발급 요청!", frame);
            if (retryCount === 0) {
              retryCount += 1;
              await refreshAccessToken(); // 이 함수는 refreshToken으로 accessToken 재발급, 실패 시 로그아웃 등
              // accessToken 갱신 후 재연결
              setTimeout(connectWebSocket, 0); // 다시 connect 시도
            } else {
              // 2) 그래도 실패 → 에러 알림 및 로그아웃 등
              disConnectHandler();
            }
          },
        });
        client.activate();
      };

      connectWebSocket();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [connect, isConnected, dispatch]);
};
