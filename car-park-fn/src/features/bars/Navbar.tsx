import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, styled } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
//import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
//import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
//import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import "./Navbar.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hook';
import { AuthState } from '../../redux/interface/model';

const Navbar = () => {
    const drawerWidth = useSelector((state: RootState)=> { return state.drawerState.drawerWidth});
    const open = useSelector((state: RootState)=> { return state.drawerState.open});
    const auth = useAppSelector((state):AuthState=> state.auth)

    interface AppBarProps extends MuiAppBarProps {
      open?: boolean | any;
    }

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
        })<AppBarProps>(({ theme, open }) => ({
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }));

    return (
        <>
        <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography className="navbarCarparkName" variant="h6" noWrap component="div">
            庇利街停車場
          </Typography>
          <div className='navbarButtons'>
            {/* <DarkModeOutlinedIcon /> */}
            {/* <LocalPhoneOutlinedIcon />
            <CalendarMonthOutlinedIcon />
            <NotificationsNoneOutlinedIcon /> */}
            <Avatar className='staffProfile' >{auth.username.slice(0,1).toUpperCase()}</Avatar>
          </div>
        </Toolbar>
    </AppBar></>)

}
export default Navbar