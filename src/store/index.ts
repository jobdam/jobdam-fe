/** @format */

import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'

import progressReducer from "./slices/progress";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
