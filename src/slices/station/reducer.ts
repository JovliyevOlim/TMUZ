import { createSlice } from '@reduxjs/toolkit';
import {
  getAllStation,
  addNewStation,
  updateStation,
  getStationByPlotId,
  deleteStation,
  getStationByUserId
} from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  stations: [],
  stationsUser: [],
  message: ''
}

export const initialState: initialState = {
  stations: [],
  stationsUser: [],
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

    // get all station by plot
    builder.addCase(getStationByPlotId.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getStationByPlotId.fulfilled, (state: any, action: any) => {
        state.stations = action.payload.data;
        state.loading = false;
      })
      .addCase(getStationByPlotId.rejected, (state: any) => {
        state.stations = [];
        state.loading = false;
      });

    // get all station by plot
    builder.addCase(getStationByUserId.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getStationByUserId.fulfilled, (state: any, action: any) => {
        state.stationsUser = action.payload.data;
        state.loading = false;
      })
      .addCase(getStationByUserId.rejected, (state: any) => {
        state.stationsUser = [];
        state.loading = false;
      });

    // get all station
    builder.addCase(getAllStation.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllStation.fulfilled, (state: any, action: any) => {
        state.stations = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllStation.rejected, (state: any) => {
        state.stations = [];
        state.loading = false;
      });

    // add new station
    builder.addCase(addNewStation.pending, (state: any) => {
      state.loading = true;
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

    //update station
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
    // delete station
    builder.addCase(deleteStation.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteStation.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteStation.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;