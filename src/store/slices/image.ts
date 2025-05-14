/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  file: File | null;
  preview: string;
}

const initialState: Image = {
  file: null,
  preview: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setUploadFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    setChangePreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload;
    },
  },
});

export const { setUploadFile, setChangePreview } = imageSlice.actions;
export default imageSlice.reducer;
