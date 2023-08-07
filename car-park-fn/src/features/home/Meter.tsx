import React, { useMemo } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";
import { Car } from "./model";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

import "./meter.scss";

interface Props {
  parkedList: Car[];
}

const Meter = ({ parkedList }: Props) => {
  const parkedNum = useMemo(() => parkedList.length, [parkedList]);

  const smCarNum = useMemo(
    () =>
      parkedList.filter((car) => car.type === "私家車" || car.type === "的士")
        .length,
    [parkedList]
  );

  const mdCarNum = useMemo(
    () => parkedList.filter((car) => car.type === "中貨車").length,
    [parkedList]
  );

  const motoNum = useMemo(
    () => parkedList.filter((car) => car.type === "電單車").length,
    [parkedList]
  );

  return (
    <Paper
      elevation={3}
      className="meter-comp"
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
                { value: parkedNum, color: "#008399" },
                { value: 30 - parkedNum, color: "#131F00" },
              ],
              innerRadius: 50,
              outerRadius: 90,
              paddingAngle: 3,
              cornerRadius: 3,
              startAngle: -180,
              endAngle: 180,
              cx: 80,
              cy: 125,
            },
          ]}
          width={200}
          height={250}
        />
        <p id="pie-num">
          尚餘
          <br />
          {30 - parkedNum}
        </p>
        <span>
          <p>小型車 {smCarNum}</p>
          <p>中型車 {mdCarNum}</p>
          <p>電單車 {motoNum}</p>
        </span>
      </div>
    </Paper>
  );
};

export default Meter;
