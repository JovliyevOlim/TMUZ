import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getAllEnterprise as getAllEnterpriseApi,
  getEnterpriseByMTU as getEnterpriseByMTUApi,
  addNewEnterprise as addNewEnterpriseApi,
  updateEnterprise as updateEnterpriseApi,
  deleteEnterprise as deleteEnterpriseApi
} from '../../helpers/backend_helpers.ts';

export const getAllEnterprise = createAsyncThunk('Peregon/getAllEnterprise', async () => {
  try {
    const response = getAllEnterpriseApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getEnterpriseByMTU = createAsyncThunk('Peregon/getEnterpriseByMtu', async (enterprise: string) => {
  try {
    const response = getEnterpriseByMTUApi(enterprise);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewEnterprise = createAsyncThunk<any, any>('Peregon/addEnterprise', async (Enterprise: any, { rejectWithValue }) => {
  try {
    const response = addNewEnterpriseApi(Enterprise);
    const data = await response;
    toast.success('Korxona qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateEnterprise = createAsyncThunk('Peregon/updateEnterprise', async (Enterprise: any, { rejectWithValue }) => {
  try {
    const response = updateEnterpriseApi(Enterprise);
    const data = await response;
    toast.success('Korxona tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteEnterprise = createAsyncThunk('Peregon/deleteEnterprise', async (Enterprise: any, { rejectWithValue }) => {
  try {
    const response = deleteEnterpriseApi(Enterprise);
    const data = await response;
    toast.success('Korxona o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

