import { createSlice } from '@reduxjs/toolkit';
import { getAllLevelCrossing, addNewLevelCrossing, updateLevelCrossing, getLevelCrossingByPlot } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  levelCrossing: [],
  levelCrossingForSelect: []
  message: ''
}

export const initialState: initialState = {
  levelCrossing: [],
  levelCrossingForSelect: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'levelCrossing',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all LevelCrossingDevice by Plot
    builder.addCase(getLevelCrossingByPlot.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getLevelCrossingByPlot.fulfilled, (state: any, action: any) => {
        state.levelCrossingForSelect = action.payload.data;
        state.loading = false;
      })
      .addCase(getLevelCrossingByPlot.rejected, (state: any) => {
        state.levelCrossingForSelect = [];
        state.loading = false;
      });

    // get all LevelCrossingDevice
    builder.addCase(getAllLevelCrossing.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllLevelCrossing.fulfilled, (state: any, action: any) => {
        state.levelCrossing = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllLevelCrossing.rejected, (state: any) => {
        state.levelCrossing = [];
        state.loading = false;
      });

    // add new LevelCrossingDevice
    builder.addCase(addNewLevelCrossing.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewLevelCrossing.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewLevelCrossing.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update LevelCrossingDevice
    builder.addCase(updateLevelCrossing.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateLevelCrossing.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateLevelCrossing.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;