/** @format */

import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'

import progressReducer from "./slices/progress";
import notificationReducer from "./slices/notifications";
import websocketReducer from "./slices/websockets";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    notifications: notificationReducer,
    websocket: websocketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
