/** @format */

import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'

import progressReducer from "./slices/progress";
import notificationReducer from "./slices/notifications";
import selectReducer from "./slices/select";
import websocketReducer from "./slices/websockets";
import uiReducer from "./slices/uistate";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    notifications: notificationReducer,
    selects: selectReducer,
    websocket: websocketReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
