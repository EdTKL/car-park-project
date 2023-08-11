import { combineReducers, configureStore } from "@reduxjs/toolkit";
import carReducer, { CarState } from "../features/cars/carSlice";
import spaceReducer, { ParkingState } from "../features/parking/spaceSlice";
import navSideReducer, { DrawerState } from "../features/bars/navSideSlice";
import { AuthState } from "../redux/interface/model";
import { authReducer } from "../redux/slice/authSlice";
import ePriceReducer, { ePriceState } from "../features/prices/priceSlice";

export interface RootState {
  auth:AuthState,
  carState:CarState
  spaceState: ParkingState,
  drawerState: DrawerState,
  ePriceState: ePriceState
}

const combine_reducer = combineReducers<RootState>({
  auth:authReducer,
  carState: carReducer,
  spaceState: spaceReducer,
  drawerState: navSideReducer,
  ePriceState: ePriceReducer
})

export interface RootState {
  auth:AuthState,
  carState:CarState
  spaceState: ParkingState,

}
export type AppDispatch = typeof store.dispatch;

 
export const store = configureStore({
  reducer: combine_reducer
});
