import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car } from "../models";

export interface ParkingState {
  parkingList: Car[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ParkingState = {
    parkingList: [],
    loading: 'idle',
    error: null,
}

export const fetchParking = createAsyncThunk('parking/fetch', async () => {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_BASE}carpark/getParking`)
    const result = await response.json();
    return result.data as Car[];
  }catch(err){
    console.log(err);
    throw err;
  }
});


export const parkingSlice = createSlice({
  name: "parkingList",
  initialState,
  reducers: {
    add_parking: (state: ParkingState, action: PayloadAction<Car>) => {
      state.parkingList.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchParking.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchParking.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.parkingList = action.payload;
      })
      .addCase(fetchParking.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch parking list';
      });
  }    
});

export const { add_parking } = parkingSlice.actions;
export default parkingSlice.reducer