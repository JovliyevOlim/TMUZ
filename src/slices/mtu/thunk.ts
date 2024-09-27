import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewMtu as addNewMtuApi,
  updateMtu as updateMtuApi,
  getAllMtu as getAllMtuApi
} from '../../helpers/backend_helpers.ts';

export const getAllMtu = createAsyncThunk('mtu/getAllMtu', async () => {
  try {
    const response = getAllMtuApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewMtu = createAsyncThunk<any, any>('Mtu/addMtu', async (Mtu: any, { rejectWithValue }) => {
  try {
    const response = addNewMtuApi(Mtu);
    const data = await response;
    toast.success('Mtu qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateMtu = createAsyncThunk('Mtu/updateMtu', async (Mtu: any, { rejectWithValue }) => {
  try {
    const response = updateMtuApi(Mtu);
    const data = await response;
    toast.success('Mtu tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


