import * as React from "react";
import {
  Avatar,
  CSSObject,
  Container,
  Fab,
  Grid,
  // Paper,
  Theme,
  styled,
} from "@mui/material";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Space from "../../features/parking/Space";
import ParkingList from "../../features/parking/ParkingList";
import Layout from "../../features/bars/Layout";

export default function ParkingPage() {
  return (
      <Layout>
        {/* keep */}
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
                <ParkingList />
              {/* <Paper sx={{
                p: 2,
                display: 'flex',
                // flexDirection: 'column',
                height: '85vh'
              }}
              ></Paper> */}
            </Grid>
            <Grid item xs={4}>
                {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '42.5vh' }}> */}
                    <Space />
                {/* </Paper> */}
              </Grid>
          </Grid>
        </Container>
        {/* end of keep */}
      </Layout>
  );
}
