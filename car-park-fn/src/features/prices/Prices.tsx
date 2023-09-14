import { TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, tableCellClasses, Typography, Grid, Box } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import React, { useEffect, useMemo } from "react";
import { Price, PriceList } from "../models";
import "./Prices.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { fetchPrices } from "./priceSlice";

  
  
const Prices = () => {
  const prices = useAppSelector((state: RootState) => state.ePriceState.prices)
  let day = new Date().toLocaleString("default", {weekday: 'short'}).toLowerCase();
  let weekday = day as 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' 

  // const displayDay = () => {
  //   const dayMapping = [
  //   {key: "mon" , display: "星期一"},
  //   {key: "tue" , display: "星期二"},
  //   {key: "wed" , display: "星期三"},
  //   {key: "thu" , display: "星期四"},
  //   {key: "fri" , display: "星期五"},
  //   {key: "sat" , display: "星期六"},
  //   {key: "sun" , display: "星期日"},
  // ]
  //   let display = dayMapping.filter((day)=>day.key === weekday)[0].display
  //   return display
  // }

  const displayDay: string = useMemo(() => {
    const dayMapping = [
    {key: "mon" , display: "星期一"},
    {key: "tue" , display: "星期二"},
    {key: "wed" , display: "星期三"},
    {key: "thu" , display: "星期四"},
    {key: "fri" , display: "星期五"},
    {key: "sat" , display: "星期六"},
    {key: "sun" , display: "星期日"},
  ]
    let display = dayMapping.filter((day)=>day.key === weekday)[0].display
    return display
  }, [weekday]);
  
  const priceList: Array<Price> = [
    {key: "hour", timeslot: "hour", small_car: "", middle_car: "", motorcycle: ""},
    {key: "day", timeslot: "day", small_car: "", middle_car: "", motorcycle: ""},
    {key: "night", timeslot: "night", small_car: "", middle_car: "", motorcycle: ""}
  ]
  
  prices.map((price)=>{
    if (price.vehicle_type === "small_car" && price.fee_type === "hour") {
      return priceList[0].small_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "middle_car" && price.fee_type === "hour") {
      return priceList[0].middle_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "motorcycle" && price.fee_type === "hour") {
      return priceList[0].motorcycle = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "small_car" && price.fee_type === "day") {
      return priceList[1].small_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "middle_car" && price.fee_type === "day") {
      return priceList[1].middle_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "motorcycle" && price.fee_type === "day") {
      return priceList[1].motorcycle = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "small_car" && price.fee_type === "night") {
      return priceList[2].small_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "middle_car" && price.fee_type === "night") {
      return priceList[2].middle_car = price[weekday as keyof PriceList]
    } else if (price.vehicle_type === "motorcycle" && price.fee_type === "night") {
      return priceList[2].motorcycle = price[weekday as keyof PriceList]
    } else {return null}
  })
  
  const appDispatch = useAppDispatch()
    useEffect(()=>{
      appDispatch(fetchPrices("")).unwrap().then(res=>{
        console.log(`home price fetch: ${res}`)
      }).catch((err)=>{
        console.log(`home price fetch: ${err.message}`)
      })
    },[appDispatch])  

    return (
      <>
      <TableContainer component={Paper} elevation={2} className="tableContainer" sx={{ overflow: 'hidden', height: "280px" }}>
        <Grid container sx={{ margin: 0, maxHeight: "100%" }} style={{height: "90%"}}>
        <Typography variant='h6' color='success.main' fontWeight={700} ml={1}>
          今日收費
        </Typography>
        <Grid item xs={12} justifyContent="center" alignItems="center" style={{maxHeight: "100%"}} className="priceTableBody" >
          <Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none"}, tableLayout: "fixed"}} aria-label="simple table" className="priceTableRoot">
            <TableHead>
              <TableRow className="price-row">
                <TableCell align="center"><Box className="weekday">{displayDay}</Box></TableCell>
                <TableCell align="center"><div className="carIcon"><DirectionsCarFilledOutlinedIcon /></div><div className="carcategory">小型車</div></TableCell>
                <TableCell align="center"><div className="carIcon"><AirportShuttleOutlinedIcon /></div><div className="carcategory">中型車</div></TableCell>
                <TableCell align="center"><div className="carIcon"><MopedOutlinedIcon /></div><div className="carcategory">電單車</div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {priceList.map((price)=>
                <TableRow key={price.key} className="price-row">
                  <>
                  <TableCell align="center">
                    <div className="priceTime">
                      {price.timeslot === "hour" && "時租"}
                      {price.timeslot === "day" && "日租"}
                      {price.timeslot === "night" && "夜租"}
                      </div>
                    {priceList.indexOf(price)===1 && <div className="halfDayRent">8 a.m. - 6 p.m.</div>}
                    {priceList.indexOf(price)===2 && <div className="halfDayRent">6 p.m. - 8 a.m.</div>}
                  </TableCell>
                  <TableCell align="center" className="priceValue">${price.small_car}</TableCell>
                  <TableCell align="center" className="priceValue">${price.middle_car}</TableCell>
                  <TableCell align="center" className="priceValue">${price.motorcycle}</TableCell>
                  </>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
        </Grid>
      </TableContainer>
      </>
    )
}
export default Prices;
