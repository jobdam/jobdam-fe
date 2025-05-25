/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isProfilePreviewOpen: boolean;
  progressStep: number;
  isLogin: boolean;

  resumeState: boolean;
  aiState: boolean;
  selectList: string | number;
  ErrorDuplicate: string;
}

const initialState: UIState = {
  isProfilePreviewOpen: false,
  isLogin: true,
  progressStep: 1,
  resumeState: false,
  aiState: true,
  selectList: "",
  ErrorDuplicate: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openProfilePreview: (state) => {
      state.isProfilePreviewOpen = true;
    },
    closeProfilePreview: (state) => {
      state.isProfilePreviewOpen = false;
    },
    setProgressStep: (state, action: PayloadAction<number>) => {
      state.progressStep = action.payload;
    },
    setResumeState: (state, action: PayloadAction<boolean>) => {
      state.resumeState = action.payload;
    },
    setAiState: (state, action: PayloadAction<boolean>) => {
      state.aiState = action.payload;
    },

    setSelectList: (state, action: PayloadAction<string | number>) => {
      state.selectList = action.payload;
    },
    setErrorDuplicate: (state, action: PayloadAction<string>) => {
      state.ErrorDuplicate = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const {
  openProfilePreview,
  closeProfilePreview,
  setResumeState,
  setAiState,
  setProgressStep,
  setSelectList,
  setIsLogin,
} = uiSlice.actions;
export default uiSlice.reducer;
