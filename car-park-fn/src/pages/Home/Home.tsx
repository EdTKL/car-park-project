import * as React from 'react';
import "../../features/bars/Sidebar.scss";
import "../../features/bars/Navbar.scss";
import ".././home/Home.scss";
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Grid } from '@mui/material';
import Space from '../../features/parking/Space';
import Prices from '../../features/prices/Prices';
import Parking from '../../features/parking/Parking';
import CarList from '../../features/cars/CarList';
import { RootState } from '../../app/store';
import Layout from '../../features/bars/Layout';

const Mainpage = () => {
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
      <Layout>
        <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
          <Grid item xs={4} justifyContent="center" alignItems="center">
            <Space />
            </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center"><Prices /></Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center"><Parking shortParkingList={shortParkingList}/></Grid>
        </Grid>
        <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
          <Grid item xs={8} justifyContent="center" alignItems="stretch"><CarList carList={carList}/></Grid>
          <Grid item xs={4} justifyContent="center" alignItems="stretch" className='cameraContainer'>
            <div className='dummy'></div>
            <div className='dummy'></div>
          </Grid>
        </Grid>
      </Layout>
)};

export default Mainpage