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
    edit_Space: (state: ParkingState, action: PayloadAction<{id:number,key:`smCarSpace`|`mdCarSpace`|`motoSpace`,value:number}>) => {
      if (action.payload.key === "smCarSpace") {
        state.space = state.space.map(obj=>obj.id===action.payload.id?Object.assign(obj,{smCarSpace:action.payload.value}):obj)
      } else if (action.payload.key === "mdCarSpace") {
        state.space = state.space.map(obj=>obj.id===action.payload.id?Object.assign(obj,{mdCarSpace:action.payload.value}):obj)
      } else if (action.payload.key === "motoSpace") {
        state.space = state.space.map(obj=>obj.id===action.payload.id?Object.assign(obj,{motoSpace:action.payload.value}):obj)
      }
    }

  }
})
//   edit_mdSpace: (state: ParkingState, action: PayloadAction<{mdCarSpace: number}>) => {
//     
//   },
//   edit_motoSpace: (state: ParkingState, action: PayloadAction<{motoSpace: number}>) => {
//     state.space[0].motoSpace = action.payload.motoSpace;
//   },
// }



export const { edit_Space } = parkingSlice.actions;
export default parkingSlice.reducer;