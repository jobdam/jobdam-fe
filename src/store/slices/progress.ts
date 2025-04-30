/** @format */

// src/store/progressSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface ProgressState {
  step: number;
}

const initialState: ProgressState = {
  step: 1, // 시작은 1단계
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    nextStep(state) {
      state.step += 1;
    },
    resetStep(state) {
      state.step = 1;
    },
  },
});

export const { setStep, nextStep, resetStep } = progressSlice.actions;
export default progressSlice.reducer;
