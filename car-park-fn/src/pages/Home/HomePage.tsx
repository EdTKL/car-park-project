import * as React from 'react';
import "../../features/bars/Sidebar.scss";
import "../../features/bars/Navbar.scss";
import "../../pages/Layout.scss"

import { Grid } from '@mui/material';
import Space from '../../features/space/Space';
import Prices from '../../features/prices/Prices';
import ParkingTL from '../../features/parking/ParkingTL';
import CarList from '../../features/cars/CarList';
import Layout from '../../features/bars/Layout';
import { useEffect, useMemo } from 'react';
import { fetchCars } from "../../features/cars/carSlice"
import { fetchParking } from "../../features/parking/parkingSlice"
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
import Camera from '../../features/camera/Camera';
import Camera2 from '../../features/camera/Camera2';

const HomePage = () => {
  const carList = useAppSelector((state: RootState) => state.carState.carList);
  const parkingList = useAppSelector((state: RootState) => state.parkingState.parkingList)
  const dispatch = useAppDispatch();

  const shortParkingList = useMemo(() => 
    parkingList.slice(0, 3), [parkingList]);

  useEffect(()=> {
    dispatch(fetchCars());
    dispatch(fetchParking())
  }, [dispatch]);
  
  return (
      <Layout>
        <Grid container direction="row" columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 1, mb: 0, maxHeight: '40%'}} >
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{maxHeight: "97%"}}>
            <Space parkingList={parkingList}/>
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{maxHeight: "97%"}}>
            <Prices />
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{maxHeight: "97%"}}>
            <ParkingTL shortParkingList={shortParkingList}/>
          </Grid>
        </Grid>
        <Grid container direction="row" className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0, maxHeight: '60%' }}>
          <Grid item xs={8} justifyContent="center" alignItems="center" style={{height: "97%"}}>
            <CarList carList={carList}/>
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "97%"}} >
            <Camera />
            <Camera2 />
          </Grid>
        </Grid>
      </Layout>
)};

export default HomePage