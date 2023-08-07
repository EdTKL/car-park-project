import React from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Mainpage />} />
          <Route path="/parked-vehicle" element={<Mainpage />} />
          <Route path="/edit-record" element={<Mainpage />} />
          <Route path="/statistic" element={<Mainpage />} />
          <Route path="/setting" element={<Mainpage />} />
          <Route path="/logout" element={<Mainpage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      
    </div>
  );
}

export default App;
