import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userToken: '',
  user: {},
  employeeEnterPriceId: {},
  userId: null,
  businessId: null,
  error: '', // for error message
  loading: false,
  isUserLogout: false,
  userPermissions: [],
  errorMsg: false, // for error,
  isAction: false
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
      console.log(localStorage.getItem('authUser'));
      state.user = action.payload.userEmployeeDto.user;
      state.employeeEnterPriceId = action.payload.userEmployeeDto?.employee?.enterprise?.id;
      state.userToken = action.payload.token;
      state.userId = action.payload.userEmployeeDto.user.id;
      state.loading = false;
      state.errorMsg = false;
      state.userPermissions = action.payload.userEmployeeDto.user.role?.permissions;
      state.isAction = !state.isAction;
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