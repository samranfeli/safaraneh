import { createSlice } from "@reduxjs/toolkit";

type PortalInfo = {
    MetaTags?: {
        name: string;
        content: string;
    }[];
    Phrases: any[];
};

const initialState: PortalInfo = {
    Phrases: [],
    MetaTags: []
};

export const portalSlice = createSlice({
    name: "portal",
    initialState,
    reducers: {
        setReduxPortal: (state, action) => {
            state.MetaTags = action.payload.MetaTags;
            state.Phrases = action.payload.Phrases;
        }
    }
});

export const { setReduxPortal } = portalSlice.actions

export default portalSlice.reducer;