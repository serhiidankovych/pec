import React, { useState } from "react";
import "../RoomButtonsPanel/RoomButtonsPanel.css";
import { toggleCamera } from "../../utils/webRTCHandler";
import { PiVideoCameraBold, PiVideoCameraSlashBold } from "react-icons/pi";
const CameraButton = () => {
  const [isCameraOff, setIsCameraOff] = useState(false);

  const handleCameraBntPress = () => {
    toggleCamera(isCameraOff);
    setIsCameraOff((prev) => !prev);
  };

  return (
    <div onClick={handleCameraBntPress} className={"btnContainer"}>
      {isCameraOff ? <PiVideoCameraSlashBold /> : <PiVideoCameraBold />}
    </div>
  );
};

export default CameraButton;
