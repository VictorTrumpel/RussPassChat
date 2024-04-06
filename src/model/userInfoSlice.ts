import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStateType = {};

const initialState: UserInfoStateType = {};

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {},
});

export const userInfoActions = userInfoSlice.actions;

export const userInfoSliceReducer = userInfoSlice.reducer;
