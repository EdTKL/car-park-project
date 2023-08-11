import React, { useCallback, useEffect } from 'react';
import Mainpage from './pages/home/Mainpage';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StaffRoutes } from './StaffRoutes';
import { AdminRoutes } from './AdminRoutes';
import { sidebarButtonList1, sidebarButtonList2 } from './variables/sidebarButtonLists';
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

  //  },[])
  return (
<ThemeProvider theme={appTheme}>
  <CssBaseline enableColorScheme />
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="login" element={<Login />} /> */}

        {/* {authListener.isAuth && authListener.role === "staff" ? 
          <Route element={<StaffRoutes />}>
          <Route path="/home" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/parking" element={<ParkingPage sBarBtns={sidebarButtonList1} sBarBtns2={sidebarButtonList2} />} />
          <Route path="/edit" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/stat" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/setting" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          
          <Route path="/logout" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
        </Route>
        :
        null
        }
        {authListener.isAuth && authListener.role === "admin" ?  */}
        <Route element={<AdminRoutes />}>
          <Route path="/home" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/parking" element={<ParkingPage sBarBtns={sidebarButtonList1} sBarBtns2={sidebarButtonList2} />} />
          <Route path="/edit" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/stat" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/pricing" element={<SetPrice />} />
          <Route path="/setting" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2}/>} />
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
