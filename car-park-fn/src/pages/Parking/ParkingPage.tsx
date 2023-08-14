import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import ParkingList from "../../features/parking/ParkingList";
import Space from "../../features/space/Space";
import { Box, Container, Grid } from "@mui/material";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";

export default function ParkingPage() {
  const parkingList = useAppSelector((state: RootState) => state.parkingState.parkingList);

  return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
                <ParkingList parkingList={parkingList}/>
            </Grid>
            <Grid item xs={4} display='flex' flexDirection='column' >
              <Space parkingList={parkingList}/>          
              <Box bgcolor="info.main" height='100%' mt={2} borderRadius={4}/>
              <Box bgcolor="info.main" height='100%' mt={2} borderRadius={4}/>
            </Grid>
          </Grid>
        </Container>
      </Layout>
  );
}
