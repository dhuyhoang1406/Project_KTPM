import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brandSelected: '',
  capacitySelected: '',
  concentrationSelected: '',
  PriceSelected: ''
};

export const sortSlide = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setBrandSelected: (state, action) => {
      state.brandSelected = action.payload;
    },
    setCapacitySelected: (state, action) => {
      state.capacitySelected = action.payload;
    },
    setConcentrationSelected: (state, action) => {
      state.concentrationSelected = action.payload;
    },
    setPriceSelected: (state, action) => {
      state.PriceSelected = action.payload;
    },
    resetSort: (state) => {
      state.brandSelected = '';
      state.capacitySelected = '';
      state.concentrationSelected = '';
      state.PriceSelected = '';
    },
  },
});

export const { setBrandSelected, setCapacitySelected, setConcentrationSelected, setPriceSelected, resetSort } = sortSlide.actions;

export default sortSlide.reducer;
