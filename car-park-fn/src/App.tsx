import React, { useCallback, useEffect } from 'react';
import Home from './pages/home/Home';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StaffRoutes } from './StaffRoutes';
import { AdminRoutes } from './AdminRoutes';
import { appTheme } from './themes/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import ParkingPage from './pages/parkingPage/ParkingPage';
import { Login } from "./features/auth/Login";
import { useAppDispatch, useAppSelector } from './app/hook';
import { login, logout } from './redux/slice/authSlice';
import Register from './features/auth/Register';
import { AuthState } from './redux/interface/model';
import PrivateRoute from './features/auth/PrivateRoute';
import SetPrice from './pages/setPrice/SetPrice';

function App() {
  //const authListener = useAppSelector((state):AuthState=> state.auth)
  //const appDispatch = useAppDispatch()
  //const navigate = useNavigate();
  //  let cb_get_auth = useCallback(async ()=>{
  //      let authState = await localStorage.getItem("auth");
  //      console.log('auth Guard',authState)
  //      if(authState){
  //          let state = await JSON.parse(authState)
  //          appDispatch(login(state))
  //          navigate('/home')
  //      }else{
  //          console.log('why')
  //          appDispatch(logout())
  //          navigate('/login')
  //      }
  //  },[])
  //  useEffect(()=>{
  //      cb_get_auth()
//
  //  },[])
  return (
<ThemeProvider theme={appTheme}>
  <CssBaseline enableColorScheme />
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="login" element={<Login />} />

        {/* {authListener.isAuth && authListener.role === "staff" ? 
          <Route element={<StaffRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/edit" element={<Home />} />
          <Route path="/stat" element={<Home />} />
          <Route path="/setting" element={<Home />} />
          
          <Route path="/logout" element={<Home />} />
        </Route>
        :
        null
        } */}
        {/* {authListener.isAuth && authListener.role === "admin" ?  */}
        <Route element={<AdminRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/edit" element={<Home />} />
          <Route path="/stat" element={<Home />} />
          <Route path="/pricing" element={<SetPrice />} />
          <Route path="/setting" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Home />} />
        </Route>
        {/* :
        null
        } */}

        


        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  </ThemeProvider>
  );
}

export default App;
