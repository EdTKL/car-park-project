import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface/model";
// import { RootState } from "../../app/store";


const initialState: AuthState = {
    isAuth: null,
    role: "",
    username: "",
    jwt:""
};


export const loginThunk = createAsyncThunk<
  string,
  { username: string; password: string },
  { rejectValue: string }
>("@auth/login", async ({ username, password }, thunkAPI) => {
  try {
    // let state = thunkAPI.getState() as RootState

    // console.log('thunk login',state.auth)
    
    const res = await fetch(`${process.env.REACT_APP_API_BASE}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const json = await res.json() as {data:{jwt:string,role:`admin`|`staff`,username:string}};
    
    thunkAPI.dispatch(login(json.data))
    
    return ""
    // return {jwt:"jwtsdad",role:"admin"}
  } catch (error) {
    throw new Error('AUTH Login failed')
    // return thunkAPI.rejectWithValue("AUTH Login failed");
  }
});

export const registerThunk = createAsyncThunk<
  string,
  { username: string; password: string,confirm_password:string,role:string },
  { rejectValue: string }
>("@auth/register", async ({ username, password,confirm_password,role }, thunkAPI) => {
  try {
    // let state = thunkAPI.getState() as RootState

    // console.log('thunk login',state.auth)
    let authState = await localStorage.getItem("auth");
    
    let obj = await JSON.parse(authState!)
    let token = obj.jwt
    console.log(token)
    const res = await fetch(`${process.env.REACT_APP_API_BASE}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirm_password:confirm_password,
        role:role
      }),
    });

    const json = await res.json() as {data:{jwt:string,role:`admin`|`staff`,username:string}};
    console.log(json)
    // thunkAPI.dispatch(register(json.data))
    
    return ""
    // return {jwt:"jwtsdad",role:"admin"}
  } catch (error) {
    throw new Error('AUTH Login failed')
    // return thunkAPI.rejectWithValue("AUTH Login failed");
  }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<{jwt:string,username:string,role:`admin`|`staff`}>) => {
        state.isAuth = true;
        state.jwt = action.payload.jwt;
        state.username = action.payload.username;
        state.role = action.payload.role;
        
        localStorage.setItem("auth", JSON.stringify(state));
      },
      // register:(state, action: PayloadAction<{jwt:string,username:string,role:`admin`|`staff`}>) => {
      //   state.isAuth = true;
      //   state.jwt = action.payload.jwt;
      //   state.username = action.payload.username;
      //   state.role = action.payload.role;
        
      //   localStorage.setItem("auth", JSON.stringify(state));
      // },
      setUserRole: (state, action: PayloadAction<any>) => {
        state.role = action.payload;
      },
      logout: (state) => {
        state.isAuth = false
        state.jwt = "";
        state.username = ""
        state.role = "";
        
        localStorage.removeItem('auth')
        
    }
    }
})    



export const { login,setUserRole,logout } = authSlice.actions;

export const authReducer = authSlice.reducer;


