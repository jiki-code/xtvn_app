import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {
    "id": 0,
    "name": "",
    "email": "",
    "currentSessionId": null,
    "createdAt": "",
    "updatedAt": "",
    "role": "",
    "refreshToken": "",
    "accessToken": "",
    "user_id": ""
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
