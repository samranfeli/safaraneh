import { createSlice } from "@reduxjs/toolkit";

type Authentication = {
    isAuthenticated: boolean;
    getUserLoading: boolean;
    user: any;
    balance?: number;
    balanceLoading? : boolean;
};

const initialState: Authentication = {
    isAuthenticated: false,
    getUserLoading: false,
    user: {},
    balance: undefined,
    balanceLoading: false
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
            state.balance = action.payload.balance;
            state.balanceLoading = action.payload.loading;
        }
    }
});

export const { setReduxUser, setReduxBalance } = authenticationSlice.actions

export default authenticationSlice.reducer;