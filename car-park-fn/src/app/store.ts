import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/home/carSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: { 
    carState: carReducer, auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;