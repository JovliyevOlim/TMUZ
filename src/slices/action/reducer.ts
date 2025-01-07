import { createSlice } from '@reduxjs/toolkit';
import {
  getActionByUserDoneFalse,
  getActionByUserDone,
  addNewAction,
  updateAction,
  checkDeviceForAction, deleteAction, getActionFilter
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
  reducers: {
    clearCheckUser(state: initialState) {
      state.checkUser = false;
    }
  },
  extraReducers: (builder: any) => {

    // get action filter
    builder.addCase(getActionFilter.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getActionFilter.fulfilled, (state: any, action: any) => {
        state.actions = action.payload.data;
        state.loading = false;
      })
      .addCase(getActionFilter.rejected, (state: any) => {
        state.loading = false;
        state.actions = [];
      });

    // get action by user done
    builder.addCase(getActionByUserDone.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getActionByUserDone.fulfilled, (state: any, action: any) => {
        state.actions = action.payload.data;
        state.loading = false;
      })
      .addCase(getActionByUserDone.rejected, (state: any) => {
        state.loading = false;
        state.actions = [];
      });

    // get action by user done false
    builder.addCase(getActionByUserDoneFalse.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getActionByUserDoneFalse.fulfilled, (state: any, action: any) => {
        state.actions = action.payload.data;
        state.loading = false;
      })
      .addCase(getActionByUserDoneFalse.rejected, (state: any) => {
        state.loading = false;
        state.actions = [];
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
    });
    builder.addCase(checkDeviceForAction.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.checkUser = false;
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
    // delete action
    builder.addCase(deleteAction.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteAction.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteAction.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const userSlice = createSlice(sliceOptions);

export const { clearCheckUser } = userSlice.actions;

export default userSlice.reducer;