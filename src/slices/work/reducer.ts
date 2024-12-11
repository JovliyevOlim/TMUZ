import { createSlice } from '@reduxjs/toolkit';
import { addNewJob, confirmJob, deleteJob, doneJob, getJobs, pauseJob, updateJob } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  jobs: [],
  message: ''
}

export const initialState: initialState = {
  jobs: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // get work
    builder.addCase(getJobs.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getJobs.fulfilled, (state: any, action: any) => {
        state.jobs = action.payload.data;
        state.loading = false;
      })
      .addCase(getJobs.rejected, (state: any) => {
        // state.error = action.payload.error || null;
        state.jobs = [];
        state.loading = false;
      });


    // add new work
    builder.addCase(addNewJob.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });

    // update  work
    builder.addCase(updateJob.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(updateJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(updateJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    // done  work
    builder.addCase(doneJob.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(doneJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(doneJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    // pause  work
    builder.addCase(pauseJob.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(pauseJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(pauseJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    // confirm  work
    builder.addCase(confirmJob.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(confirmJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(confirmJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;




    });

    // delete Product
    builder.addCase(deleteJob.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteJob.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteJob.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const tradeSlice = createSlice(sliceOptions);


export default tradeSlice.reducer;