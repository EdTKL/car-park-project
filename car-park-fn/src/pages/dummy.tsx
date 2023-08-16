import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { RootState } from "../app/store";
import Layout from "../features/bars/Layout";
import { logout } from "../redux/slice/authSlice";

const Dummy = () => {
  const carList = useAppSelector((state: RootState) => state.carState.carList);
  const shortParkingList = React.useMemo(() => 
      carList.filter((car: any) => car.status === "停泊中").slice(0, 4), [carList]);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  function logoutNav(){
    dispatch(logout());
    navigate("/login");
  }

  return (
      <Layout>
        <Grid container spacing={2} xs={12} sx={{ mb: 1 }}>
          <Grid item xs={12}>
            <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              borderRadius: 3,
            }}
            ></Paper>
          </Grid>
        </Grid>
        {/* <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>

          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Paper elevation={3} className="space-comp" sx={{borderRadius: "20px"}} style={{height: "100%"}} />
          </Grid>

          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Paper elevation={3} className="tableContainer" sx={{borderRadius: "20px"}} style={{height: "100%"}} />
          </Grid>

          <Grid item xs={4} justifyContent="center" alignItems="center" style={{height: "95%"}}>
            <Paper elevation={3} className="timeline-comp" sx={{borderRadius: "20px"}} style={{height: "100%"}} />
          </Grid>
        </Grid>

        <Grid container direction="row" xs={12} className='second-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }}>
          <Grid item xs={8} justifyContent="center" alignItems="stretch" style={{height: "95%"}} >
            <Paper elevation={3} className="car-list-comp" sx={{borderRadius: "20px"}} style={{height: "100%"}} />
          </Grid>

          <Grid item xs={4} justifyContent="center" alignItems="stretch" style={{height: "95%"}}  className='cameraContainer'>
            <Box className='dummy' style={{height: "48.5%"}} />
            <Box className='dummy' style={{height: "48.5%"}} />
          </Grid>
        </Grid> */}
      </Layout>
)};

export default Dummy