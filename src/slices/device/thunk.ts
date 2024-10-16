import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getDeviceById as getDeviceByIdApi,
  getDeviceCategoryId as getDeviceCategoryIdApi,
  getDeviceStationId as getDeviceStationIdApi,
  getDeviceLevelCrossingId as getDeviceLevelCrossingApi,
  getDevicePlotId as getDevicePlotIdApi,
  getDeviceInfoForQr as getDeviceInfoForQrApi,
  getAllDevice as getAllDeviceApi,
  getAllSimpleDevice as getAllSimpleDeviceApi,
  getAllLevelCrossingDevice as getAllLevelCrossingDeviceApi,
  getAllDeviceInfoActions as getAllDeviceInfoActionsApi,
  addNewDevice as addNewDeviceApi,
  updateDevice as updateDeviceApi,
  deleteDevice as deleteDeviceApi
} from '../../helpers/backend_helpers.ts';

export const getAllDevice = createAsyncThunk('device/getAllDevice', async () => {
  try {
    const response = getAllDeviceApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceByCategoryId = createAsyncThunk('device/getDeviceByCategoryID', async (categoryId: string) => {
  try {
    const response = getDeviceCategoryIdApi(categoryId);
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceByStationId = createAsyncThunk('device/getDeviceByStationID', async (categoryId: string) => {
  try {
    const response = getDeviceStationIdApi(categoryId);
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceByLevelCrossingId = createAsyncThunk('device/getDeviceByLevelCrossingID', async (categoryId: string) => {
  try {
    const response = getDeviceLevelCrossingApi(categoryId);
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceByPlotId = createAsyncThunk('device/getDeviceByPlotID', async (devices: any) => {
  try {
    const response = getDevicePlotIdApi(devices);
    return response;
  } catch (error) {
    return error;
  }
});
export const getAllSimpleDevice = createAsyncThunk('device/getAllSimpleDevice', async () => {
  try {
    const response = getAllSimpleDeviceApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getAllLevelCrossingDevice = createAsyncThunk('device/getAllLevelCrossingDevice', async () => {
  try {
    const response = getAllLevelCrossingDeviceApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getAllDeviceInfoActions = createAsyncThunk('device/getAllDeviceInfoActions', async (action: string) => {
  try {
    const response = getAllDeviceInfoActionsApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceInfoForQr = createAsyncThunk('device/getDeviceInfoForQr', async (action: string) => {
  try {
    const response = getDeviceInfoForQrApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const getDeviceById = createAsyncThunk('device/getDeviceById', async (action: string) => {
  try {
    const response = getDeviceByIdApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewDevice = createAsyncThunk<any, any>('device/addNewDevice', async (action: any, { rejectWithValue }) => {
  try {
    const response = addNewDeviceApi(action);
    const data = await response;
    toast.success('Qurilma qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateDevice = createAsyncThunk('device/updateDevice', async (action: any, { rejectWithValue }) => {
  try {
    const response = updateDeviceApi(action);
    const data = await response;
    toast.success('Qurilma tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteDevice = createAsyncThunk('device/deleteDevice', async (device: any, { rejectWithValue }) => {
  try {
    const response = deleteDeviceApi(device);
    const data = await response;
    toast.success('Qurilma o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


