import * as React from "react";
import Paper from "@mui/material/Paper";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { Car } from "../models";
import "./ParkingTL.scss";
import Typography from "@mui/material/Typography";
import { formatDate } from "../../app/format";


interface Props {
  shortParkingList: Car[];
}

export default function ParkingTL({ shortParkingList }: Props) {

  return (
    <Paper
      elevation={2}
      className="timeline-comp"
      sx={{
        borderRadius: "20px",
        overflow: "auto",
        height: "280px",
      }}
    >
      <Typography variant='h6' color='success.main' fontWeight={700} ml={1} mb={0}>
        最近停泊車輛
      </Typography>

      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 1.4,
          },
          m: 0,
          p: 0,
          pl: 2,
        }}
      >
        <TimelineItem className="labels">
          <TimelineOppositeContent className="columnHead parkedTime">泊車時間</TimelineOppositeContent>
          <TimelineSeparator className="timelineWrapEmpty">
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent className="carPlate columnHead">車牌</TimelineContent>
          <TimelineContent className="columnHead">車型</TimelineContent>
        </TimelineItem>
        {shortParkingList.map((car, idx) => (
          <TimelineItem key={idx} sx={{ minHeight: "53px", padding: 0, color: 'info.main'}}>
            <TimelineOppositeContent sx={{fontSize: "14px"}}>{formatDate(car.time as unknown as Date)}</TimelineOppositeContent>
            <TimelineSeparator >
              <TimelineDot sx={{ backgroundColor: "#EBC243" }} />
              {idx !== shortParkingList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#008399", fontWeight: 700 }} >
              {car.plate_num}
            </TimelineContent>
            <TimelineContent >
              {car.vehicle_type === "small_car" && ("小型車")}
              {car.vehicle_type === "motor" && ("電單車")}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

    </Paper>
  );
}
