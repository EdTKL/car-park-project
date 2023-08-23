import React, { useState } from "react";
// import { login, loginThunk } from "./authSlice";
import { useAppDispatch } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/slice/authSlice";
import './Login.scss'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


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
        navigate("/home")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
    <div className="bg-container"></div>
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <div className="login-title">
          <Typography variant="h5" sx={{color: 'success.main', fontWeight: 700, marginBottom:"10px"}}>
            <>登入</>
          </Typography>
        </div>
        <div id="login-input-blank">
        <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" >用戶名稱</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              color='success'

              value={username}
              // sx={{color:'success.main'}}
              onChange={(e) => setUsername(e.target.value)}
              label="用戶名稱"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{color:'success.main'}}>密碼</InputLabel>
            <OutlinedInput

              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              color='success'

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
              label="密碼"
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
        <Stack direction="row" spacing={2} id="login-button-container">
          <IconButton aria-label="login" id="login-button" type="submit" value="submit" >
          <VpnKeyIcon />
          </IconButton>
        </Stack>

      </form>
    </div>
    </>

  );
}
