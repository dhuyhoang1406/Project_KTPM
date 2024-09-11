import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProductForSearch } from '../../services/ProductService';

const initialState = {
  search: '',
  products: [],
  status: 'idle',
  error: null,
};

export const searchProducts = createAsyncThunk('product/search', async (searchTerm) => {
  const response = await getAllProductForSearch(searchTerm);
  return response;
});

export const clearProducts = createAction('product/clearProducts');

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(clearProducts, (state) => {
        state.products = [];
      });
  },
});

export default productSlice.reducer;
