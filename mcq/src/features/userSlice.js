import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userAns: {
      answer: null,
    },
  },
  reducers: {
    ans: (state, action) => {
      state.userAns = action.payload;
    },
  },
});

export const { ans } = userSlice.actions;
export const selectUser = (state) => state.userAns;
export default userSlice.reducer;
