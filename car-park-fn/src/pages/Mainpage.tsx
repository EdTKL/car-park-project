import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SidebarButton } from '../features/model';
import Home from './home/Home';
import "../features/sidebar/Sidebar.scss";
import "../features/sidebar/Navbar.scss";
import "./home/Home.scss";
import Navbar from '../features/sidebar/Navbar';
import Sidebar from '../features/sidebar/Sidebar';
import Collapse from '../features/sidebar/Collapse';

interface Props {
  sidebarButtonList1: SidebarButton[];
  sidebarButtonList2: SidebarButton[];
}

const Mainpage = ({sidebarButtonList1, sidebarButtonList2}:Props) => {

  return(
    <>
    <Collapse />
    <Box sx={{ display: 'flex' }} className="contentBackground">
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