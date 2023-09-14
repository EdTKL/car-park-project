import * as React from 'react';
import "../../features/bars/Sidebar.scss";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Layout.scss"
import { Grid } from '@mui/material';
import Space from '../../features/space/Space';
import Prices from '../../features/prices/Prices';
import ParkingTL from '../../features/parking/ParkingTL';
import CarList from '../../features/cars/CarList';
import { useEffect, useMemo } from 'react';
import { fetchCars } from "../../features/cars/carSlice"
import { fetchParking } from "../../features/parking/parkingSlice"
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
import Camera from '../../features/camera/Camera';
import Camera2 from '../../features/camera/Camera2';
import Layout from '../../features/bars/Layout';

const HomePage = () => {
  const carList = useAppSelector((state: RootState) => state.carState.carList);
  const parkingList = useAppSelector((state: RootState) => state.parkingState.parkingList)
  const dispatch = useAppDispatch();

  const shortParkingList = useMemo(() => 
    parkingList.slice(0, 4), [parkingList]);
  
  useEffect(()=> {
    dispatch(fetchCars());
    dispatch(fetchParking())
  }, [dispatch]);
  
  return (
      <Layout>
        <Grid container spacing={1} paddingX={2} height="fit-content">
          <Grid container item columnSpacing={1} >
            <Grid item xs={4} >
              <Space parkingList={parkingList}/>
            </Grid>
            <Grid item xs={4} >
              <Prices />
            </Grid>
            <Grid item xs={4} >
              <ParkingTL shortParkingList={shortParkingList}/>
            </Grid>
          </Grid>
          <Grid container item columnSpacing={1} >
            <Grid item xs={8} >
              <CarList carList={carList}/>
            </Grid>
            <Grid container item xs={4} flexDirection='column' justifyContent='flex-start' flexWrap='nowrap' gap={1.5}>
              <Camera />
              <Camera2 />
            </Grid>
          </Grid>
        </Grid>
      </Layout>

)};

export default HomePage