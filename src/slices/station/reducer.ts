import { createSlice } from '@reduxjs/toolkit';
import { getAllStation, addNewStation, updateStation } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  stations: [],
  message: ''
}

export const initialState: initialState = {
  stations: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'station',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all user
    builder.addCase(getAllStation.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllStation.fulfilled, (state: any, action: any) => {
        state.stations = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllStation.rejected, (state: any) => {
        state.loading = false;
      });

    // add new users
    builder.addCase(addNewStation.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewStation.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewStation.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update user
    builder.addCase(updateStation.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateStation.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateStation.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;