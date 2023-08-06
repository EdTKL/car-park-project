import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/home/carSlice";

export const store = configureStore({
  reducer: { 
    carState: carReducer 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;