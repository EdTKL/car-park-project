import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CarPark } from "../models";

export interface ParkingState {
  space: CarPark[];
}

const initialState: ParkingState = {
    space: [
    {id: 0, name: "baileyStreet",
    smCarSpace: 10, mdCarSpace: 5, motoSpace: 5,
    get totalSpace() {
      return this.smCarSpace + this.mdCarSpace + this.motoSpace;
    }
  }],
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