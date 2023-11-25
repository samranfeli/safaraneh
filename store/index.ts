import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";

export const store = configureStore({
    reducer:{
        error: errorSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch