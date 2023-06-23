import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";

export const getBCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBCategories = createAsyncThunk(
  "blogCategory/create-categories",
  async (BCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBCategories(BCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getBCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBCategory = action.payload;
      })
      .addCase(createBCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCategorySlice.reducer;
