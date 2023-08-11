import { Box, CssBaseline, Grid } from "@mui/material";
import * as React from "react";
import Sidebar from "../../features/bars/Sidebar";
import Collapse from "../../features/bars/Collapse";
import Navbar from "../../features/bars/Navbar";
import PriceEdit from "../../features/prices/PriceEdit";
import Layout from "../../features/bars/Layout";

export default function SetPrice () {

    return (
    <>
    <Layout>
      {/* content */}
        <Box sx={{ margin: 0}} className="contentContainer">
          <Grid container sx={{ margin: 0 }} className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
            <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
              <Grid item xs={6} justifyContent="center" alignItems="center"></Grid>
              <Grid item xs={6} justifyContent="center" alignItems="center"></Grid>
            </Grid>
            <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
              <Grid item xs={12} justifyContent="center" alignItems="stretch"><PriceEdit /></Grid>
            </Grid>
          </Grid>
        </Box>
    </Layout>
    </>
    )
}