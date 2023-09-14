import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car } from "../models";

export interface CarState {
  carList: Car[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CarState = {
    carList: [],
    loading: 'idle',
    error: null,
}

export const fetchCars = createAsyncThunk('carList/fetch', async () => {
  try{
  const response = await fetch(`${process.env.REACT_APP_API_BASE}carpark/carlist`)
  const result = await response.json();
  return result.data as Car[];
  }
  catch(err){
    console.log(err);
    throw err;
  }
});

//edit car list
export const editIn = createAsyncThunk('edit/in', async (editIn: Car, thunkAPI)=>{
  console.log(editIn)
  let rest = {
                "invoice_num": editIn.invoice_num,
	              "plate_num": editIn.plate_num,
	              "vehicle_type": editIn.vehicle_type,
	              "entry_time": editIn.time,
	              "staff_id": editIn.staff_id
              }
    
    try {
        const res = await fetch (`${process.env.REACT_APP_API_BASE}carpark/editInRecord`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify(
              rest
          ),
        })
        const json = await res.json()
        console.log(json.data)
        thunkAPI.dispatch(add_car(editIn))
        return thunkAPI.fulfillWithValue("success"); 
    } catch (err:any) {
        return thunkAPI.rejectWithValue({message:err.message})
    }
})

export const editOut = createAsyncThunk('edit/out', async (editOut: Car, thunkAPI)=>{
  //console.log(editOut)
  //let send = JSON.stringify(
  //            {
  //              "invoice_num": editOut.invoice_num,
  //              "plate_num": editOut.plate_num,
  //              "vehicle_type": editOut.vehicle_type,
  //              "exit_time": editOut.time,
  //              "staff_id": editOut.staff_id,
  //              "total_hours": editOut.total_hours,
  //              "parked_hours": editOut.parked_hours,
  //              "parked_days": editOut.parked_days,
  //              "parked_nights": editOut.parked_nights,
  //              "payment": editOut.payment
  //            }
  //        )
    //console.log(send)
    try {
        const res = await fetch (`${process.env.REACT_APP_API_BASE}carpark/editOutRecord`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify(
              {
                "invoice_num": editOut.invoice_num,
                "plate_num": editOut.plate_num,
                "vehicle_type": editOut.vehicle_type,
                "exit_time": editOut.time,
                "staff_id": editOut.staff_id,
                "total_hours": editOut.total_hours,
                "parked_hours": editOut.parked_hours,
                "parked_days": editOut.parked_days,
                "parked_nights": editOut.parked_nights,
                "payment": editOut.payment
              }
          ),
        })
        const json = await res.json()
        console.log(json.data)
        thunkAPI.dispatch(add_car(editOut))
        return thunkAPI.fulfillWithValue("success");  
    } catch (err:any) {
        return thunkAPI.rejectWithValue({message:err.message})
    }
})


export const carSlice = createSlice({
  name: "carList",
  initialState,
  reducers: {
    add_car: (state: CarState, action: PayloadAction<Car>) => {
      state.carList.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.carList = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch cars';
      });
  }    
});

export const { add_car } = carSlice.actions;
export default carSlice.reducer;