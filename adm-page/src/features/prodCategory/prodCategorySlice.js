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
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
