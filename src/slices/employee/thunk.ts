import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewEmployee as addNewEmployeeApi,
  getAllEmployee as getAllEmployeeApi,
  updateEmployee as updateEmployeeApi,
  getEmployeeByEnterPrise as getEmployeeByEnterPriseApi,
  deleteEmployee as deleteEmployeeApi,
} from '../../helpers/backend_helpers.ts';

export const getAllEmployee = createAsyncThunk('Employee/getAllEmployee', async () => {
  try {
    const response = getAllEmployeeApi();
    return response;
  } catch (error) {
    return error;
  }
});
export const getEmployeeByEnterPrise = createAsyncThunk('Employee/getEmployeeByEnterPrise', async (enterPriseId:string) => {
  try {
    const response = getEmployeeByEnterPriseApi(enterPriseId);
    return response;
  } catch (error) {
    return error;
  }
});
export const addNewEmployee = createAsyncThunk<any, any>('Employee/addEmployee', async (Employee: any, { rejectWithValue }) => {
  try {
    const response = addNewEmployeeApi(Employee);
    const data = await response;
    toast.success('Xodim qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateEmployee = createAsyncThunk('Employee/updateEmployee', async (Employee: any, { rejectWithValue }) => {
  try {
    const response = updateEmployeeApi(Employee);
    const data = await response;
    toast.success('Xodim tahrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const deleteEmployee = createAsyncThunk('Employee/deleteEmployee', async (Employee: string, { rejectWithValue }) => {
  try {
    const response = deleteEmployeeApi(Employee);
    const data = await response;
    toast.success("Xodim o'chirildi", { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

