import { createSlice } from '@reduxjs/toolkit';
import {
  getActionByUserDoneFalse,
  getActionByUserDone,
  addNewAction,
  updateAction,
  checkDeviceForAction
} from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  checkUser: false,
  actions: [],
  message: ''
}

export const initialState: initialState = {
  actions: [],
  error: null,
  loading: false,
  isAction: false,
  checkUser: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'action',
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

    // add new action
    builder.addCase(addNewAction.pending, (state: any) => {
      state.loading = true;
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

    // check device for action
    builder.addCase(checkDeviceForAction.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(checkDeviceForAction.fulfilled, (state: any) => {
      state.loading = false;
      state.checkUser = true;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(checkDeviceForAction.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.checkUser = false;
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