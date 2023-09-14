// import { useState, useRef } from "react";
// import { Webcam } from "../utils/webcam";
import VideocamIcon from "@mui/icons-material/Videocam";
import { IconButton } from "@mui/material";

const ButtonHandler = ({ handleClick, streaming }) => {
  // const [streaming, setStreaming] = useState(false); // streaming state
  // const webcam = new Webcam(); // webcam handler

  return (
    <div className="btn-container">
      {/* Webcam Handler */}
      <IconButton aria-label="Webcam 1" onClick={handleClick}>
        {streaming ? (
          <VideocamIcon color="error" />
        ) : (
          <VideocamIcon color="warning" />
        )}
      </IconButton>
    </div>
  );
};

export default ButtonHandler;
