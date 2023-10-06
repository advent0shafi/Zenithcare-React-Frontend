import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  user_id:null,
  username: null,
  accessToken: null,
  refreshToken: null,
 roles:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      const {username,accessToken,refreshToken,roles,user_id} = action.payload
      state.username = username
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.roles = roles
      state.user_id = user_id
     },
    updatetoken: (state, action) => {
      const {accessToken,refreshToken} = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken;
    },
    userlogout: (state, action) => {
      state.user_id = null
      state.username = null
      state.accessToken = null
      state.refreshToken = null
    state.roles = null
     },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, updatetoken,userlogout } = authSlice.actions;

export default authSlice.reducer;
