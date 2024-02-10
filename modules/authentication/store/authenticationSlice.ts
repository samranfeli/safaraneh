import { createSlice } from "@reduxjs/toolkit";

type Authentication = {
    isAuthenticated: boolean;
    getUserLoading: boolean;
    user: any;
    balance?: number;
};

const initialState: Authentication = {
    isAuthenticated: false,
    getUserLoading: false,
    user: {},
    balance: undefined
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setReduxUser: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.getUserLoading = action.payload.getUserLoading;
        },
        setReduxBalance: (state, action) => {
            state.balance = action.payload;
        }
    }
});

export const { setReduxUser, setReduxBalance } = authenticationSlice.actions

export default authenticationSlice.reducer;