import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, Theme, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom'
import "./Sidebar.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { SidebarButton } from '../models';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../redux/slice/authSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { setSelected } from './selected/selectedSlice';

const Sidebar = () => {
    const sBarBtns: Array<SidebarButton> = [
      {"key": "home", linkTo: "/home", icon: <HomeOutlinedIcon />, primary: "主頁" },
      {"key": "parking", linkTo: "/parking", icon: <LocalParkingOutlinedIcon />, primary: "停泊車輛" },
      {"key": "edit", linkTo: "/edit", icon: <EditNoteOutlinedIcon />, primary: "編輯紀錄" },
      {"key": "stat", linkTo: "/stat", icon: <BarChartOutlinedIcon />, primary: "統計數據" },
      {"key": "pricing", linkTo: "/pricing", icon: <PriceChangeOutlinedIcon />, primary: "更改價錢" }
    ]

    const sBarBtns2: Array<SidebarButton> = [
      {"key": "register", linkTo: "/register", icon: <HowToRegIcon />, primary: "註冊" },
      {"key": "logout", linkTo: "/logout", icon: <LogoutOutlinedIcon />, primary: "登出" }
    ]

    const drawerWidth = useSelector((state: RootState)=> { return state.drawerState.drawerWidth});
    const open = useSelector((state: RootState)=> { return state.drawerState.open});
    const selected = useSelector((state: RootState)=>{ return state.selectedState})
    

    const dispatch = useAppDispatch()

    const openedMixin = (theme: Theme): CSSObject => ({
      width: drawerWidth!,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    });
    const closedMixin = (theme: Theme): CSSObject => ({
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
      },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        width: drawerWidth!,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
      }),
    );

    return (
        <Drawer className="sidebar" variant="permanent" anchor="left" open={open} >
        <List>
            {open ? (
            <ListItem className="brand" >
              <Link to={'/home'}><Typography variant="h2" sx={{
                color: 'white',
                fontFamily: 'Black Han Sans',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>GW</Typography></Link>
            </ListItem>
          ) : (
            <ListItem>
              <Link to={'/home'}><Typography variant="h6" sx={{
                color: 'white',
                fontFamily: 'Black Han Sans',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                marginBottom: '75px'
              }}>GW</Typography>
              </Link>
            </ListItem>
          )}

            <>{sBarBtns.map((button, open)=>
                selected.path === button.linkTo ? 
                <ListItem key={button.key} disablePadding sx={{ width: 190, background:"#f2f4f4", color: "#476800" }} style={{borderTopLeftRadius: "15px", borderBottomLeftRadius:"15px"}} 
                  onClick={()=>dispatch(setSelected({path:button.linkTo}))}>
                    <Link to={button.linkTo}><ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}, color: "#476800"}}>
                        <div className='svg'>{button.icon}</div>
                        <ListItemText className='sidebarButtonText' primary={button.primary} sx={{ opacity: open ? 1 : 0 }} style={{color: "#476800"}} />
                    </ListItemButton></Link>
                </ListItem>
                :
                <ListItem key={button.key} sx={{ width: 190 }} disablePadding onClick={()=>dispatch(setSelected({path:button.linkTo}))}>
                    <Link to={button.linkTo}><ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}}}>
                        <div className='svg'>{button.icon}</div>
                        <ListItemText className='sidebarButtonText' primary={button.primary} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton></Link>
                </ListItem>                
            )}</>
        </List>
        <List>
          <>{sBarBtns2.map((button, open) =>

            <ListItem key={button.key} className={button.key} disablePadding sx={{ width: 190 }}>
              <Link to={button.linkTo}>
                <ListItemButton sx={{ "&:hover": { backgroundColor: "transparent" } }}
                  onClick={button.key === "logout" ? () => {
                    dispatch(logout());
                  }
                   : void(0)}
                >
                <div className='svg'>
                  {button.icon}
                </div>
                <ListItemText className='sidebarButtonText' primary={button.primary} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton></Link>
            </ListItem>
          )}
        </>
        </List>
      </Drawer>
    )
}

export default Sidebar