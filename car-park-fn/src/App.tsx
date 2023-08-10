import React from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { sidebarButtonList1, sidebarButtonList2 } from './variables/sidebarButtonLists';
import { appTheme } from './themes/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import ParkingPage from './pages/ParkingPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <div className='App'>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/parking" element={<ParkingPage sBarBtns={sidebarButtonList1} sBarBtns2={sidebarButtonList2} />} />
          <Route path="/edit" element={<EditPage sBarBtns={sidebarButtonList1} sBarBtns2={sidebarButtonList2} />} />
          <Route path="/stat" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/setting" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          <Route path="/logout" element={<Mainpage sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
