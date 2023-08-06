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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useState } from 'react';

export type DrawerOpen = {
    handleSidebarClose:()=>void
}

const drawerWidth = 200;

const SidebarOpen = ({handleSidebarClose}:DrawerOpen)=>{
    return (
        <><Fab className="fabExpanded" size="small"
            sx={{ zIndex: 'tooltip', boxShadow: 3 }} onClick={()=>handleSidebarClose()}><KeyboardArrowLeftIcon /></Fab><Drawer
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
                    <ListItem>GW</ListItem>
                    <ListItem key='mainpage' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faHouse} /></div>
                            <ListItemText primary="主頁" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='parkedVehicle' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faP} /></div>
                            <ListItemText primary="停泊車輛" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='editRecord' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faFilePen} /></div>
                            <ListItemText primary="編輯紀錄" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='statistics' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faChartSimple} /></div>
                            <ListItemText primary="統計數據" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <List>
                    <ListItem key='setting' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faScrewdriverWrench} /></div>
                            <ListItemText primary="設定" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='logout' disablePadding sx={{ width: 160 }}>
                        <ListItemButton>
                            <div className='svg'><FontAwesomeIcon icon={faRightFromBracket} /></div>
                            <ListItemText primary="登出" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer></>
      )
}
export default SidebarOpen