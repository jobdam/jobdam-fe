import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PurposeType = "match" | "chat" | "signal";

interface WebsocketStatus {
  purpose: PurposeType;
  roomId: string | null;
  isConnected: boolean;
}

const initialState: WebsocketStatus = {
  purpose: "match",
  roomId: null,
  isConnected: false,
};

const websocketsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setPurpose(state, action: PayloadAction<PurposeType>) {
      state.purpose = action.payload;
    },
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setPurpose, setRoomId, setConnected } = websocketsSlice.actions;
export default websocketsSlice.reducer;
