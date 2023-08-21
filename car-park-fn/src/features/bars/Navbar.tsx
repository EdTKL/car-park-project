import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, styled } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import "./Navbar.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadPDF from '../../pages/Report/DownloadPDF';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Navbar = () => {
  const drawerWidth = useSelector((state: RootState) => { return state.drawerState.drawerWidth });
  const open = useSelector((state: RootState) => { return state.drawerState.open });

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

  const [openD, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography className="navbarCarparkName" variant="h6" noWrap component="div">
            庇利街停車場
          </Typography>
          <div className='navbarButtons'>


          <PictureAsPdfIcon onClick={handleClickOpen} />
            <Dialog
              open={openD}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle sx={{ fontWeight: 700 }} id="alert-dialog-title">
                {"PDF檔案"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  金偉停車場出入記錄
                  （近三個月）
                </DialogContentText>
                <DownloadPDF />
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleClose} autoFocus>
                  關閉
                </Button>
              </DialogActions>
            </Dialog>

            <DarkModeOutlinedIcon />
            <LocalPhoneOutlinedIcon />
            <CalendarMonthOutlinedIcon />
            <NotificationsNoneOutlinedIcon />
            <Avatar className='staffProfile'>俊</Avatar>
          </div>
        </Toolbar>
      </AppBar></>)

}
export default Navbar