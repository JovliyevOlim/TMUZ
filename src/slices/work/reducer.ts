import { createSlice } from '@reduxjs/toolkit';
import { addNewWork } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  users: [],
  message: ''
}

export const initialState: initialState = {
  users: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // add new users
    builder.addCase(addNewWork.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewWork.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewWork.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const tradeSlice = createSlice(sliceOptions);


export default tradeSlice.reducer;