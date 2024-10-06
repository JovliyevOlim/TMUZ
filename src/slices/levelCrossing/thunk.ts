import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getAllLevelCrossing as getAllLevelCrossingApi,
  getLevelCrossingByPlot as getLevelCrossingByPlotApi,
  addNewLevelCrossing as addNewLevelCrossingApi,
  updateLevelCrossing as updateLevelCrossingApi
} from '../../helpers/backend_helpers.ts';

export const getAllLevelCrossing = createAsyncThunk('LevelCrossingDevice/getAllLevelCrossing', async () => {
  try {
    const response = getAllLevelCrossingApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getLevelCrossingByPlot = createAsyncThunk('LevelCrossingDevice/getLevelCrossingByPlot', async (LevelCrossing: string) => {
  try {
    const response = getLevelCrossingByPlotApi(LevelCrossing);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewLevelCrossing = createAsyncThunk<any, any>('LevelCrossingDevice/addLevelCrossing', async (LevelCrossing: any, { rejectWithValue }) => {
  try {
    const response = addNewLevelCrossingApi(LevelCrossing);
    const data = await response;
    toast.success('Qurilma qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateLevelCrossing = createAsyncThunk('LevelCrossingDevice/updateLevelCrossing', async (LevelCrossing: any, { rejectWithValue }) => {
  try {
    const response = updateLevelCrossingApi(LevelCrossing);
    const data = await response;
    toast.success('Qurilma tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


