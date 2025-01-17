import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  // getStationById as getStationByIdApi,
  getStationByPlotId as getStationByPlotIdApi,
  getAllStation as getAllStationByApi,
  addNewStation as addNewStationApi,
  updateStation as updateStationApi,
  deleteStation as deleteStationApi,
  getStationByUserId as getStationByUserIdApi,
  getStationByUserPlotId as getStationByUserPlotIdApi
} from '../../helpers/backend_helpers.ts';

export const getAllStation = createAsyncThunk('station/getAllStation', async () => {
  try {
    const response = getAllStationByApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getStationByPlotId = createAsyncThunk('station/getStationPlotById', async (station: string) => {
  try {
    const response = getStationByPlotIdApi(station);
    return response;
  } catch (error) {
    return error;
  }
});
export const getStationByUserPlotId = createAsyncThunk('station/getStationUserPlotById', async (station: string) => {
  try {
    const response = getStationByUserPlotIdApi(station);
    return response;
  } catch (error) {
    return error;
  }
});
export const getStationByUserId = createAsyncThunk('station/getStationByUserId', async (station: string) => {
  try {
    const response = getStationByUserIdApi(station);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewStation = createAsyncThunk<any, any>('station/addStation', async (station: any, { rejectWithValue }) => {
  try {
    const response = addNewStationApi(station);
    const data = await response;
    toast.success('Stansiya qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateStation = createAsyncThunk('station/updateStation', async (station: any, { rejectWithValue }) => {
  try {
    const response = updateStationApi(station);
    const data = await response;
    toast.success('Stansiya tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteStation = createAsyncThunk('station/deleteStation', async (station: any, { rejectWithValue }) => {
  try {
    const response = deleteStationApi(station);
    const data = await response;
    toast.success('Stansiya o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

