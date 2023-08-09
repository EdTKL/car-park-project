import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, CSSObject, Fab, Theme, styled } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlice';
import { useAppDispatch } from '../app/hook';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { SidebarButton } from '../features/models';
import Home from './Home/Home';
import "../features/bars/Sidebar.scss";
import "../features/bars/Navbar.scss";

interface Props {
  sidebarButtonList1: SidebarButton[];
  sidebarButtonList2: SidebarButton[];
}

let drawerWidth = 200;
const appbarHeight = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
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

const Mainpage = ({ sidebarButtonList1, sidebarButtonList2 }: Props) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    drawerWidth = 200
  };

  const handleDrawerClose = () => {
    setOpen(false);
    drawerWidth = 64
  };

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  function logoutNav(){
    dispatch(logout());
    navigate("/login");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* navbar */}
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography className="navbarCarparkName" variant="h6" noWrap component="div">
            庇利街停車場
          </Typography>
          <div className='navbarButtons'>
            <DarkModeOutlinedIcon />
            <LocalPhoneOutlinedIcon />
            <CalendarMonthOutlinedIcon />
            <NotificationsNoneOutlinedIcon />
            <Avatar className='staffProfile'>俊</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      {/* floating button */}
      {open ? <Fab className="fabExpanded" size="small"
        sx={{ zIndex: 'tooltip', boxShadow: 3 }} onClick={handleDrawerClose}><KeyboardArrowLeftIcon /></Fab> : <Fab className="fabClosed" size="small"
          sx={{ zIndex: 'tooltip', boxShadow: 3 }} onClick={handleDrawerOpen}> <KeyboardArrowRightIcon /></Fab>}
      {/* sidebar */}
      <Drawer className="sidebar" variant="permanent" anchor="left" open={open}>
        <List>
          {open ? (
            <ListItem className="brand">
              <Typography variant="h2" sx={{
                color: 'white',
                fontFamily: 'Black Han Sans',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>GW</Typography>
            </ListItem>
          ) : (
            <ListItem>
              <Typography variant="h6" sx={{
                color: 'white',
                fontFamily: 'Black Han Sans',
                textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                marginBottom: '75px'
              }}>GW</Typography>
            </ListItem>
          )}
          {sidebarButtonList1.map((button, open) =>
            <ListItem key={button.key} disablePadding sx={{ width: 190 }}>
              <Link to={button.linkTo}><ListItemButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                <div className='svg'>{button.icon}</div>
                <ListItemText className='sidebarButtonText' primary={button.primary} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton></Link>
            </ListItem>
          )}
        </List>
        <List>
          {/* <ListItem key='setting' disablePadding sx={{ width: 190 }}>
                <Link to="/setting"><ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}}}>
                    <div className='svg'><FontAwesomeIcon icon={faScrewdriverWrench} /></div>
                    <ListItemText primary="設定" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton></Link>
            </ListItem>
            <ListItem key='register' disablePadding sx={{ width: 190 }}>
                <Link to="/register"><ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}}}>
                    <div className='svg'><FontAwesomeIcon icon={faScrewdriverWrench} /></div>
                    <ListItemText primary="註冊" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton></Link>
            </ListItem>
            <ListItem key='logout' disablePadding sx={{ width: 190 }}>
                <Link to="/logout"><ListItemButton sx={{"&:hover": {backgroundColor: "transparent"}}}
                onClick={ () => dispatch(logout()) }>
                    <div className='svg'><FontAwesomeIcon icon={faRightFromBracket} /></div>
                    <ListItemText primary="登出" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton></Link>
            </ListItem> */}
          {sidebarButtonList2.map((button, open) =>

            <ListItem key={button.key} disablePadding sx={{ width: 190 }}>
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
        </List>
      </Drawer>
      {/* content */}
      <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, height: `calc(100% - ${appbarHeight}px)`, t: 64 }}>
        <Home />
      </Box>
    </Box>
  )
};

export default Mainpage