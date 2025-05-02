import { AppDispatch, RootState } from "@/store";
import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, Frame, StompSubscription } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "@/store/slices/websockets";

const apiUrl = import.meta.env.VITE_API_URL;

const WebSocketConnector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { purpose, roomId } = useSelector((s: RootState) => s.websocket);
  const clientRef = useRef<Client | null>(null); //랜더링과 무관하게 연결을 저장하기위해사용
  const subRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    //연결 코드
    const sockjs = new SockJS(`${apiUrl}/ws`);
    const client = new Client({
      webSocketFactory: () => sockjs,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 0,
      onConnect: () => {
        console.log("웹소켓 연결 성공");
        dispatch(setConnected(true));
      },

      onDisconnect: () => {
        dispatch(setConnected(false));
      },

      onStompError: (frame) => {
        console.error("er");
        dispatch(setConnected(false));
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      //언마운트시에만 호출됨
      client.deactivate();
      dispatch(setConnected(false));
      clientRef.current = null;
    };
  }, [dispatch]);

  useEffect(() => {
    const client = clientRef.current;
    if (!client || !client.connected || !roomId) return;

    //이전 구독 해제
    subRef.current?.unsubscribe();

    //새로운 주제(topic)로 구독
    let prifix = "";
    if (purpose === "signal") {
      prifix = "/user/queue";
    } else {
      prifix = "/topic";
    }
    const destination = `${prifix}/${purpose}/${roomId}`;

    subRef.current = client.subscribe(
      destination,
      (msg) => {
        const body = JSON.parse(msg.body);
      },
      {
        ack: "auto",
      }
    );

    // cleanup: purpose/roomId가 바뀌기 직전에 이전 구독 해제
    return () => {
      subRef.current?.unsubscribe();
      subRef.current = null;
    };
  }, [purpose, roomId, dispatch]);

  return null;
};

export default WebSocketConnector;
