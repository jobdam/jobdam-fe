import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebsocketStatus {
  destination: string | null; //구독경로 ex)/topic/match/134
  isConnected: boolean;
}

const initialState: WebsocketStatus = {
  destination: null,
  isConnected: false,
};

const websocketsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setDestination(state, action: PayloadAction<string | null>) {
      state.destination = action.payload;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setDestination, setConnected } = websocketsSlice.actions;
export default websocketsSlice.reducer;
