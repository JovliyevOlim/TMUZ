import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewUser as addNewUserApi,
  getAllUser as getAllUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
  // getUserById as getUserByIdApi
} from '../../helpers/backend_helpers.ts';

export const getAllUser = createAsyncThunk('user/getAllUser', async (supplier: string) => {
  try {
    const response = getAllUserApi(supplier);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewUser = createAsyncThunk<any, any>('user/addUser', async (user: any, { rejectWithValue }) => {
  try {
    const response = addNewUserApi(user);
    const data = await response;
    toast.success('Xodim qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateUser = createAsyncThunk('user/updateUser', async (user: any, { rejectWithValue }) => {
  try {
    const response = updateUserApi(user);
    const data = await response;
    toast.success('Xodim tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteUser = createAsyncThunk('user/deleteUser', async (user: string, { rejectWithValue }) => {
  try {
    const response = deleteUserApi(user);
    const data = await response;
    toast.success("Xodim o'chirildi", { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

