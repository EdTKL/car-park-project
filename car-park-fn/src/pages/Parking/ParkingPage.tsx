import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import ParkingList from "../../features/parking/ParkingList";
import Space from "../../features/parking/Space";
import { Box, Container, Grid } from "@mui/material";


export default function ParkingPage() {
  return (
      <Layout>
        {/* <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}> */}
          <Grid container spacing={2} xs={12} columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ pt: 0 }} style={{ maxHeight: "100%" }}>
            <Grid item xs={8} style={{ maxHeight: "100%" }} sx={{ margin: 0, pt: 0 }}>
                <ParkingList />
            </Grid>
            <Grid item xs={4} display='flex' flexDirection='column' >
              <Space />          
              <Box bgcolor="info.main" height='100%' mt={2} borderRadius={4}/>
              <Box bgcolor="info.main" height='100%' mt={2} borderRadius={4}/>
            </Grid>
          </Grid>
        {/* </Container> */}
      </Layout>
  );
}
