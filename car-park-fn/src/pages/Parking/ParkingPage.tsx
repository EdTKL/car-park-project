import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import ParkingList from "../../features/parking/ParkingList";
import Space from "../../features/space/Space";
import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import Camera from "../../features/camera/Camera";
import Camera2 from "../../features/camera/Camera2";

export default function ParkingPage() {
  const parkingList = useAppSelector((state: RootState) => state.parkingState.parkingList);
  
  //useEffect(()=>{
  //  if (window?.location.pathname === '/parking')
  //  require('../../features/bars/selected/parking.scss')
  //}, [])

  return (
      <Layout>
        {/* <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}> */}
          <Grid container spacing={2} columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ pt: 0 }} style={{ maxHeight: "100%" }}>
            <Grid item xs={8} style={{ maxHeight: "100%" }} sx={{ margin: 0, pt: 0 }}>
                <ParkingList parkingList={parkingList}/>
            </Grid>
            <Grid item xs={4} display='flex' justifyContent='center' flexDirection='column' gap={{ sm: 1, lg: 1, xl: 3 }}>
              <Space parkingList={parkingList} />          
              <Camera/>
              <Camera2/>
            </Grid>
          </Grid>
        {/* </Container> */}
      </Layout>
  );
}
