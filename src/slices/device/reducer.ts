import { createSlice } from '@reduxjs/toolkit';
import { getActionByUserDoneFalse, getActionByUserDone, addNewAction, updateAction } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  actions: [],
  message: ''
}

export const initialState: initialState = {
  actions: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'device',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get action by user done
    builder.addCase(getActionByUserDone.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getActionByUserDone.fulfilled, (state: any, action: any) => {
        state.customers = action.payload.object;
        state.loading = false;
      })
      .addCase(getActionByUserDone.rejected, (state: any) => {
        state.loading = false;
      });

    // get action by user done false
    builder.addCase(getActionByUserDoneFalse.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getActionByUserDoneFalse.fulfilled, (state: any, action: any) => {
        state.customers = action.payload.object;
        state.loading = false;
      })
      .addCase(getActionByUserDoneFalse.rejected, (state: any) => {
        state.loading = false;
      });

    // add new users
    builder.addCase(addNewAction.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewAction.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewAction.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update user
    builder.addCase(updateAction.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateAction.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateAction.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;