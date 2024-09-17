import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userToken: '',
  user: {},
  userId: null,
  firstBranchId: null,
  businessId: null,
  error: '', // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false // for error
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      console.log(action);
      state.user = action.payload.object;
      // state.userToken = action.payload.object.message
      // state.businessId = action.payload.object.business.id
      // state.userId = action.payload.object.id
      // state.firstBranchId = action.payload.object.branches[0].id
      // state.loading = false;
      // state.errorMsg = false;
    },
    logoutUserSuccess(state) {
      state.isUserLogout = true;
    },
    reset_login_flag(state: any) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    }
  }
});

export const {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag
} = loginSlice.actions;

export default loginSlice.reducer;