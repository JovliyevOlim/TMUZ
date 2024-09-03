import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  addNewUser as addNewUserApi
} from '../../helpers/backend_helpers.ts';


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


