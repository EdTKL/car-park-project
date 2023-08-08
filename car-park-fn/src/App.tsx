import React from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "./features/auth/Login";
import PrivateRoute from "./features/auth/PrivateRoute";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Mainpage />} />
          <Route path="/parked-vehicle" element={<Mainpage />} />
          <Route path="/edit-record" element={<Mainpage />} />
          <Route path="/statistic" element={<Mainpage />} />
          <Route path="/setting" element={<Mainpage />} />
          <Route path="/logout" element={<Mainpage />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="login" element={<Login />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </div>
  );
}

export default App;
