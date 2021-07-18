import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  admin: boolean;
  loggedIn: boolean;
};

const slice = createSlice({
  name: "auth",
  initialState: { admin: false, loggedIn: false } as SliceState,
  reducers: {
    signIn: (
      state,
      _action: PayloadAction<{ name: string; password: string }>
    ) => {
      // const { name, password } = action.payload;
      state.loggedIn = true;
      state.admin = true;
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.admin = false;
    },
    createUser: (
      _state,
      _action: PayloadAction<{ name: string; password: string }>
    ) => {},
  },
});

export default slice.reducer;
export const { signIn, signOut, createUser } = slice.actions;
