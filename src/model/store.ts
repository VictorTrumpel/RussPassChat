import { configureStore } from '@reduxjs/toolkit';
import { concernSliceReducer } from './concernSlice';
import { userInfoSliceReducer } from './userInfoSlice';

export const store = configureStore({
  reducer: {
    concern: concernSliceReducer,
    userInfo: userInfoSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
