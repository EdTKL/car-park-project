import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SidebarButton } from '../features/model';
import "../features/bars/Sidebar.scss";
import "../features/bars/Navbar.scss";
import "./home/Home.scss";
import Navbar from '../features/bars/Navbar';
import Sidebar from '../features/bars/Sidebar';
import Collapse from '../features/bars/Collapse';
import Home from './home/Home';

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