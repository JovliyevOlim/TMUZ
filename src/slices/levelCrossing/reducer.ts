import { createSlice } from '@reduxjs/toolkit';
import { getAllLevelCrossing, addNewLevelCrossing, updateLevelCrossing, getLevelCrossingByPlot } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  levelCrossing: [],
  message: ''
}

export const initialState: initialState = {
  levelCrossing: [],
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

    // get all LevelCrossing by Plot
    builder.addCase(getLevelCrossingByPlot.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getLevelCrossingByPlot.fulfilled, (state: any, action: any) => {
        state.levelCrossingForSelect = action.payload.data;
        state.loading = false;
      })
      .addCase(getLevelCrossingByPlot.rejected, (state: any) => {
        state.loading = false;
      });

    // get all LevelCrossing
    builder.addCase(getAllLevelCrossing.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllLevelCrossing.fulfilled, (state: any, action: any) => {
        state.levelCrossing = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllLevelCrossing.rejected, (state: any) => {
        state.loading = false;
      });

    // add new LevelCrossing
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

    //update LevelCrossing
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