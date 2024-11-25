import { createSlice } from '@reduxjs/toolkit';
import { getAllRoles } from './thunk.ts';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  roles: [],
  message: ''
}

export const initialState: initialState = {
  roles: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'Roles',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all Roles
    builder.addCase(getAllRoles.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllRoles.fulfilled, (state: any, action: any) => {
        state.roles = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllRoles.rejected, (state: any) => {
        state.roles = [];
        state.loading = false;
      });


  }
};


const RolesSlice = createSlice(sliceOptions);


export default RolesSlice.reducer;