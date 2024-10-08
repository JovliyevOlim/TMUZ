import { createSlice } from '@reduxjs/toolkit';
import { getAllCategory, addNewCategory, updateCategory } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  category: [],
  message: ''
}

export const initialState: initialState = {
  category: [],
  error: null,
  loading: false,
  isAction: false,
  isSuccess: false,
  message: ''
};

const sliceOptions = {
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {

    // get all Category
    builder.addCase(getAllCategory.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllCategory.fulfilled, (state: any, action: any) => {
        state.category = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllCategory.rejected, (state: any) => {
        state.category = []
        state.loading = false;
      });

    // add new Category
    builder.addCase(addNewCategory.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(addNewCategory.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    });
    builder.addCase(addNewCategory.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

    //update Category
    builder.addCase(updateCategory.pending, (state: any) => {
      state.loading = true;
    }).addCase(updateCategory.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(updateCategory.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
    });

  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;