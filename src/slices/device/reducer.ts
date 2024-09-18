import { createSlice } from '@reduxjs/toolkit';
import {
  getAllDevice,
  getAllDeviceInfoActions, getDeviceInfoForQr, addNewDevice, updateDevice, getDeviceById
} from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  devices: [],
  device: {},
  deviceQrCodeInfo: {}
  message: ''
}

export const initialState: initialState = {
  devices: [],
  device: {},
  deviceQrCodeInfo: {},
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'device',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all device
    builder.addCase(getAllDevice.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllDevice.fulfilled, (state: any, action: any) => {
        state.devices = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllDevice.rejected, (state: any) => {
        state.loading = false;
      });

    // get all device action
    builder.addCase(getAllDeviceInfoActions.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllDeviceInfoActions.fulfilled, (state: any, action: any) => {
        state.devices = action.payload.object;
        state.loading = false;
      })
      .addCase(getAllDeviceInfoActions.rejected, (state: any) => {
        state.loading = false;
      });

    // get device qr code
    builder.addCase(getDeviceInfoForQr.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getDeviceInfoForQr.fulfilled, (state: any, action: any) => {
        state.deviceQrCodeInfo = action.payload.data;
        state.loading = false;
      })
      .addCase(getDeviceInfoForQr.rejected, (state: any) => {
        state.loading = false;
      });

    // get device by id
    builder.addCase(getDeviceById.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getDeviceById.fulfilled, (state: any, action: any) => {
        state.devices = action.payload.object;
        state.loading = false;
      })
      .addCase(getDeviceById.rejected, (state: any) => {
        state.loading = false;
      });

    // add new users
    builder.addCase(addNewDevice.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewDevice.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewDevice.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update user
    builder.addCase(updateDevice.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateDevice.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateDevice.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;