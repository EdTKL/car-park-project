import React, { useState } from "react";
// import { login, loginThunk } from "./authSlice";
import { useAppDispatch } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { login, loginThunk } from "../../redux/slice/authSlice";
import './Login.scss'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }))
      .unwrap()
      .then(() => {


        navigate("/")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <h3>Login</h3>
        <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput

              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}

              value={password}
              onChange={(e) => setPassword(e.target.value)}

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>

              }
              label="Password"
            />
          </FormControl>
        </div>

        {/* <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div> */}

        <input type="submit" value="submit"></input>
      </form>
    </div>

  );
}
