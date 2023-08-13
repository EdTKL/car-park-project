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
import Typography from "@mui/material/Typography";


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
       style={{height: "100%"}}
    >
      <Typography variant='h6' color='success.main' fontWeight={700} ml={1}>
        最近停泊車位
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 1.1,
          },
          mt: 0,
          pl: 1
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
              {car.plate_num}
            </TimelineContent>
            <TimelineContent className="carType">{car.vehicle_type}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
