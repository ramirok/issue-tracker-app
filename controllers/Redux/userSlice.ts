import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

interface InitialState {
  loaded: boolean;
  userData: User;
}

const slice = createSlice({
  name: "user",
  initialState: { loaded: false } as InitialState,
  reducers: {
    getUser: (state, action: PayloadAction<InitialState>) => {
      state.loaded = action.payload.loaded;
      state.userData = action.payload.userData;
    },
  },
});

export default slice.reducer;

const fetchUserData = async (dispatch: Dispatch) => {
  const response = await fetch("/api/users", {
    method: "POST",
  });

  const parsedResponse = await response.json();

  dispatch(
    slice.actions.getUser({
      loaded: true,
      userData: { ...parsedResponse.data },
    })
  );
};

export { fetchUserData };
