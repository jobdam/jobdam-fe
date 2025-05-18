/** @format */

import { VideoChatInterviewResponse } from "@/types/interview";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoChatInterviewState {
  selectedUserId: number | null;
  interviewDataMap: Record<number, VideoChatInterviewResponse>;
}

const initialState: VideoChatInterviewState = {
  selectedUserId: null,
  interviewDataMap: {},
};

const videoChatInterviewSlice = createSlice({
  name: "videoChatInterview",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
    setInterviewData: (
      state,
      action: PayloadAction<{
        userId: number;
        data: VideoChatInterviewResponse;
      }>
    ) => {
      const { userId, data } = action.payload;
      if (!state.interviewDataMap[userId]) {
        state.interviewDataMap[userId] = data;
      }
    },
    resetInterviewData: (state) => {
      state.selectedUserId = null;
      state.interviewDataMap = {};
    },
  },
});

export const { setSelectedUserId, setInterviewData, resetInterviewData } =
  videoChatInterviewSlice.actions;

export default videoChatInterviewSlice.reducer;
