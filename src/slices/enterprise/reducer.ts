import { createSlice } from '@reduxjs/toolkit';
import { getAllEnterprise, addNewEnterprise, updateEnterprise, getEnterpriseByMTU } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  enterprise: [],
  enterpriseForSelect: [],
  message: ''
}

export const initialState: initialState = {
  enterprise: [],
  enterpriseForSelect: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'enterprise',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all enterprise by Mtu
    builder.addCase(getEnterpriseByMTU.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getEnterpriseByMTU.fulfilled, (state: any, action: any) => {
        state.enterpriseForSelect = action.payload.data;
        state.loading = false;
      })
      .addCase(getEnterpriseByMTU.rejected, (state: any) => {
        state.enterpriseForSelect = []
        state.loading = false;
      });

    // get all enterprise
    builder.addCase(getAllEnterprise.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllEnterprise.fulfilled, (state: any, action: any) => {
        state.enterprise = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllEnterprise.rejected, (state: any) => {
        state.enterprise = []
        state.loading = false;
      });

    // add new enterprise
    builder.addCase(addNewEnterprise.pending, (state: any) => {
      state.loading= true;
    });
    builder.addCase(addNewEnterprise.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewEnterprise.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update enterprise
    builder.addCase(updateEnterprise.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateEnterprise.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateEnterprise.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;