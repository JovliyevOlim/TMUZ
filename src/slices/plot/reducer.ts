import { createSlice } from '@reduxjs/toolkit';
import { getAllPlot, addNewPlot, updatePlot, getPlotByEnterprise } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  plot: [],
  plotForSelect: [],
  message: ''
}

export const initialState: initialState = {
  plot: [],
  plotForSelect: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'plot',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all Plot by Mtu
    builder.addCase(getPlotByEnterprise.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getPlotByEnterprise.fulfilled, (state: any, action: any) => {
        state.plotForSelect = action.payload.data;
        state.loading = false;
      })
      .addCase(getPlotByEnterprise.rejected, (state: any) => {
        state.plotForSelect = [];
        state.loading = false;
      });

    // get all Plot
    builder.addCase(getAllPlot.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllPlot.fulfilled, (state: any, action: any) => {
        state.plot = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPlot.rejected, (state: any) => {
        state.plot = [];
        state.loading = false;
      });

    // add new Plot
    builder.addCase(addNewPlot.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewPlot.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewPlot.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update Plot
    builder.addCase(updatePlot.pending, (state: any) => {
      state.loading = true;
    }).addCase(updatePlot.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updatePlot.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;