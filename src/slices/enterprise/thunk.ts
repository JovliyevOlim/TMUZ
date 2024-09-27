import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getAllEnterprise as getAllEnterpriseApi,
  getEnterpriseByMTU as getEnterpriseByMTUApi,
  addNewEnterprise as addNewEnterpriseApi,
  updateEnterprise as updateEnterpriseApi
} from '../../helpers/backend_helpers.ts';

export const getAllEnterprise = createAsyncThunk('Plot/getAllEnterprise', async () => {
  try {
    const response = getAllEnterpriseApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getEnterpriseByMTU = createAsyncThunk('Plot/getEnterpriseByMtu', async (enterprise: string) => {
  try {
    const response = getEnterpriseByMTUApi(enterprise);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewEnterprise = createAsyncThunk<any, any>('Plot/addEnterprise', async (Enterprise: any, { rejectWithValue }) => {
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
export const updateEnterprise = createAsyncThunk('Plot/updateEnterprise', async (Enterprise: any, { rejectWithValue }) => {
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


