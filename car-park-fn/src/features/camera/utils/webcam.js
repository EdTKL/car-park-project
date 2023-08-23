/**
 * Class to handle webcam
 */
export class Webcam {
    /**
     * Open webcam and stream it through video tag.
     * @param {HTMLVideoElement} videoRef video tag reference
     * @param {String} deviceId Device ID of the camera you want to use
     */
    open = (videoRef, deviceId) => {
      const constraints = {
        audio: false,
        video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: "environment" }
      };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            videoRef.srcObject = stream;
          })
          .catch((error) => {
            console.log(error);
          });
      } else alert("Can't open Webcam!");
    };
  
    /**
     * Close opened webcam.
     * @param {HTMLVideoElement} videoRef video tag reference
     */
    close = (videoRef) => {
      if (videoRef.srcObject) {
        videoRef.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        videoRef.srcObject = null;
      } else alert("Please open Webcam first!");
    };
  }  