import { useState, useRef } from "react";
import { Webcam } from "../utils/webcam";
import VideocamIcon from '@mui/icons-material/Videocam';
import { IconButton } from "@mui/material";


const ButtonHandler = ({ cameraRef }) => {
  const [streaming, setStreaming] = useState(false); // streaming state
  const webcam = new Webcam(); // webcam handler


  return (
    <div className="btn-container">
      {/* Webcam Handler */}
      <IconButton
        aria-label="Webcam 1"
        onClick={() => {
          if (streaming === false) {
            webcam.open(cameraRef.current); // open webcam
            cameraRef.current.style.display = "block"; // show camera
            setStreaming(true); // set streaming to camera
          } else if (streaming === true) {
            webcam.close(cameraRef.current);
            cameraRef.current.style.display = "none";
            setStreaming(false);
          }
        }}>
        <VideocamIcon color="error" />
      </IconButton>

    </div>
  );
};

export default ButtonHandler;
