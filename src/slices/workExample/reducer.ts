import { createSlice } from '@reduxjs/toolkit';
import { getAllWorkExample, addNewWorkExample, updateWorkExample, deleteWorkExample } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  workExample: [],
  message: ''
}

export const initialState: initialState = {
  workExample: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'WorkExample',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all WorkExample
    builder.addCase(getAllWorkExample.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllWorkExample.fulfilled, (state: any, action: any) => {
        state.workExample = action.payload;
        state.loading = false;
      })
      .addCase(getAllWorkExample.rejected, (state: any) => {
        state.workExample = [];
        state.loading = false;
      });

    // add new WorkExample
    builder.addCase(addNewWorkExample.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewWorkExample.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewWorkExample.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update WorkExample
    builder.addCase(updateWorkExample.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateWorkExample.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateWorkExample.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });
    // delete WorkExample
    builder.addCase(deleteWorkExample.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteWorkExample.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteWorkExample.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;