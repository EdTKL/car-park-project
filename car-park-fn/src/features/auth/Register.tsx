import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { registerThunk } from "../../redux/slice/authSlice";
import './Register.scss'
import { FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, ListItem, OutlinedInput, Radio, RadioGroup, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Divider from '@mui/material/Divider';
import { setSelected } from "../bars/selected/selectedSlice";
import logo from "../bars/sidebarLogo.png"
// import { setUserRole } from "./authSlice";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");


  const dispatch = useAppDispatch();
  // const userRole = useAppSelector((state) => state.auth.role);
  const [role, setRole] = useState("staff");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm_password) {
      alert("密碼與確認密碼不符合。")
    }
    dispatch(registerThunk({ username, password, confirm_password, role }))
      .unwrap()
      .then(() => {


        navigate("/home")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // if (userRole !== "admin") {
  //   return <div>You do not have permission to access this page.</div>;
  // }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value)
  }



  return (
    <>
    <div className="bg-container"></div>
    <ListItem sx={{position: 'absolute', pt: 2, pl: 3 }} onClick={()=>dispatch(setSelected({path: '/home'}))}>
      <Link to={'/home'}>
        <img src={logo} alt='主頁'/>
      </Link>
    </ListItem>
    <div className="register-container">
      <form onSubmit={submitHandler} className="register-form">
        <div className="register-title">
          <Typography variant="h5" sx={{ color: 'success.main', fontWeight: 700, marginBottom: "10px" }}>
            <>註冊</>
          </Typography>
        </div>
        <FormControl id="register-role-form">
          <FormLabel id="demo-controlled-radio-buttons-group">
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 300, fontSize: 17 ,marginBottom: "0" }}>
            <>帳號角色</>
          </Typography>
            </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            id="register-role-container"
            value={role}
            onChange={handleChange}
          >
            <FormControlLabel className="register-role" id="rr1" value="admin" control={<Radio />} label="管理員"/>
            <FormControlLabel className="register-role" id="rr2" value="staff" control={<Radio />} label="員工" />
          </RadioGroup>
        </FormControl>

        <Divider 
        color="#476800"
        sx={{marginTop: "10px", marginBottom: "15px"}}
        />

        <div id="register-input-blank">
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username" >用戶名稱</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              color='success'

              value={username}
              // sx={{color:'success.main'}}
              onChange={(e) => setUsername(e.target.value)}
              label="用戶名稱"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'success.main' }}>密碼</InputLabel>
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
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cfPassword" sx={{ color: 'success.main' }}>確認密碼</InputLabel>
            <OutlinedInput

              id="outlined-adornment-cfPassword"
              type={showPassword ? 'text' : 'password'}
              color='success'

              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}

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
              label="確認密碼"
            />
          </FormControl>
        </div>

        <Stack direction="row" spacing={2} id="register-button-container">
          <IconButton aria-label="register" id="register-button" type="submit" value="submit" >
            <HowToRegIcon />
          </IconButton>
        </Stack>

      </form>
    </div>
    </>
  );
}

export default Register;
