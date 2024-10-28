import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoryFalse, getAllCategoryTrue, addNewCategory, updateCategory, deleteCategory } from './thunk';


interface initialState {
  error: string | null,
  loading: boolean,
  isAction: boolean,
  isSuccess: boolean,
  categoryFalse: [],
  categoryTrue: [],
  message: ''
}

export const initialState: initialState = {
  categoryFalse: [],
  categoryTrue: [],
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
    builder.addCase(getAllCategoryTrue.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllCategoryTrue.fulfilled, (state: any, action: any) => {
        state.categoryTrue = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllCategoryTrue.rejected, (state: any) => {
        state.categoryTrue = [];
        state.loading = false;
      });

    // get all Category
    builder.addCase(getAllCategoryFalse.pending, (state: any) => {
      state.loading = true;
      state.isSuccess = false;
    })
      .addCase(getAllCategoryFalse.fulfilled, (state: any, action: any) => {
        state.categoryFalse = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllCategoryFalse.rejected, (state: any) => {
        state.categoryFalse = [];
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
    // delete category
    builder.addCase(deleteCategory.pending, (state: any) => {
      state.loading = true;
    }).addCase(deleteCategory.fulfilled, (state: any) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAction = !state.isAction;
    }).addCase(deleteCategory.rejected, (state: any) => {
      state.loading = false;
      state.isSuccess = false;
      state.isAction = !state.isAction;
      // state.error = action.payload.error || null;
    });
  }
};


const userSlice = createSlice(sliceOptions);


export default userSlice.reducer;