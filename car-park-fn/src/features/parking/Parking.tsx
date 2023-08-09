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
import "./Parking.scss";


interface Props {
  shortParkingList: Car[];
}

export default function Parking({ shortParkingList }: Props) {

  return (
    <Paper
      elevation={3}
      className="timeline-comp"
      sx={{
        borderRadius: "20px",
      }}
    >
      <h5>最近停泊車輛</h5>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 1.1,
          },
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
          <TimelineItem key={idx} sx={{ minHeight: "60px", padding: 0 }}>
            <TimelineOppositeContent className="carTime">{car.time}</TimelineOppositeContent>
            <TimelineSeparator className="timelineWrap">
              <TimelineDot sx={{ backgroundColor: "#EBC243" }} />
              {idx !== shortParkingList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#008399", fontWeight: 700 }} className="carPlate">
              {car.plate}
            </TimelineContent>
            <TimelineContent className="carType">{car.type}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
