import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PriceList } from "../models";

export type ePriceState = {
    prices: PriceList[];
    date: string;
    editSuccess: boolean|null;
}

export function formatDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${year}-${month}-${day}`;
}

export const initialState: ePriceState = {
    prices: [],
    date: formatDate(),
    editSuccess: null
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

    thunkAPI.dispatch(getPrice(json.data))
    return thunkAPI.fulfillWithValue("success");
  } catch(err:any){
    return thunkAPI.rejectWithValue({message:err.message})
  }
});

export const fetchDatePrices = createAsyncThunk('fee/fetch', async (date:string, thunkAPI) => {
  try{
    
    const res = await fetch(`${process.env.REACT_APP_API_BASE}fee/feelist`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
          date: date
      }),
    })
    const json = await res.json() as any;

    thunkAPI.dispatch(getPrice(json.data))
    return thunkAPI.fulfillWithValue("success");
  } catch(err:any){
    return thunkAPI.rejectWithValue({message:err.message})
  }
});

export const editPrices = createAsyncThunk('fee/updatefee', async (formatted:PriceList[], thunkAPI) => {
  let { id, ...rest } = formatted[0]
  //console.log(rest)
  try{
    //https://api.carpark.live/fee/updatefee
    const res = await fetch(`${process.env.REACT_APP_API_BASE}fee/updatefee`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(
          rest
      ),
    })
    const json = await res.json() as any;

    thunkAPI.dispatch(setPrice(json.data))
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
        setPrice:(state: ePriceState, action: PayloadAction<boolean>)=>{
            state.editSuccess = action.payload;
        }
    },
})

export const { getPrice, setPrice } = ePriceSlice.actions;
export default ePriceSlice.reducer;
