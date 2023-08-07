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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarDays, faMoon } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple, faFilePen, faHouse, faP, faPhone, faRightFromBracket, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { CSSObject, Fab, Theme, styled, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CarList from '../features/home/CarList';
import { useAppSelector } from '../app/hook';
import { RootState } from '../app/store';

let drawerWidth = 200;

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
  open?: boolean;
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

const Mainpage = (props: any) => {
  const carList = useAppSelector((state: RootState) => state.carState.carList);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    drawerWidth = 200
  };

  const handleDrawerClose = () => {
    setOpen(false);
    drawerWidth = 65
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* navbar */}
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography className="navbarCarparkName" variant="h6" noWrap component="div">
            庇利街停車場
          </Typography>
          <div className='navbarButtons'>
          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faPhone} />
          <FontAwesomeIcon icon={faCalendarDays} />
          <FontAwesomeIcon icon={faBell} />
          <div className='staffProfile'>俊</div>
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
            {open && <ListItem>GW</ListItem>}
            {!open && <ListItem></ListItem>}
            <ListItem key='mainpage' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faHouse} /></div>
                    <ListItemText primary="主頁" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='parkedVehicle' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faP} /></div>
                    <ListItemText primary="停泊車輛" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='editRecord' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faFilePen} /></div>
                    <ListItemText primary="編輯紀錄" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='statistics' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faChartSimple} /></div>
                    <ListItemText primary="統計數據" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </List>
        <List>
            <ListItem key='setting' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faScrewdriverWrench} /></div>
                    <ListItemText primary="設定" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
            <ListItem key='logout' disablePadding sx={{ width: 190 }}>
                <ListItemButton>
                    <div className='svg'><FontAwesomeIcon icon={faRightFromBracket} /></div>
                    <ListItemText primary="登出" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
        {/* <Box><CarList carList={carList} /></Box> */}
    </Box>
)};

export default Mainpage