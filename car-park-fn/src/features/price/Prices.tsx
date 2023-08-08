import { TableContainer, Paper, Typography, Table, TableRow, TableCell, TableHead, TableBody, tableCellClasses } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import React from "react";
import { Price } from "../models";
import "./Prices.scss";

interface Props {
  priceList: Price[];
}
const Prices = ({priceList}:Props) => {
    return (
        <>
        <TableContainer component={Paper} elevation={3} className="tableContainer" sx={{ overflow: 'hidden' }}>
        <div className="priceTableHeader"><h5>今日收費</h5></div>
        <Table sx={{ maxWidth: 500, [`& .${tableCellClasses.root}`]: { borderBottom: "none"}}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><div className="weekday">星期三</div></TableCell>
            <TableCell align="center"><div className="carIcon"><DirectionsCarFilledOutlinedIcon /></div><div className="carcategory">小型車</div></TableCell>
            <TableCell align="center"><div className="carIcon"><AirportShuttleOutlinedIcon /></div><div className="carcategory">中型車</div></TableCell>
            <TableCell align="center"><div className="carIcon"><MopedOutlinedIcon /></div><div className="carcategory">電單車</div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {priceList.map((price)=>
            <TableRow key={price.key}>
              <>
              <TableCell align="center">
                <div className="priceTime">{price.time}</div>
                {priceList.indexOf(price)===1 && <div className="halfDayRent">8:00 am - 6:00 pm</div>}
                {priceList.indexOf(price)===2 && <div className="halfDayRent">6:00 pm - 8:00 am</div>}
              </TableCell>
              <TableCell align="center" className="priceValue">${price.smallVehiclePrice}</TableCell>
              <TableCell align="center" className="priceValue">${price.middleVehiclePrice}</TableCell>
              <TableCell align="center" className="priceValue">${price.motorbikePrice}</TableCell>
              </>
            </TableRow>
          )}
        </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}
export default Prices;