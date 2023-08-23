import React, { useState, useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detectVideo } from "./utils/detect";
import Paper from "@mui/material/Paper";
import "./style/Camera.scss";
import { Webcam } from "./utils/webcam";
import { getCameraDevices } from "./utils/getCamera";

const Camera = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  const [streaming, setStreaming] = useState(false); // streaming state

  // references
  const webcam = useRef(new Webcam()); // webcam handler
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  tf.setBackend("webgl");


  const handleClick = () => {
    getCameraDevices().then((devices) => {
      if (devices.length > 1) {
        const externalWebcamId = devices[1].deviceId;
        if (streaming === false) {
          webcam.current.open(cameraRef.current, externalWebcamId); // open webcam
          cameraRef.current.style.display = "block"; // show camera
          setStreaming(true); // set streaming to camera
        } else if (streaming === true) {
          // setLoading({ loading: true, progress: 0 });
          webcam.current.close(cameraRef.current);
          webcam.current.open(cameraRef.current, externalWebcamId); // open webcam
          // cameraRef.current.style.display = "none";
          // setStreaming(false);
          // tf.dispose();
          // setLoading({ loading: false, progress: 1 });
        }
      }
    });
  };
  // model configs
  const modelName = "yolov8n";
  const modelUrl = `/${modelName}_web_model/model.json`;

  const cbLoadModel = useCallback(() => {
    console.log(
      `${window.location.hostname}/${modelName}_web_model/model.json`
    );
    tf.ready()
      .then(async () => {
        const yolov8 = await tf.loadGraphModel(modelUrl, {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }); // load model

        // warming up model
        const dummyInput = tf.ones(yolov8.inputs[0].shape);
        const warmupResults = await yolov8.executeAsync(dummyInput);

        setLoading({ loading: false, progress: 1 });
        setModel({
          net: yolov8,
          inputShape: yolov8.inputs[0].shape,
        }); // set model & input shape
        console.log("can load");
        tf.dispose([warmupResults, dummyInput]); // cleanup memory
      })
      .catch((error) => {
        console.error("Error in loading model:", error);
      });
  }, [modelUrl]);

  // function onResize() {}

  useEffect(() => {

    try {
      cbLoadModel();
      // window.addEventListener("resize", onResize);
    } catch (err) {
      console.log(err);
    }
    return () => {
      // window.removeEventListener("resize", onResize);
    };
  }, [cbLoadModel]);

  return (
    <Paper
      elevation={3}
      className="camera1-paper"
      sx={{
        borderRadius: "20px",
        height: "fit-content",
        minHeight: "200px",
        width: "auto",
        mb: 1,
      }}
    >
      <div className="camera-container">
        {loading.loading && (
          <Loader>
            Loading AI-1 ... {(loading.progress * 100).toFixed(2)}%
          </Loader>
        )}

        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => {
            detectVideo(cameraRef.current, model, canvasRef.current);
          }}
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
        {!loading.loading && (
          <ButtonHandler handleClick={handleClick} />
        )}
      </div>
    </Paper>
  );
};

export default Camera;
