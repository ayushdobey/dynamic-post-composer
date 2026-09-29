import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { selectedPlatform: 'all', searchTerm: '' },
  reducers: {
    setSelectedPlatform: (state, action) => { state.selectedPlatform = action.payload; },
    setSearchTerm: (state, action) => { state.searchTerm = action.payload; },
  },
});

export const { setSelectedPlatform, setSearchTerm } = uiSlice.actions;
export default uiSlice.reducer;
