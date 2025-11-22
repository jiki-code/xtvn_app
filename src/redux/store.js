import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
