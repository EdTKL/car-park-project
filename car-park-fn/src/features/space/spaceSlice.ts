import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CarPark } from "../models";

export interface SpaceState {
  space: CarPark[];
}

const initialState: SpaceState = {
  space: [
    {
      id: 0,
      name: "baileyStreet",
      smCarSpace: 15,
      mdCarSpace: 2,
      motoSpace: 3,
      get totalSpace() {
        return this.smCarSpace + this.mdCarSpace + this.motoSpace;
      },
    },
  ],
};

export const spaceSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    edit_space: (state: SpaceState, action: PayloadAction<CarPark>) => {
      state.space.map((carPark) =>
        carPark.id === action.payload.id ? (
          carPark.smCarSpace = action.payload.smCarSpace,
          carPark.mdCarSpace = action.payload.mdCarSpace,
          carPark.motoSpace = action.payload.motoSpace
        ) : (carPark)
      );
    },
  },
});

export const { edit_space } = spaceSlice.actions;
export default spaceSlice.reducer;
