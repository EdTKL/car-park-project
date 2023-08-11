import { TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, tableCellClasses } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import React from "react";
import { Price } from "../models";
import "./Prices.scss";

const Prices = () => {
    const priceList: Array<Price> = [
    {key: "hourly", timeslot: "時租", small: 19, middle: 40, motor: 19},
    {key: "day", timeslot: "日租", small: 105, middle: 200, motor: 105},
    {key: "night", timeslot: "夜租", small: 80, middle: 200, motor: 80}
]
    return (
      <>
      <TableContainer component={Paper} elevation={3} className="tableContainer" sx={{ overflow: 'hidden' }}>
        <div className="priceTableHeader"><h5>今日收費</h5></div>
        <div className="priceTableBody">
          <Table sx={{ maxWidth: 500, [`& .${tableCellClasses.root}`]: { borderBottom: "none"}}} aria-label="simple table">
            <TableHead>
              <TableRow className="price-row">
                <TableCell align="center"><div className="weekday">星期三</div></TableCell>
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
                    <div className="priceTime">{price.timeslot}</div>
                    {priceList.indexOf(price)===1 && <div className="halfDayRent">8:00 am - 6:00 pm</div>}
                    {priceList.indexOf(price)===2 && <div className="halfDayRent">6:00 pm - 8:00 am</div>}
                  </TableCell>
                  <TableCell align="center" className="priceValue">${price.small}</TableCell>
                  <TableCell align="center" className="priceValue">${price.middle}</TableCell>
                  <TableCell align="center" className="priceValue">${price.motor}</TableCell>
                  </>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      </>
    )
}
export default Prices;