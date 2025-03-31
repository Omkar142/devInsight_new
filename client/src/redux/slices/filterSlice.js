// client/src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  source: null,
  category: null,
  tag: null,
  searchQuery: '',
  activeFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    
    resetFilters: (state) => {
      state.source = null;
      state.category = null;
      state.tag = null;
      state.searchQuery = '';
      state.activeFilter = 'all';
    },
  },
});

export const {
  setSource,
  setCategory,
  setTag,
  setSearchQuery,
  setActiveFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;