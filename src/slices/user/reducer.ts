import { createSlice } from '@reduxjs/toolkit';
import { addNewUser, deleteUser, getAllUser, getUserById, updateUser } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  users: {},
  user: {},
  message: ''
}

export const initialState: initialState = {
  users: {},
  user: {},
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get user by Id
    builder.addCase(getUserById.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getUserById.fulfilled, (state: any, action: any) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state: any) => {
        state.loading = false;
      });

    // get all user
    builder.addCase(getAllUser.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllUser.fulfilled, (state: any, action: any) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllUser.rejected, (state: any) => {
        state.loading = false;
      });

    // add new users
    builder.addCase(addNewUser.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewUser.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewUser.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update user
    builder.addCase(updateUser.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateUser.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateUser.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });


    // delete customer
    builder.addCase(deleteUser.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteUser.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteUser.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });
  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;