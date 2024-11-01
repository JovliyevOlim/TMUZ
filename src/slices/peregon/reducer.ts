import { createSlice } from '@reduxjs/toolkit';
import { getPeregonByPlotId,getAllPeregon,deletePeregon,addNewPeregon,updatePeregon} from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  peregons: [],
  message: ''
}

export const initialState: initialState = {
  peregons: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'Peregon',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all Peregon by plot
    builder.addCase(getPeregonByPlotId.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getPeregonByPlotId.fulfilled, (state: any, action: any) => {
        state.peregons = action.payload.data;
        state.loading = false;
      })
      .addCase(getPeregonByPlotId.rejected, (state: any) => {
        state.peregons = []
        state.loading = false;
      });

    // get all Peregon
    builder.addCase(getAllPeregon.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllPeregon.fulfilled, (state: any, action: any) => {
        state.peregons = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPeregon.rejected, (state: any) => {
        state.peregons = [];
        state.loading = false;
      });

    // add new Peregon
    builder.addCase(addNewPeregon.pending, (state: any) => {
      state.loadingTrade = true;
    });
    builder.addCase(addNewPeregon.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewPeregon.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update Peregon
    builder.addCase(updatePeregon.pending, (state: any) => {
      state.loading = true;
    }).addCase(updatePeregon.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updatePeregon.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });
    // delete Peregon
    builder.addCase(deletePeregon.pending, (state: any) => {
      state.loading = true;
    }).addCase(deletePeregon.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deletePeregon.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;