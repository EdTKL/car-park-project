import React, { useCallback, useEffect } from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StaffRoutes } from './StaffRoutes';
import { AdminRoutes } from './AdminRoutes';

import { Login } from "./features/auth/Login";
import { useAppDispatch, useAppSelector } from './app/hook';
import { login, logout } from './redux/slice/authSlice';
import Register from './features/auth/Register';
import { AuthState } from './redux/interface/model';

function App() {
  const authListener = useAppSelector((state):AuthState=> state.auth)
  const appDispatch = useAppDispatch()
  const navigate = useNavigate();
    let cb_get_auth = useCallback(async ()=>{
        let authState = await localStorage.getItem("auth");
        console.log('auth Guard',authState)
        if(authState){
            let state = await JSON.parse(authState)
            appDispatch(login(state))
            navigate('/home')
        }else{
            console.log('why')
            appDispatch(logout())
            navigate('/login')
        }
    },[])
    useEffect(()=>{
        cb_get_auth()

    },[])
  return (
    <div className='App'>
      <Routes>
        <Route path="login" element={<Login />} />
        

        {authListener.isAuth && authListener.role === "staff" ? 
          <Route element={<StaffRoutes />}>
          <Route path="/home" element={<Mainpage />} />
          <Route path="/parked-vehicle" element={<Mainpage />} />
          <Route path="/edit-record" element={<Mainpage />} />
          <Route path="/statistic" element={<Mainpage />} />
          <Route path="/setting" element={<Mainpage />} />
          
          <Route path="/logout" element={<Mainpage />} />
        </Route>
        :
        null
        }
        {authListener.isAuth && authListener.role === "admin" ? 
        <Route element={<AdminRoutes />}>
          <Route path="/home" element={<Mainpage />} />
          <Route path="/parked-vehicle" element={<Mainpage />} />
          <Route path="/edit-record" element={<Mainpage />} />
          <Route path="/statistic" element={<Mainpage />} />
          <Route path="/setting" element={<Mainpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Mainpage />} />
        </Route>
        :
        null
        }
        


        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </div>
  );
}

export default App;
