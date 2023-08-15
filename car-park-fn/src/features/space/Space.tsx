import React, { useMemo } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";
// import { Car } from "../models";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import "./Space.scss";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { Car } from "../models";
import { Grid, Typography } from "@mui/material";

interface Props {
  parkingList: Car[];
}

const Space = ({parkingList}: Props) => {

  const parkingNum = useMemo(() => parkingList.length, [parkingList]);
  const smCarNum = useMemo(
    () => parkingList.filter((car) => car.vehicle_type === "small_car").length,
    [parkingList]
  );
  const mdCarNum = useMemo(
    () => parkingList.filter((car) => car.vehicle_type === "中貨車").length,
    [parkingList]
  );
  const motoNum = useMemo(
    () => parkingList.filter((car) => car.vehicle_type === "電單車").length,
    [parkingList]
  );

  const space = useAppSelector((state: RootState) => state.spaceState.space);
  const carPark = useMemo(() => space.filter((cp) => cp.id === 0), [space]);

  return (
    <Paper
      elevation={3}
      className="space-comp"
      sx={{
        borderRadius: "20px",
        height: "100%",
      }}
    >
      <Typography variant='h6' color='success.main' fontWeight={700} ml={1} mb={0}>
        現時閒置車位
      </Typography>
      <Grid container xs={12} sx={{ margin: 0, maxHeight: "100%" }} className="pie-comp">
      <Grid item xs={7} justifyContent="center" alignItems="center" style={{maxHeight: "100%"}} className="chart">
        
          <PieChart
            series={[
              {
                data: [
                  { value: parkingNum, color: "#008399" },
                  {
                    value: carPark[0].totalSpace - parkingNum,
                    color: "#131F00",
                  },
                ],
                innerRadius: 50,
                outerRadius: 90,
                paddingAngle: 3,
                cornerRadius: 3,
                startAngle: -180,
                endAngle: 180,
                cx: 90,
                cy: 100,
              },
            ]}
            width={200}
            height={200}
          />
          <span className="pie-num">
            <p>尚餘</p>
            <p>{carPark[0].totalSpace - parkingNum}</p>
          </span>
        </Grid>
        <Grid item xs={5} justifyContent="center" alignItems="center" style={{maxHeight: "100%"}} className="cars-num">
          <span>
            <div className="car-type">
              <DirectionsCarOutlinedIcon
                sx={{ color: "#131F00", fontSize: "26px" }}
              />
              <p>小型車</p>
            </div>
            <p>{carPark[0].smCarSpace - smCarNum}</p>
          </span>
          <span>
            <div className="car-type">
              <AirportShuttleOutlinedIcon
                sx={{ color: "#131F00", fontSize: "26px" }}
              />
              <p>中型車</p>
            </div>
            <p>{carPark[0].mdCarSpace - mdCarNum}</p>
          </span>
          <span>
            <div className="car-type">
              <MopedOutlinedIcon sx={{ color: "#131F00", fontSize: "26px"}} />
              <p>電單車</p>
            </div>
            <p>{carPark[0].motoSpace - motoNum}</p>
          </span>
      </Grid>
      </Grid>
    </Paper>
  );
};

export default Space;
