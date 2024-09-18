import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  // getStationById as getStationByIdApi,
  getAllStation as getAllStationByApi,
  addNewStation as addNewStationApi,
  updateStation as updateStationApi
} from '../../helpers/backend_helpers.ts';

export const getAllStation = createAsyncThunk('station/getAllStation', async () => {
  try {
    const response = getAllStationByApi();
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


