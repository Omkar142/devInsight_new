// client/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from './services/contentApi';
import contentReducer from './slices/contentSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    filter: filterReducer,
    ui: uiReducer,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApi.middleware),
});
