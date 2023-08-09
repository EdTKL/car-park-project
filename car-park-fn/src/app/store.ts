import { combineReducers, configureStore } from "@reduxjs/toolkit";
import carReducer, { CarState } from "../features/home/carSlice";
import { authReducer } from "../redux/slice/authSlice";
import { AuthState } from "../redux/interface/model";


export interface RootState {
  auth:AuthState,
  carState:CarState

}
export type AppDispatch = typeof store.dispatch;


const combine_reducer = combineReducers<RootState>({
  auth:authReducer,
  carState: carReducer,
})
 
export const store = configureStore({
  reducer: combine_reducer
});

