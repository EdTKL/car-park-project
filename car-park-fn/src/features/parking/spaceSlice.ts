import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Car, CarPark } from "../models";

export interface ParkingState {
  space: CarPark[];
}

const initialState: ParkingState = {
    space: [
    {id: 0, name: "baileyStreet", totalSpace: 20, 
    smCarSpace: 10, mdCarSpace: 5, motoSpace: 5}
  ],
};


export const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    edit_space: (state: ParkingState, action: PayloadAction<CarPark>) => {
      state.space.map((carPark) => carPark.id === action.payload.id?
      carPark.totalSpace = action.payload.totalSpace :
      carPark)}
    }
})

export const { edit_space } = parkingSlice.actions;
export default parkingSlice.reducer;