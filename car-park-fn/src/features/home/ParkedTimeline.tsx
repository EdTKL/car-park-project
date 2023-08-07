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
import { Car } from "./model";
import "./ParkedTimeline.scss";

interface Props {
  parkedListOf5: Car[];
}

export default function ParkedTimeline({ parkedListOf5 }: Props) {
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
          <TimelineOppositeContent>泊車時間</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>車牌</TimelineContent>
          <TimelineContent>車型</TimelineContent>
        </TimelineItem>
        {parkedListOf5.map((car, idx) => (
          <TimelineItem key={idx} sx={{ minHeight: "60px", padding: 0 }}>
            <TimelineOppositeContent>{car.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: "#EBC243" }} />
              {idx !== parkedListOf5.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ color: "#008399", fontWeight: 700 }}>
              {car.plate}
            </TimelineContent>
            <TimelineContent>{car.type}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
