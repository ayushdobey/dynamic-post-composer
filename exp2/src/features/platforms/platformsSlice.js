import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const platformsAdapter = createEntityAdapter();
const initialState = platformsAdapter.setAll(platformsAdapter.getInitialState(), [
  { id: 'linkedin', name: 'LinkedIn', color: '#0a66c2' },
  { id: 'instagram', name: 'Instagram', color: '#d62976' },
  { id: 'x', name: 'X / Twitter', color: '#252525' },
]);

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {},
});

export const platformSelectors = platformsAdapter.getSelectors((state) => state.platforms);
export default platformsSlice.reducer;
