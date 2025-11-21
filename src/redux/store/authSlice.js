import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {
    ban_reason: "",
    banned: false,
    createdAt: "",
    email: "",
    email_verified: false,
    id: "",
    image: "",
    name: "",
    role: "",
    updatedAt: "",
    refreshToken: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, storeUser } = authSlice.actions;
export default authSlice.reducer;
