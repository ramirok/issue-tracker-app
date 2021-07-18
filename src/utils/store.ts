import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

// reducers
import authReducer from "../Controllers/Redux/authSlice";
import bugReducer from "../Controllers/Redux/bugSlice";
import userReducer from "../Controllers/Redux/userSlice";
import projectReducer from "../Controllers/Redux/projectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    bugs: bugReducer,
    user: userReducer,
    projects: projectReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
