import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SelectedState = {
    path: string | null
}

export const initialState: SelectedState = {
    path: "/home"
}

export const selectedSlice = createSlice({
    name: "selectedState",
    initialState,
    reducers: {
        setSelected: (state: SelectedState,action:PayloadAction<{path:string}>)=>{
            state.path = action.payload.path
        }
    }
})

export const { setSelected } = selectedSlice.actions;
export const selectedReducer =  selectedSlice.reducer;