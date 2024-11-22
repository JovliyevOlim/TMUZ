import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods

import {
  getAllRoles as getAllRolesApi
} from '../../helpers/backend_helpers.ts';

export const getAllRoles = createAsyncThunk('roles/getAllRoles', async () => {
  try {
    const response = getAllRolesApi();
    return response;
  } catch (error) {
    return error;
  }
});