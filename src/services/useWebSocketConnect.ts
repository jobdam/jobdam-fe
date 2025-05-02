import { AppDispatch, RootState } from "@/store";
import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, Frame, StompSubscription } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "@/store/slices/websockets";

const apiUrl = import.meta.env.VITE_API_URL;

export const useWebSocketConnect = (connect: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector((s: RootState) => s.websocket.isConnected);
  const clientRef = useRef<Client | null>(null); //랜더링과 무관하게 연결을 저장하기위해사용
  const hasActivatedRef = useRef(false); // 전역관리할때 지연로딩쓰면 부모쪽은 초기랜더링이2번됨 그걸 억지로 제거

  useEffect(() => {
    if (!connect) {
      console.log("웹소켓 연결 취소요청!");
      clientRef.current?.deactivate();
      clientRef.current = null;
      hasActivatedRef.current = false;
      dispatch(setConnected(false));
      return;
    } else {
      if (hasActivatedRef.current) return; //두번로딩 방지!
      //연결요청을 받음
      if (isConnected || clientRef.current) {
        //이미 연결되어있으면 종료.
        console.log("[웹소켓 연결 요청] : 이미 연결 되어 있습니다.");
        return;
      }

      //연결이 안되어 있으면 연결시도.
      const accessToken = localStorage.getItem("accessToken");
      const sockjs = new SockJS(`${apiUrl}/ws`);

      const client = new Client({
        webSocketFactory: () => sockjs,
        connectHeaders: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6IkFDQ0VTU19UT0tFTiIsInVzZXJJZCI6NSwiaWF0IjoxNzQ2MTU3NTI3LCJleHAiOjE3NDYyNDM5Mjd9.rYbJBrmwauk87Ni7jHkyLPbKyyjxhWj2p_xUcdS44hs`,
        },
        reconnectDelay: 0,
        onConnect: () => {
          console.log("웹소켓 Connect");
          clientRef.current = client; //클로저로 참조
          hasActivatedRef.current = true;
          dispatch(setConnected(true));
        },

        onDisconnect: () => {
          console.log("웹소켓 Disconnect");
          clientRef.current = null;
          hasActivatedRef.current = false;
          dispatch(setConnected(false));
        },

        onStompError: (frame) => {
          console.error("웹소켓연결에러 차후에 refresh토큰발급등에 사용해야함");
          clientRef.current = null;
          hasActivatedRef.current = false;
          dispatch(setConnected(false));
        },
      });
      client.activate(); //연결시작!
    }
  }, [connect, isConnected, dispatch]);

  return clientRef;
};
