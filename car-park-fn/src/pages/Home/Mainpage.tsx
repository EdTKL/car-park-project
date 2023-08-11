import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import "../../features/bars/Sidebar.scss";
import "../../features/bars/Navbar.scss";
import ".././home/Home.scss";
import Navbar from '../../features/bars/Navbar';
import Sidebar from '../../features/bars/Sidebar';
import Collapse from '../../features/bars/Collapse';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { SidebarButton } from '../../features/models';
import { Grid } from '@mui/material';
import Space from '../../features/parking/Space';
import Prices from '../../features/prices/Prices';
import Parking from '../../features/parking/Parking';
import CarList from '../../features/cars/CarList';
import { RootState } from '../../app/store';
import priceList from '../../variables/priceList';

interface Props {
  sidebarButtonList1: SidebarButton[];
  sidebarButtonList2: SidebarButton[];
}

const Mainpage = ({sidebarButtonList1, sidebarButtonList2}:Props) => {
  const carList = useAppSelector((state: RootState) => state.carState.carList);
  const shortParkingList = React.useMemo(() => 
      carList.filter((car: any) => car.status === "停泊中").slice(0, 4), [carList]);
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
          <Grid container sx={{ margin: 0 }} className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
            <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
              <Grid item xs={4} justifyContent="center" alignItems="center">
                <Space />
                </Grid>
              <Grid item xs={4} justifyContent="center" alignItems="center"><Prices priceList={priceList} /></Grid>
              <Grid item xs={4} justifyContent="center" alignItems="center"><Parking shortParkingList={shortParkingList}/></Grid>
            </Grid>
            <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
              <Grid item xs={8} justifyContent="center" alignItems="stretch"><CarList carList={carList}/></Grid>
              <Grid item xs={4} justifyContent="center" alignItems="stretch" className='cameraContainer'>
                <div className='dummy'></div>
                <div className='dummy'></div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
)};

export default Mainpage