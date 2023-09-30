import * as types from "./types";

export const setToken = token => ({
    type: types.GET_TOKEN,
    payload: token
});

