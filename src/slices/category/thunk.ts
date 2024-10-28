import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewCategory as addNewCategoryApi,
  updateCategory as updateCategoryApi,
  getAllCategory as getAllCategoryApi,
  deleteCategory as deleteCategoryApi
} from '../../helpers/backend_helpers.ts';

export const getAllCategoryFalse = createAsyncThunk('Category/getAllCategoryFalse', async () => {
  try {
    const response = getAllCategoryApi(false);
    return response;
  } catch (error) {
    return error;
  }
});
export const getAllCategoryTrue = createAsyncThunk('Category/getAllCategoryTrue', async () => {
  try {
    const response = getAllCategoryApi(true);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewCategory = createAsyncThunk<any, any>('Category/addCategory', async (Category: any, { rejectWithValue }) => {
  try {
    const response = addNewCategoryApi(Category);
    const data = await response;
    toast.success('Qurilma turi qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateCategory = createAsyncThunk('Category/updateCategory', async (Category: any, { rejectWithValue }) => {
  try {
    const response = updateCategoryApi(Category);
    const data = await response;
    toast.success('Qurilma turi tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteCategory = createAsyncThunk('Category/deleteCategory', async (Mtu: any, { rejectWithValue }) => {
  try {
    const response = deleteCategoryApi(Mtu);
    const data = await response;
    toast.success('Qurilma turi o\'chirildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

