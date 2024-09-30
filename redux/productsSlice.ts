import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store'; 

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
  skip: number;
  total: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  skip: 0,
  total: 0,
};

// Fetch products based on category or search
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, search }: { category?: string; search?: string }, { getState }) => {
    const { skip } = (getState() as RootState).products;
    let url = '';

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=10&skip=${skip}`;
    } 
    else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${skip}`;
    } 
    else {
      url = `https://dummyjson.com/products?limit=10&skip=${skip}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementSkip: (state) => {
      state.skip += 10;
    },
    resetSkip: (state) => {
      state.skip = 0;
      state.products = []; // Reset products when category or search changes
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products]; // Append new products to the existing products array
      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    });
  },
});

export const { incrementSkip, resetSkip } = productsSlice.actions;
export default productsSlice.reducer;
