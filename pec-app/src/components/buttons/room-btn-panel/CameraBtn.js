import React, { useState } from "react";
import styles from "./RoomBtnPanel.module.css";
import camera from "../../../assets/icons/camera.svg";
import cameraOff from "../../../assets/icons/cameraOff.svg";
import { toggleCamera } from "../../../utils/webRTCHandler";

const CameraBtn = () => {
  const [isCameraOff, setIsCameraOff] = useState(false);

  const handleCameraBntPress = () => {
    toggleCamera(isCameraOff);
    setIsCameraOff((prev) => !prev);
  };

  return (
    <div onClick={handleCameraBntPress} className={styles.btnContainer}>
      <img
        src={isCameraOff ? cameraOff : camera}
        alt="camera"
        className={styles.btnImg}
      />
    </div>
  );
};

export default CameraBtn;
