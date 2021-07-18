import { createSlice } from "@reduxjs/toolkit";

type SliceState = [{ name: string }];

const slice = createSlice({
  name: "user",
  initialState: [{}] as SliceState,
  reducers: {
    getUser: (state) => {
      state.push({ name: "Ramiro Krupoviesa" });
      state.push({ name: "John Smith " });
    },
  },
});

export default slice.reducer;
export const { getUser } = slice.actions;
