import React, { useMemo } from 'react'
import './Home.scss'
import Prices from '../../features/price/Prices';
import { useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
import CarList from '../../features/cars/CarList';
import Parking from '../../features/parking/Parking';
import Meter from '../../features/parking/Space';
import priceList from '../../variables/priceList';
import { Grid, Toolbar } from '@mui/material';



const Home = () => {
    const carList = useAppSelector((state: RootState) => state.carState.carList);
    const parkingList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中"), [carList]);
    const shortParkingList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中").slice(0, 4), [carList]);
      //console.log(parkingList)

  return (
    <>
    <Toolbar />
    <Grid container spacing={2} className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
      <Grid container direction="row" xs={12} className='first-row'>
        <Grid item xs={4} justifyContent="center" alignItems="center"><Meter parkingList={parkingList}/></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center"><Prices priceList={priceList} /></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center"><Parking shortParkingList={shortParkingList}/></Grid>
      </Grid>
      <Grid container direction="row" xs={12} className='second-row'>
        <Grid item xs={8} justifyContent="center" alignItems="stretch"><CarList carList={carList}/></Grid>
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