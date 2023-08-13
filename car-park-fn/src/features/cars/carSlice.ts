import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car } from "../models";
import { useCarList } from "./carAPI";

export interface CarState {
  carList: Car[];
}

// const initialState: CarState = {
//   carList: [
//     {id: 1, invoice_num: "2300127800", plate_num: "AB1234", vehicle_type: "電單車", 
//     in_out: "進", time: "8月1日 08:55", total_hours: 10, 
//     parked_hours: 1, parked_days: 1, parked_nights: 0, payment: 0, 
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 2, invoice_num: "2300127801", plate_num: "AB1235", vehicle_type: "私家車",
//     in_out: "出", time: "8月1日 09:55", total_hours: 20,
//     parked_hours: 0, parked_days: 1, parked_nights: 1, payment: 200,
//     status: "已出車", staff_id: "C1508A83", edited: false },
//     {id: 3, invoice_num: "2300127802", plate_num: "AB1236", vehicle_type: "中貨車",
//     in_out: "進", time: "8月1日 10:55", total_hours: 5,
//     parked_hours: 10, parked_days: 0, parked_nights: 0, payment: 0,
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 4, invoice_num: "2300127800", plate_num: "AB1234", vehicle_type: "私家車", 
//     in_out: "進", time: "8月1日 08:55", total_hours: 10, 
//     parked_hours: 1, parked_days: 1, parked_nights: 0, payment: 0, 
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 5, invoice_num: "2300127801", plate_num: "AB1235", vehicle_type: "私家車",
//     in_out: "出", time: "8月1日 09:55", total_hours: 20,
//     parked_hours: 0, parked_days: 1, parked_nights: 1, payment: 200,
//     status: "已出車", staff_id: "C1508A83", edited: false },
//     {id: 6, invoice_num: "2300127802", plate_num: "AB1236", vehicle_type: "中貨車",
//     in_out: "進", time: "8月1日 10:55", total_hours: 5,
//     parked_hours: 10, parked_days: 0, parked_nights: 0, payment: 0,
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 7, invoice_num: "2300127800", plate_num: "AB1234", vehicle_type: "私家車", 
//     in_out: "進", time: "8月1日 08:55", total_hours: 10, 
//     parked_hours: 1, parked_days: 1, parked_nights: 0, payment: 0, 
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 8, invoice_num: "2300127801", plate_num: "AB1235", vehicle_type: "私家車",
//     in_out: "出", time: "8月1日 09:55", total_hours: 20,
//     parked_hours: 0, parked_days: 1, parked_nights: 1, payment: 200,
//     status: "已出車", staff_id: "C1508A83", edited: false },
//     {id: 9, invoice_num: "2300127802", plate_num: "AB1236", vehicle_type: "中貨車",
//     in_out: "進", time: "8月1日 10:55", total_hours: 5,
//     parked_hours: 10, parked_days: 0, parked_nights: 0, payment: 0,
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//     {id: 10, invoice_num: "2300127800", plate_num: "AB1234", vehicle_type: "私家車", 
//     in_out: "進", time: "8月1日 08:55", total_hours: 10, 
//     parked_hours: 1, parked_days: 1, parked_nights: 0, payment: 0, 
//     status: "停泊中", staff_id: "C1508A83", edited: false },
//   ],
// };

const initialState: CarState = {
    carList: []
}



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