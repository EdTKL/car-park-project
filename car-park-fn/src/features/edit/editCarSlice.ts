import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//const initialState: = {
//    
//}

export const editIn = createAsyncThunk('edit/in', async ()=>{
    try {
        const res = await fetch (`${process.env.REACT_APP_API_BASE}editInRecord`)
        const result = await res.json()
        return result.data 
    } catch (err) {
        console.log(err);
        throw err;
    }
})

export const editOut = createAsyncThunk('edit/out', async ()=>{
    try {
        const res = await fetch (`${process.env.REACT_APP_API_BASE}editOutRecord`)
        const result = await res.json()
        return result.data 
    } catch (err) {
        console.log(err);
        throw err;
    }
})

// export const editCarSlice = createSlice({
//     name: "editCarList",
//     initialState,
//     reducers: {

//     }
// })