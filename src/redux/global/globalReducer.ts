import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  data: {},
  GlobalSearchKey: '',
};

const globalSlice = createSlice({
  name: SLICE_TYPES.GLOBAL,
  initialState,
  reducers: {
    setGlobalSearchKey: (state, action) => {
      return {
        ...state,
        GlobalSearchKey: action.payload,
      };
    },

    clearGlobalSearchKey: state => {
      return {
        ...state,
        GlobalSearchKey: '',
      };
    },
  },
  extraReducers: () => {},
});

export const { setGlobalSearchKey, clearGlobalSearchKey } = globalSlice.actions;

// export const { actionPart } = homeSlice.actions;

export const elasticSearchData = (state: RootState) => state.global.data;
export const selectGlobalSearchKey = (state: RootState) => state.global.GlobalSearchKey;

export default globalSlice.reducer;
