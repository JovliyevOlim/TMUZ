import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getAllPlot as getAllPlotApi,
  getPlotByEnterprise as getPlotByEnterpriseApi,
  addNewPlot as addNewPlotApi,
  updatePlot as updatePlotApi,
} from '../../helpers/backend_helpers.ts';

export const getAllPlot = createAsyncThunk('Plot/getAllPlot', async () => {
  try {
    const response = getAllPlotApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getPlotByEnterprise = createAsyncThunk('Plot/getPlotByMtu', async (Plot: string) => {
  try {
    const response = getPlotByEnterpriseApi(Plot);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewPlot = createAsyncThunk<any, any>('Plot/addPlot', async (Plot: any, { rejectWithValue }) => {
  try {
    const response = addNewPlotApi(Plot);
    const data = await response;
    toast.success('Uchastka qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updatePlot = createAsyncThunk('Plot/updatePlot', async (Plot: any, { rejectWithValue }) => {
  try {
    const response = updatePlotApi(Plot);
    const data = await response;
    toast.success('Uchastka tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


