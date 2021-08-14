import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

interface InitialState {
  token: string;
  userData: User;
}

const slice = createSlice({
  name: "user",
  initialState: {} as InitialState,
  reducers: {
    getUser: (state, action: PayloadAction<InitialState>) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
  },
});

export default slice.reducer;

const fetchUserData = async (dispatch: Dispatch, token: string) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();

  dispatch(
    slice.actions.getUser({ token, userData: { ...parsedResponse.data } })
  );
};

export { fetchUserData };
