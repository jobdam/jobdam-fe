/** @format */

import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isProfilePreviewOpen: boolean;
}

const initialState: UIState = {
  isProfilePreviewOpen: false,
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

    // setSelected: (state, action: PayloadAction<string | number>) => {
    //   state.selected = action.payload;
    // },
  },
});

export const { openProfilePreview, closeProfilePreview } = uiSlice.actions;
export default uiSlice.reducer;
