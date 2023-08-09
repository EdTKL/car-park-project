import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../models";

export interface CarState {
  carList: Car[];
}

const initialState: CarState = {
  carList: [
    {id: 1, invoice: "2300127800", plate: "AB1234", type: "電單車", 
    in_out: "進", time: "8月1日 08:55", totalHrs: 10, 
    parkedHrs: 1, parkedDays: 1, parkedNights: 0, payment: 0, 
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 2, invoice: "2300127801", plate: "AB1235", type: "私家車",
    in_out: "出", time: "8月1日 09:55", totalHrs: 20,
    parkedHrs: 0, parkedDays: 1, parkedNights: 1, payment: 200,
    status: "已出車", staff_id: "C1508A83", edited: false },
    {id: 3, invoice: "2300127802", plate: "AB1236", type: "中貨車",
    in_out: "進", time: "8月1日 10:55", totalHrs: 5,
    parkedHrs: 10, parkedDays: 0, parkedNights: 0, payment: 0,
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 4, invoice: "2300127800", plate: "AB1234", type: "私家車", 
    in_out: "進", time: "8月1日 08:55", totalHrs: 10, 
    parkedHrs: 1, parkedDays: 1, parkedNights: 0, payment: 0, 
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 5, invoice: "2300127801", plate: "AB1235", type: "私家車",
    in_out: "出", time: "8月1日 09:55", totalHrs: 20,
    parkedHrs: 0, parkedDays: 1, parkedNights: 1, payment: 200,
    status: "已出車", staff_id: "C1508A83", edited: false },
    {id: 6, invoice: "2300127802", plate: "AB1236", type: "中貨車",
    in_out: "進", time: "8月1日 10:55", totalHrs: 5,
    parkedHrs: 10, parkedDays: 0, parkedNights: 0, payment: 0,
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 7, invoice: "2300127800", plate: "AB1234", type: "私家車", 
    in_out: "進", time: "8月1日 08:55", totalHrs: 10, 
    parkedHrs: 1, parkedDays: 1, parkedNights: 0, payment: 0, 
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 8, invoice: "2300127801", plate: "AB1235", type: "私家車",
    in_out: "出", time: "8月1日 09:55", totalHrs: 20,
    parkedHrs: 0, parkedDays: 1, parkedNights: 1, payment: 200,
    status: "已出車", staff_id: "C1508A83", edited: false },
    {id: 9, invoice: "2300127802", plate: "AB1236", type: "中貨車",
    in_out: "進", time: "8月1日 10:55", totalHrs: 5,
    parkedHrs: 10, parkedDays: 0, parkedNights: 0, payment: 0,
    status: "停泊中", staff_id: "C1508A83", edited: false },
    {id: 10, invoice: "2300127800", plate: "AB1234", type: "私家車", 
    in_out: "進", time: "8月1日 08:55", totalHrs: 10, 
    parkedHrs: 1, parkedDays: 1, parkedNights: 0, payment: 0, 
    status: "停泊中", staff_id: "C1508A83", edited: false },
  ],
};


export const carSlice = createSlice({
  name: "carList",
  initialState,
  reducers: {
    add_car: (state: CarState, action: PayloadAction<Car>) => {
      state.carList.push(action.payload);
    },
  },
});

export const { add_car } = carSlice.actions;
export default carSlice.reducer;