import React from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import sidebarButtonList1 from './variables/sidebarButtonList1';
import sidebarButtonList2 from './variables/sidebarButtonList2';

function App() {
  return (
    <div className='App'>
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
<<<<<<< HEAD
          <Route path="/home" element={<Mainpage />} />
          <Route path="/parking-vehicle" element={<Mainpage />} />
          <Route path="/edit-record" element={<Mainpage />} />
          <Route path="/statistic" element={<Mainpage />} />
          <Route path="/setting" element={<Mainpage />} />
          <Route path="/logout" element={<Mainpage />} />
=======
          <Route path="/home" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/parking" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/edit" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/stat" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/setting" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/logout" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
>>>>>>> b5b1117920f45f647f33d8c5be5a1f393536f050
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      
    </div>
  );
}

export default App;
