import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

// reducers
import userReducer from "../Controllers/Redux/userSlice";
import projectReducer from "../Controllers/Redux/projectSlice";
import ticketReducer from "../Controllers/Redux/ticketsSlice";

const store = configureStore({
  reducer: {
    userData: userReducer,
    projectsData: projectReducer,
    ticketsData: ticketReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
