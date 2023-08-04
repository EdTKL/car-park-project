import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/dashboard/carSlice";

export const store = configureStore({
  reducer: { 
    cars: carReducer 
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;