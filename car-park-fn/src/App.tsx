import React from 'react';
import Mainpage from './pages/Mainpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appTheme } from './themes/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';


function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <div className='App'>
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Mainpage />} />
            <Route path="/parking-vehicle" element={<Mainpage />} />
            <Route path="/edit-record" element={<Mainpage />} />
            <Route path="/statistic" element={<Mainpage />} />
            <Route path="/setting" element={<Mainpage />} />
            <Route path="/logout" element={<Mainpage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
