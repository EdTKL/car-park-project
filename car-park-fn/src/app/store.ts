import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/cars/carSlice";
import spaceReducer from "../features/parking/spaceSlice";

export const store = configureStore({
  reducer: { 
    carState: carReducer,
    spaceState: spaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;