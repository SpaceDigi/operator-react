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
  error: {
    message: null,
    code: null,
  },
};

const initialState = {
  USER_ID: null,
  serviceCenter: {
    id: null,
    title: null,
  },
  workplace: {
    id: null,
    title: null,
  },
  userData: initialUserState,
  orgGuid: '',
  orgName: '',
  ticketInProgress: false,
  ticketTime: 0,
};

export const authSlice = createSlice({
  name: 'root',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.USER_ID = action.payload;
    },
    setWorkplace: (state, action) => {
      state.workplace = {
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    setServiceCenter: (state, action) => {
      state.serviceCenter = {
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    logout: (state) => {
      state.serviceCenter = {
        id: null,
        title: null,
      };
      state.workplace = {
        id: null,
        title: null,
      };
      state.USER_ID = null;
      state.orgGuid = '';
      state.userData = initialUserState;
    },
    setUserData: (state, action) => {
      state.userData = { ...action.payload };
    },
    setError: (state, action) => {
      state.error = { ...action.payload };
    },
    setOrgGuid: (state, action) => {
      state.orgGuid = action.payload;
    },
    setOrgName: (state, action) => {
      state.orgName = action.payload;
    },
    setTicketInProgress: (state, action) => {
      state.ticketInProgress = action.payload;
    },
    setTicketTime: (state, action) => {
      state.ticketTime = action.payload;
    },
  },
});

export const {
  setUserId,
  setUserData,
  setServiceCenter,
  setWorkplace,
  logout,
  setError,
  setOrgGuid,
  setOrgName,
  setTicketInProgress,
  setTicketTime,
} = authSlice.actions;

export default authSlice.reducer;
