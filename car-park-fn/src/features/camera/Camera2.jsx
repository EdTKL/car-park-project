import React, { useState, useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import Paper from "@mui/material/Paper";
import "./style/Camera.scss";
import { detectVideo2 } from "./utils/detect2";
import { Webcam } from "./utils/webcam";
import { getCameraDevices } from "./utils/getCamera";
import { useAppSelector, useAppDispatch } from "../../app/hook";

const Camera2 = () => {
  const [loading2, setLoading2] = useState({ loading: true, progress: 0 }); // loading state
  const [model2, setModel2] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape
  const [streaming, setStreaming] = useState(false); // streaming state
  const webcam2 = useRef(new Webcam()); // webcam handler

  // references
  const camera2Ref = useRef(null);
  const canvas2Ref = useRef(null);

  const dispatch = useAppDispatch();
  const staffID = useAppSelector((state) => state.auth.username)


  const handleClick = () => {
    getCameraDevices().then((devices) => {
      if (devices.length > 0) {
        const internalWebcamId = devices[0].deviceId;
        if (!streaming) {
          webcam2.current.open(camera2Ref.current, internalWebcamId); // open webcam
          camera2Ref.current.style.display = "block"; // show camera
          setStreaming(true); // set streaming to camera
        } else if (streaming) {
          // setLoading({ loading: true, progress: 0 })
          webcam2.current.close(camera2Ref.current);
          // webcam.current.open(cameraRef.current, internalWebcamId); // open webcam
          camera2Ref.current.style.display = "none";
          setStreaming(false);
          // tf.dispose()
          // setLoading({ loading: false, progress: 1 })
        }
      }
    });
  };

  // model configs
  const modelName = "yolov8n";
  const modelUrl = `/${modelName}_web_model/model.json`;

  const cbLoadModel2 = useCallback(() => {
    console.log(
      `loading ${window.location.hostname}/${modelName}_web_model/model.json`
    );
    tf.ready()
      .then(async () => {
        const yolov8ii = await tf.loadGraphModel(modelUrl, {
          onProgress: (fractions) => {
            setLoading2({ loading: true, progress: fractions }); // set loading fractions
          },
        }); // load model

        // warming up model
        const dummy2Input = tf.ones(yolov8ii.inputs[0].shape);
        const warmup2Results = yolov8ii.execute(dummy2Input);

        setLoading2({ loading: false, progress: 1 });
        setModel2({
          net: yolov8ii,
          inputShape: yolov8ii.inputs[0].shape,
        }); // set model & input shape
        console.log("can load");
        tf.dispose([warmup2Results, dummy2Input]); // cleanup memory
      })
      .catch((error) => {
        console.error("Error in loading model:", error);
      });
  }, [modelUrl]);

  useEffect(() => {
    try {
      cbLoadModel2();
    } catch (err) {
      console.log(err);
    }
  }, [cbLoadModel2]);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "20px",
        height: streaming? "fit-content" : "50%",
        // minHeight: streaming? "250px" : "fit-content",
        width: "100%",
        bgcolor: "info.main",
      }}
    >
      <div className="camera-container">
        {loading2.loading && (
          <Loader>
            Loading AI-2 ... {(loading2.progress * 100).toFixed(2)}%
          </Loader>
        )}

        <video
          autoPlay
          muted
          ref={camera2Ref}
          onPlay={() => {
            if (streaming) {
              detectVideo2(camera2Ref.current, model2, canvas2Ref.current, staffID, dispatch);
            }
          }}
        />
        <canvas
          width={model2.inputShape[1]}
          height={model2.inputShape[2]}
          ref={canvas2Ref}
        />
        {!loading2.loading && (
          <ButtonHandler handleClick={handleClick} streaming={streaming} />
        )}
      </div>
    </Paper>
  );
};

export default Camera2;
