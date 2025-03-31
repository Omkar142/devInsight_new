
// client/src/redux/slices/contentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    
    appendItems: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    
    setPage: (state, action) => {
      state.page = action.payload;
    },
    
    incrementPage: (state) => {
      state.page += 1;
    },
    
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    resetContent: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setItems,
  appendItems,
  setPage,
  incrementPage,
  setHasMore,
  setLoading,
  setError,
  resetContent,
} = contentSlice.actions;

export default contentSlice.reducer;