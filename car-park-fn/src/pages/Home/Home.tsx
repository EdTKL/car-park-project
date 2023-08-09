import React, { useMemo } from 'react'
import './Home.scss'
import Prices from '../../features/prices/Prices';
import { useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
import CarList from '../../features/cars/CarList';
import Parking from '../../features/parking/Parking';
import Space from '../../features/parking/Space';
import priceList from '../../variables/priceList';
import { Grid, Paper } from '@mui/material';



const Home = () => {
    const carList = useAppSelector((state: RootState) => state.carState.carList);
    const parkingList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中"), [carList]);
      const shortParkingList = useMemo(() => 
      parkingList.slice(0, 4), [parkingList]);
      console.log(parkingList)

  return (
    <>
    <Grid container spacing={2} >
      <Grid container direction="row" xs={12} className='first-row'>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Space /></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Prices priceList={priceList} /></Grid>
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <Parking shortParkingList={shortParkingList}/></Grid>
      </Grid>
      </Grid>
    <Grid container spacing={2} >
      <Grid item xs={8} justifyContent="center" alignItems="center">
        <CarList carList={carList}/>
      </Grid>
      <Grid item xs={4} >
        <Paper sx={{width: '100%', height: '50%', borderRadius: '20px'}} elevation={3} ></Paper>
        <Paper sx={{width: '100%', height: '50%', borderRadius: '20px'}} elevation={3} ></Paper>
      </Grid>
    </Grid>
    </>
    )
}

export default Home