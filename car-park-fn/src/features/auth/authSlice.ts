import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface AuthState {
  isAuth: boolean;
  role: "admin" | "staff" | "";
  username: string;
  loading: boolean;
  error: string | undefined;
}

interface JWTPayload {
  username: string;
  uuid: string;
}



let initialState: AuthState;
initialState = {
  isAuth: !!window.localStorage.getItem("token"),
  role: "",
  username: "",
  loading: false,
  error: undefined,
};

export const setUserRole = createAction<string>("@auth/setUserRole");

// Thunk

export const loginThunk = createAsyncThunk<
  string,
  { username: string; password: string },
  { rejectValue: string }
>("@auth/login", async ({ username, password }, thunkAPI) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const JWT_token = await res.json();
    return JWT_token.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("AUTH Login failed");
  }
});

// authSlice

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.username = action.payload;
      console.log("check action payload", action.payload);
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setUserRole: (state, action: PayloadAction<any>) => {
      state.role = action.payload;}
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("check jwt", action.payload);
        let decoded: JWTPayload = jwt_decode(action.payload);
        console.log("check decoded", decoded);
        state.username = decoded.username;
        state.isAuth = true;

        if (/* if user is admin */"") {
          state.role = "admin";
        } else {
          state.role = "staff";
        }

        localStorage.setItem("token", action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
