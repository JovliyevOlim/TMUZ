import { createSlice } from '@reduxjs/toolkit';
import { getAllMtu, addNewMtu, updateMtu } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  mtu: [],
  message: ''
}

export const initialState: initialState = {
  mtu: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'mtu',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all mtu
    builder.addCase(getAllMtu.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllMtu.fulfilled, (state: any, action: any) => {
        state.mtu = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllMtu.rejected, (state: any) => {
        state.loading = false;
      });

    // add new mtu
    builder.addCase(addNewMtu.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewMtu.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewMtu.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update mtu
    builder.addCase(updateMtu.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateMtu.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateMtu.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;