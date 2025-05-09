/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isProfilePreviewOpen: boolean;
  progressStep: number;
}

const initialState: UIState = {
  isProfilePreviewOpen: false,
  progressStep: 1,
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

    // setSelected: (state, action: PayloadAction<string | number>) => {
    //   state.selected = action.payload;
    // },
  },
});

export const { openProfilePreview, closeProfilePreview, setProgressStep } =
  uiSlice.actions;
export default uiSlice.reducer;
