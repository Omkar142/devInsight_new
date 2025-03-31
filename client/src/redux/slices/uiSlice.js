// client/src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expandedSections: {
    interview: true,
    salary: true,
    review: true,
    news: true,
    hiring: true,
    tech: true,
    discussion: true,
  },
  isDarkMode: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      const section = action.payload;
      state.expandedSections[section] = !state.expandedSections[section];
    },
    
    expandAllSections: (state) => {
      Object.keys(state.expandedSections).forEach((key) => {
        state.expandedSections[key] = true;
      });
    },
    
    collapseAllSections: (state) => {
      Object.keys(state.expandedSections).forEach((key) => {
        state.expandedSections[key] = false;
      });
    },
    
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {
  toggleSection,
  expandAllSections,
  collapseAllSections,
  setDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;