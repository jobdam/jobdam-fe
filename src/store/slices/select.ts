/** @format */

// store/selectSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectState {
  [key: string]: string | number;
}

const initialState: SelectState = {};

const selectSlice = createSlice({
  name: "selects",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string | number>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = selectSlice.actions;
export default selectSlice.reducer;
