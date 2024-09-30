import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetching categories to show in list
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch categories';
    });
  },
});

export default categoriesSlice.reducer;
