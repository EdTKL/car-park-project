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