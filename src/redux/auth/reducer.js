import * as types from "./types";

const initState = {
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
