import { createSlice } from '@reduxjs/toolkit';
import { addNewEmployee, deleteEmployee, getAllEmployee, updateEmployee } from './thunk.ts';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  employees: [],
  message: ''
}

export const initialState: initialState = {
  employees: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'Employee',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all Employee
    builder.addCase(getAllEmployee.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllEmployee.fulfilled, (state: any, action: any) => {
        state.employees = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllEmployee.rejected, (state: any) => {
        state.employees = [];
        state.loading = false;
      });

    // add new Employees
    builder.addCase(addNewEmployee.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewEmployee.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewEmployee.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update Employee
    builder.addCase(updateEmployee.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateEmployee.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateEmployee.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //delete Employee
    builder.addCase(deleteEmployee.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteEmployee.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteEmployee.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const EmployeeSlice = createSlice(sliceOptions);


export default EmployeeSlice.reducer;