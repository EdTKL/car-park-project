import React, { useMemo } from 'react'
import './Home.scss'
import Prices from '../../features/prices/Prices';
// import { useAppSelector } from '../../app/hook';
// import { RootState } from '../../app/store';
import CarList from '../../features/cars/CarList';
import Parking from '../../features/parking/Parking';
import Space from '../../features/parking/Space';
import priceList from '../../variables/priceList';
import { Grid } from '@mui/material';
import { useCarList } from '../../features/cars/carAPI';


const Home = () => {
    // const carList = useAppSelector((state: RootState) => state.carState.carList);
    const carList = useCarList();
    const shortParkingList = useMemo(() => 
      carList.filter((car) => car.status === "parking").slice(0, 3), [carList]);

  return (
    <>
    <Grid container sx={{ margin: 0 }} >
      <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Space />
          </Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Prices priceList={priceList} /></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Parking shortParkingList={shortParkingList}/></Grid>
      </Grid>
      <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
        <Grid item xs={8} justifyContent="center" alignItems="stretch">
          <CarList carList={carList}/></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="stretch" className='cameraContainer'>
          <div className='dummy'></div>
          <div className='dummy'></div>
        </Grid>
      </Grid>
    </Grid>
    </>
  )
}

export default Home