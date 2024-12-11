import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  addNewWorkExample as addNewWorkExampleApi,
  updateWorkExample as updateWorkExampleApi,
  getAllWorkExample as getAllWorkExampleApi,
  deleteWorkExample as deleteWorkExampleApi
} from '../../helpers/backend_helpers.ts';

export const getAllWorkExample = createAsyncThunk('WorkExample/getAllWorkExample', async () => {
  try {
    const response = getAllWorkExampleApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewWorkExample = createAsyncThunk<any, any>('WorkExample/addWorkExample', async (WorkExample: any, { rejectWithValue }) => {
  try {
    const response = addNewWorkExampleApi(WorkExample);
    const data = await response;
    toast.success('Ish namunasi qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateWorkExample = createAsyncThunk('WorkExample/updateWorkExample', async (WorkExample: any, { rejectWithValue }) => {
  try {
    const response = updateWorkExampleApi(WorkExample);
    const data = await response;
    toast.success('Ish namunasi tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteWorkExample = createAsyncThunk('WorkExample/deleteWorkExample', async (WorkExample: any, { rejectWithValue }) => {
  try {
    const response = deleteWorkExampleApi(WorkExample);
    const data = await response;
    toast.success('Ish namunasi o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


