import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
// const express = require('express');
// const multer = require('multer');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

function WebcamVideo() {

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );


  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);


  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    // handleAutoSaveRecording();
  }, [mediaRecorderRef, setCapturing]);

  // const handleAutoSaveRecording = useCallback(() => {
  //   app.post('/save-video', upload.single('video'), (req, res) => {
  //     // Access the saved video file using req.file
  //     const savedVideo = req.file;
  //     const targetDirectory = 'path/to/save/videos/';
  //     const targetPath = `${targetDirectory}${savedVideo.filename}`;
  //     // eslint-disable-next-line no-undef
  //     fs.rename(savedVideo.path, targetPath, (err) => {
  //       if (err) {
  //         console.error('Error moving the video file:', err);
  //         res.sendStatus(500);
  //       } else {
  //         console.log('Video file saved:', targetPath);
  //         res.sendStatus(200);
  //       }
  //     });
  //   });
    
  //   app.listen(3001, () => {
  //     console.log('Server started on port 3001');
  //   });

  // })


  const sendToServer = async (file) => {
    
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const formData = new FormData();
    formData.append('video', blob);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/video/upload`, 
      { method: 'POST', body: formData }).then(res => {
      console.log("SUCCESS", res.text())
      fetch()
    }, [] )
  }
    // if(!file) return
    // try {
    //   return await fetch(blob, 
    //     { method: 'POST', body: file }).then(res => {
    //     console.log("SUCCESS", res.text())
    //   })
    // } catch(error) {
    //   console.log(error)
    // }

  
  const App = () => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    return <div>
    <img width="1280" height="720" src={blob} alt="avatar"/>
    <input type="file" onChange={async (event) => await sendToServer(event.target.files[0] || null)} />
    </div>
  }

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };


  return (
    <div className="Container">
      <Webcam
        height={1280}
        width={720}
        audio={true}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button> 
      )}
      {recordedChunks.length > 0 && (
        sendToServer() //UseEffect
      )}
    </div>
  );
}

export default WebcamVideo;

