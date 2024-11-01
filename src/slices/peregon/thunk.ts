import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getPeregonByPlotId as getPeregonByPlotIdApi,
  getAllPeregon as getAllPeregonByApi,
  addNewPeregon as addNewPeregonApi,
  updatePeregon as updatePeregonApi,
  deletePeregon as deletePeregonApi
} from '../../helpers/backend_helpers.ts';

export const getAllPeregon = createAsyncThunk('Peregon/getAllPeregon', async () => {
  try {
    const response = getAllPeregonByApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getPeregonByPlotId = createAsyncThunk('Peregon/getPeregonPlotById', async (Peregon: string) => {
  try {
    const response = getPeregonByPlotIdApi(Peregon);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewPeregon = createAsyncThunk<any, any>('Peregon/addPeregon', async (Peregon: any, { rejectWithValue }) => {
  try {
    const response = addNewPeregonApi(Peregon);
    const data = await response;
    toast.success('Peregon qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updatePeregon = createAsyncThunk('Peregon/updatePeregon', async (Peregon: any, { rejectWithValue }) => {
  try {
    const response = updatePeregonApi(Peregon);
    const data = await response;
    toast.success('Peregon tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deletePeregon = createAsyncThunk('Peregon/deletePeregon', async (Peregon: any, { rejectWithValue }) => {
  try {
    const response = deletePeregonApi(Peregon);
    const data = await response;
    toast.success('Peregon o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

