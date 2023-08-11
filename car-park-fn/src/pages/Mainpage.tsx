import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import "../features/bars/Sidebar.scss";
import "../features/bars/Navbar.scss";
import "./Home/Home.scss";
import Navbar from '../features/bars/Navbar';
import Sidebar from '../features/bars/Sidebar';
import Collapse from '../features/bars/Collapse';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlice';
import { useAppDispatch } from '../app/hook';
import Home from './Home/Home'
import { SidebarButton } from '../features/models';

interface Props {
  sidebarButtonList1: SidebarButton[];
  sidebarButtonList2: SidebarButton[];
}

const Mainpage = ({sidebarButtonList1, sidebarButtonList2}:Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  function logoutNav(){
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
     <Collapse />
      <Box sx={{ display: 'flex' }}  className="contentBackground">
        <CssBaseline />
        <Navbar />
        <Sidebar sidebarButtonList1={sidebarButtonList1} sidebarButtonList2={sidebarButtonList2} />
      {/* content */}
        <Box sx={{ margin: 0}} className="contentContainer">
          <Home />
        </Box>
    </Box>
    </>
)};

export default Mainpage