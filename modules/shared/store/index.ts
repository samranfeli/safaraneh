import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import portalSlice from "./portalSlice";
import domesticHotelSlice from "@/modules/domesticHotel/store/domesticHotelSlice";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        portal: portalSlice,
        domesticHotelFilter: domesticHotelSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch