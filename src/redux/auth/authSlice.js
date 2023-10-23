import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type

const initialUserState = {
  description: null,
  employeeId: null,
  firstName: null,
  initialName: null,
  lastName: null,
  postId: null,
  postName: null,
  error: null,
};

const initialState = {
  USER_ID: null,
  serviceCenterId: null,
  workplaceId: null,
  userData: initialUserState,
};

export const authSlice = createSlice({
  name: 'root',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.USER_ID = action.payload;
    },
    setWorkplaceId: (state, action) => {
      state.workplaceId = action.payload;
    },
    setServiceCenterId: (state, action) => {
      state.serviceCenterId = action.payload;
    },
    logout: (state) => {
      state.serviceCenterId = null;
      state.workplaceId = null;
      state.USER_ID = null;
      state.userData = initialUserState;
    },
    setUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUserId,
  setUserData,
  setServiceCenterId,
  setWorkplaceId,
  logout,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
