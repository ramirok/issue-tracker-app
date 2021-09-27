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

// const fetchUserData = async (dispatch: Dispatch, token) => {
//   // const response = await fetch("http://localhost:3001/users", {
//   const response = await fetch("/api/users", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const parsedResponse = await response.json();

//   dispatch(
//     slice.actions.getUser({ token, userData: { ...parsedResponse.data } })
//   );
// };

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
