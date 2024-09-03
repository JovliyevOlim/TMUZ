import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewWork as addNewWorkApi
} from '../../helpers/backend_helpers.ts';


export const addNewWork = createAsyncThunk<any, any>('work/addWork', async (user: any, { rejectWithValue }) => {
  try {
    const response = addNewWorkApi(user);
    const data = await response;
    toast.success('Ish qo\'shildi', { autoClose: 3000 });
    return data;
  } catch (error) {
    let message: any = error;
    toast.error(message, { autoClose: 3000 });
    return rejectWithValue(error);
  }
});


