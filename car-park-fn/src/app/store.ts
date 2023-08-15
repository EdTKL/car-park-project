import { combineReducers, configureStore } from "@reduxjs/toolkit";
import carReducer, { CarState } from "../features/cars/carSlice";
import spaceReducer, { SpaceState } from "../features/space/spaceSlice";
import navSideReducer, { DrawerState } from "../features/bars/navSideSlice";
import { AuthState } from "../redux/interface/model";
import { authReducer } from "../redux/slice/authSlice";
import ePriceReducer, { ePriceState } from "../features/prices/priceSlice";
import { ParkingState } from "../features/parking/parkingSlice";
import  parkingReducer  from "../features/parking/parkingSlice"

export interface RootState {
  auth:AuthState,
  carState:CarState
  spaceState: SpaceState,
  drawerState: DrawerState,
  ePriceState: ePriceState,
  parkingState: ParkingState
}

const combine_reducer = combineReducers<RootState>({
  auth:authReducer,
  carState: carReducer,
  spaceState: spaceReducer,
  drawerState: navSideReducer,
  ePriceState: ePriceReducer,
  parkingState: parkingReducer,
})

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: combine_reducer
});
