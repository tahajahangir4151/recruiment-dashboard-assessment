import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { countriesApi } from "./baseQuery";
import { recruitmentsApi } from "./recruitmentsApi";
import { countrySlice } from "./slices/countrySlice";
import recruitmentsReducer from "./slices/recruitmentsSlice";

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    [recruitmentsApi.reducerPath]: recruitmentsApi.reducer,
    country: countrySlice.reducer,
    recruitments: recruitmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      countriesApi.middleware,
      recruitmentsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
