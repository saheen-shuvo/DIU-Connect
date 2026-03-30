import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });