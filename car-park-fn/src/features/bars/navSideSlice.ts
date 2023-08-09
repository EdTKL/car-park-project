import { createSlice } from "@reduxjs/toolkit";

//const initialState: OpenState = {
//    drawerWidth: 200
//}
export type DrawerState = {
  open?: boolean | any, 
  drawerWidth: number
}
export const initialState: DrawerState = {
    open: true,
    drawerWidth: 200
}

export const navSideSlice = createSlice({
    name: "drawerState", 
    initialState, 
    reducers: {
        setWidth: (state: DrawerState)=>{
            state.open = !state.open
            if (state.open) {
                state.drawerWidth = 200
            } else if (!state.open) {
                state.drawerWidth = 64
            }
        }
    }
})

export const { setWidth } = navSideSlice.actions;
export default navSideSlice.reducer;