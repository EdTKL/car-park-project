import React, { useMemo } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";
import { Car } from "../model";
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';
import "./Space.scss";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";

interface Props {
  parkingList: Car[];
}

const Space = ({ parkingList }: Props) => {
  const parkingNum = useMemo(() => parkingList.length, [parkingList]);

  const smCarNum = useMemo(() =>
    parkingList.filter((car) => car.type === "私家車" ||
      car.type === "的士").length
    , [parkingList]
  );

  const mdCarNum = useMemo(() =>
    parkingList.filter((car) => car.type === "中貨車").length
    , [parkingList]
  );

  const motoNum = useMemo(() =>
    parkingList.filter((car) => car.type === "電單車").length
    , [parkingList]
  );

  const space = useAppSelector((state: RootState) => state.spaceState.space);
  const carPark = useMemo(() => space.filter((cp) => cp.id === 0)
    , [space])

  return (
    <Paper
      elevation={3}
      className="space-comp"
      sx={{
        borderRadius: "20px",
      }}
    >
      <h5>現時閒置車位</h5>
      <div>
        <PieChart
          series={[
            {
              data: [
                { value: parkingNum, color: "#008399" },
                { value: carPark[0].totalSpace - parkingNum, color: "#131F00" },
              ],
              innerRadius: 60,
              outerRadius: 110,
              paddingAngle: 3,
              cornerRadius: 3,
              startAngle: -180,
              endAngle: 180,
              cx: 115,
              cy: 125,
            },
          ]}
          width={250}
          height={250}
        />
        <span className="pie-num">
          <p>尚餘</p>
          <p>{carPark[0].totalSpace - parkingNum}</p>
        </span>
        <div className="cars-num">
          <span>
            <div className="car-type">
              <DirectionsCarOutlinedIcon sx={{ color: '#131F00', fontSize: '30px' }} />
              <p>小型車</p>
            </div>
            <p>
              {carPark[0].smCarSpace - smCarNum}
            </p>
          </span>
          <span>
            <div className="car-type">
              <AirportShuttleOutlinedIcon sx={{ color: '#131F00', fontSize: '30px' }} />
              <p>中型車</p>
            </div>
            <p>
              {carPark[0].mdCarSpace - mdCarNum}
            </p>
          </span>
          <span>
            <div className="car-type">
              <MopedOutlinedIcon sx={{ color: '#131F00', fontSize: '30px' }} />
              <p>電單車</p>
            </div>
            <p>
              {carPark[0].motoSpace - motoNum}
            </p>
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default Space;
