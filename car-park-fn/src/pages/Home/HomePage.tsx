import * as React from 'react';
import "../../features/bars/Sidebar.scss";
import "../../features/bars/Navbar.scss";
import "../../pages/Layout.scss"

import { Box, Grid } from '@mui/material';
import Space from '../../features/parking/Space';
import Prices from '../../features/prices/Prices';
import Parking from '../../features/parking/Parking';
import CarList from '../../features/cars/CarList';
import Layout from '../../features/bars/Layout';
import { useCarList } from '../../features/cars/carAPI';
import { useMemo } from 'react';

const HomePage = () => {
  // const carList = useAppSelector((state: RootState) => state.carState.carList);
  const carList = useCarList();
  const shortParkingList = useMemo(() => 
    carList.filter((car) => car.status === "parking").slice(0, 3), [carList]);
  // const dispatch = useAppDispatch()
  // const navigate = useNavigate();
  // function logoutNav(){
  //   dispatch(logout());
  //   navigate("/login");
  // }

  return (
      <Layout>
        <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Space />
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Prices />
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Parking shortParkingList={shortParkingList}/>
          </Grid>
        </Grid>
        <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
          <Grid item xs={8} justifyContent="center" alignItems="stretch" style={{height: "95%"}}>
            <CarList carList={carList}/>
          </Grid>
          <Grid item xs={4} justifyContent="center" alignItems="stretch" style={{height: "95%"}} className='cameraContainer'>
            <Box className='dummy' style={{height: "48.5%"}} />
            <Box className='dummy' style={{height: "48.5%"}} />
          </Grid>
        </Grid>
      </Layout>
)};

export default HomePage