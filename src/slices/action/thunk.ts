import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getActionByUserDone as getActionByUserDoneApi,
  getActionByUserDoneFalse as getActionByUserDoneFalseApi,
  addNewAction as addNewActionApi,
  updateAction as updateActionApi,
  checkDeviceForAction as checkDeviceForActionApi,
  deleteAction as deleteActionApi,
  getActionFilter as getActionFilterApi
} from '../../helpers/backend_helpers.ts';


export const getActionFilter = createAsyncThunk('action/getActionFilter', async (action: string) => {
  try {
    const response = getActionFilterApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const getActionByUserDone = createAsyncThunk('action/getActionByUserDone', async (action: string) => {
  try {
    const response = getActionByUserDoneApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const getActionByUserDoneFalse = createAsyncThunk('action/getActionByUserDoneFalse', async (action: string) => {
  try {
    const response = getActionByUserDoneFalseApi(action);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewAction = createAsyncThunk<any, any>('action/addAction', async (action: any, { rejectWithValue }) => {
  try {
    const response = addNewActionApi(action);
    const data = await response;
    toast.success('Action qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateAction = createAsyncThunk('action/updateAction', async (action: any, { rejectWithValue }) => {
  try {
    const response = updateActionApi(action);
    const data = await response;
    toast.success('Action tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const checkDeviceForAction = createAsyncThunk<any, any>('action/checkDeviceForAction', async (action: any, { rejectWithValue }) => {
  try {
    const response = checkDeviceForActionApi(action);
    const data = await response;
    toast.success('Masofa yetarli', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteAction = createAsyncThunk('action/deleteAction', async (action: any, { rejectWithValue }) => {
  try {
    const response = deleteActionApi(action);
    const data = await response;
    toast.success('Action o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
