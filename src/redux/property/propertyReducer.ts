import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  data: {},
};

const propertySlice = createSlice({
  name: SLICE_TYPES.PROPERTY,
  initialState,
  reducers: {
    // actionPart: (state, payload) => {},
  },
  extraReducers: () => {},
});

// export const { actionPart } = homeSlice.actions;

export const getPropertyData = (state: RootState) => state.property.data;

export default propertySlice.reducer;
