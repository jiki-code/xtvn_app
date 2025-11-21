import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
