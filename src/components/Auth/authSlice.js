import { createSlice } from "@reduxjs/toolkit";

const authsSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authMode: "",
  },
  reducers: {
    authSignIn(state, action) {
      state.user = action.payload;
      state.authMode = "";
      localStorage.setItem('token', action.payload.idToken)
    },
    setAuthMode(state, action) {
      state.authMode = action.payload;
    },
    authLogOut(state) {
        state.user = null
        localStorage.removeItem('token')
    }
  },
});

export const {authSignIn, setAuthMode, authLogOut } = authsSlice.actions;

export default authsSlice.reducer;
