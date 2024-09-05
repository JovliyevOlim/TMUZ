import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewJob as addNewJobApi,
  getJobs as getJobsApi,
  updateJob as updateJobApi,
  deleteJob as deleteJobApi
} from '../../helpers/backend_helpers.ts';


export const getJobs = createAsyncThunk('job/getJobs', async () => {
  try {
    const response = getJobsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewJob = createAsyncThunk<any, any>('job/addJob', async (user: any, { rejectWithValue }) => {
  try {
    const response = addNewJobApi(user);
    const data = await response;
    toast.success('Ish qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});
export const updateJob = createAsyncThunk<any, any>('job/updateJob', async (job: any, { rejectWithValue }) => {
  try {
    const response = updateJobApi(job);
    const data = await response;
    toast.success('Ish taxrirlandi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});

export const deleteJob = createAsyncThunk('job/deleteJob', async (job: string) => {
  try {
    const response = deleteJobApi(job);
    const data = await response;
    toast.success('Work  Deleted Successfully', { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error('Work  Deleted Failed', { autoClose: 3000 });
    return error;
  }
});

