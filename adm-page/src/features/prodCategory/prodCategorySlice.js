import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./prodCategoryService";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProdCategoryById = createAsyncThunk(
  "productCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getProdCategoryById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProdCategories = createAsyncThunk(
  "productCategory/create-productCategories",
  async (prodCategoryData, thunkAPI) => {
    try {
      return await pCategoryService.createProdCategories(prodCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAProdCategery = createAsyncThunk(
  "productCategory/update-category",
  async (prodCategory, thunkAPI) => {
    try {
      return await pCategoryService.updateProdCategory(prodCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAProdCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deleteProdCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pCategorySlice = createSlice({
  name: "pCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get All
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // get A
      .addCase(getProdCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProdCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.prodCategoryName = action.payload.title;
      })
      .addCase(getProdCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Create
      .addCase(createProdCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProdCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProdCategory = action.payload;
      })
      .addCase(createProdCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Update
      .addCase(updateAProdCategery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProdCategery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProdCategory = action.payload;
      })
      .addCase(updateAProdCategery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Delete
      .addCase(deleteAProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProdCategory = action.payload;
      })
      .addCase(deleteAProdCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Reset state
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
