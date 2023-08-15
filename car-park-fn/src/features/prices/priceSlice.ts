import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PriceList } from "../models";

export type ePriceState = {
    pricetable: PriceList[]
}
export const initialState: ePriceState = {
    //pricetable: []
    pricetable: [
        {type: "motor", timeslot: "hourly", duration: "none",  mon: 19, tue: 19, wes: 19, thu: 19, fri: 19, sat: 19, sun: 19, ph: 19},
        {type: "motor", timeslot: "day", duration: "08:00 - 18:00",  mon: 105, tue: 105, wes: 105, thu: 105, fri: 105, sat: 105, sun: 105, ph: 105},
        {type: "motor", timeslot: "night", duration: "18:00 - 08:00",  mon: 80, tue: 80, wes: 80, thu: 80, fri: 80, sat: 80, sun: 80, ph: 80},
        {type: "sm", timeslot: "hourly", duration: "none",  mon: 19, tue: 19, wes: 19, thu: 19, fri: 19, sat: 19, sun: 19, ph: 19},
        {type: "sm", timeslot: "day", duration: "08:00 - 18:00",  mon: 105, tue: 105, wes: 105, thu: 105, fri: 105, sat: 105, sun: 105, ph: 105},
        {type: "sm", timeslot: "night", duration: "18:00 - 08:00",  mon: 80, tue: 80, wes: 80, thu: 80, fri: 80, sat: 80, sun: 80, ph: 80},
        {type: "md", timeslot: "hourly", duration: "none",  mon: 40, tue: 40, wes: 40, thu: 40, fri: 40, sat: 40, sun: 40, ph: 40},
        {type: "md", timeslot: "day", duration: "08:00 - 18:00",  mon: 200, tue: 200, wes: 200, thu: 200, fri: 200, sat: 200, sun: 200, ph: 200},
        {type: "md", timeslot: "night", duration: "18:00 - 08:00",  mon: 200, tue: 200, wes: 200, thu: 200, fri: 200, sat: 200, sun: 200, ph: 200}
    ]
}

export const ePriceSlice = createSlice({
    name: "ePrice", 
    initialState, 
    reducers: {
        setPrice: (state: ePriceState, action: PayloadAction<PriceList>)=>{
            console.log(state.pricetable)
            //return state.pricetable
            // state.pricetable.map((priceList)=>{priceList.dayId === action.payload.dayId?
            //     console.log(priceList.dayId) : console.log("notmatch")
            //})
        }
    }
})

export const { setPrice } = ePriceSlice.actions;
export default ePriceSlice.reducer;