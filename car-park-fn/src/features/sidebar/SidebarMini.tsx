import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarDays, faMoon } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple, faFilePen, faHouse, faP, faPhone, faRightFromBracket, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Fab } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

export type DrawerClosed = {
    handleSidebarOpen:()=>void
}

const drawerWidth = 90;

const SidebarMini = ({handleSidebarOpen}: DrawerClosed) => {
  return(
    <><Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Fab className="fabClosed" size="small"
       sx={{ zIndex: 'tooltip', boxShadow: 3 }} onClick={()=>handleSidebarOpen()}><KeyboardArrowRightIcon /></Fab>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden'
          },
        }}
        variant="permanent"
        anchor="left">
        <List>
            <ListItem></ListItem>
            <ListItem key='mainpage' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faHouse} /></div>
                </ListItemButton>
            </ListItem>
            <ListItem key='parkedVehicle' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faP} /></div>
                </ListItemButton>
            </ListItem>
            <ListItem key='editRecord' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faFilePen} /></div>
                </ListItemButton>
            </ListItem>
            <ListItem key='statistics' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faChartSimple} /></div>
                </ListItemButton>
            </ListItem>
        </List>

        <List>
            <ListItem key='setting' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faScrewdriverWrench} /></div>
                </ListItemButton>
            </ListItem>
            <ListItem key='logout' disablePadding sx={{width: 70}}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faRightFromBracket} /></div>
                </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box></>
)};

export default SidebarMini