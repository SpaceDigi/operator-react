import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  USER_ID: null,
};

export const authSlice = createSlice({
  name: 'root',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.USER_ID = action.payload;
    },
  },
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
