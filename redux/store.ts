import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// reducers
import userReducer from "../controllers/Redux/userSlice";
import projectReducer from "../controllers/Redux/projectSlice";
import ticketReducer from "../controllers/Redux/ticketsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      userData: userReducer,
      projectsData: projectReducer,
      ticketsData: ticketReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
