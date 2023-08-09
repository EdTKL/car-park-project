import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/cars/carSlice";
import spaceReducer from "../features/parking/spaceSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: { 
    carState: carReducer,
    spaceState: spaceReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;