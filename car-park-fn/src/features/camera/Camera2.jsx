import React, { useState, useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import  Paper  from "@mui/material/Paper";
import './style/Camera.scss'
import { detectVideo2 } from "./utils/detect2";


const Camera2 = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape
  // references
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov8n";
  const modelUrl = `/${modelName}_web_model/model.json`

  const cbLoadModel = useCallback(()=>{
    // set up backend webgl manually
    tf.setBackend('webgl').then(() => {
      console.log("WebGL backend set!");
    }).catch(error => {
      console.error("Error setting WebGL backend:", error);
    });

    console.log(`${window.location.hostname}/${modelName}_web_model/model.json`)
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        modelUrl,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      
      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape
      console.log('can load')
      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    })
    .catch((error) => {
      console.error("Error in loading model:", error);
    })
  }, [modelUrl]
  )

  useEffect(() => { 
    cbLoadModel()
  }, [cbLoadModel]);

  return (
    <Paper elevation={3} sx={{borderRadius: '20px', height: '47.5%'}}>
      <div className="camera-container">
        {loading.loading && (
          <Loader>
            Loading AI-2 ... {(loading.progress * 100).toFixed(2)}%
          </Loader>
        )}

        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => detectVideo2(cameraRef.current, model, canvasRef.current)}
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
        <ButtonHandler
          cameraRef={cameraRef}
        />
      </div>

    </Paper>
  );
};

export default Camera2;
