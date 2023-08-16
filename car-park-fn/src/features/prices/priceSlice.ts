import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PriceList } from "../models";

export type ePriceState = {
    prices: PriceList[];
    error: string | null;
    date: string
}

function formatDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${year}-${month}-${day}`;
}

export const initialState: ePriceState = {
    prices: [],
    error: null,
    date: formatDate()
}

export const fetchPrices = createAsyncThunk('fee/fetch', async (date:string, thunkAPI) => {
  try{
    
    const res = await fetch(`${process.env.REACT_APP_API_BASE}fee/feelist`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
          date: formatDate()
      }),
    })
    const json = await res.json() as any;
    //console.log(json.data)

    thunkAPI.dispatch(getPrice(json.data))
    return thunkAPI.fulfillWithValue("success");
  } catch(err:any){
    return thunkAPI.rejectWithValue({message:err.message})
  }
});

export const ePriceSlice = createSlice({
    name: "ePrice", 
    initialState, 
    reducers: {
        getPrice: (state: ePriceState, action: PayloadAction<PriceList[]>)=>{
            state.prices = action.payload
        },
        //setPrice:(state: ePriceState, action: PayloadAction<PriceList>)=>{
        //    state.prices.push(action.payload)
        //}
    },
})

export const { getPrice } = ePriceSlice.actions;
export default ePriceSlice.reducer;