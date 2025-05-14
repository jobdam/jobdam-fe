/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  ErrorDuplicate: string;
  checkDuplicate: boolean;
  signupErrorMsg: string;
  signupError: boolean;
}

const initialState: UIState = {
  ErrorDuplicate: "",
  checkDuplicate: false,
  signupError: false,
  signupErrorMsg: "",
};

const uiSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setErrorDuplicate: (state, action: PayloadAction<string>) => {
      state.ErrorDuplicate = action.payload;
    },
    setCheckDuplicate: (state, action: PayloadAction<boolean>) => {
      state.checkDuplicate = action.payload;
    },
    setSignupError: (state, action: PayloadAction<boolean>) => {
      state.signupError = action.payload;
    },
    setSignupErrorMsg: (state, action: PayloadAction<string>) => {
      state.signupErrorMsg = action.payload;
    },
  },
});

export const {
  setErrorDuplicate,
  setCheckDuplicate,
  setSignupError,
  setSignupErrorMsg,
} = uiSlice.actions;
export default uiSlice.reducer;
