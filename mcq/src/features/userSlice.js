import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userAns: {
      answer: null,
    },
    checkBox: {
      checkAns: null,
    },
  },
  reducers: {
    ans: (state, action) => {
      state.userAns = action.payload;
    },
    ansCheckbox: (state, action) => {
      state.checkBox = action.payload;
    },
  },
});

export const { ans, ansCheckbox } = userSlice.actions;
export const selectUser = (state) => state.userAns;
export const selectUserCheck = (state) => state.checkBox;

export default userSlice.reducer;
