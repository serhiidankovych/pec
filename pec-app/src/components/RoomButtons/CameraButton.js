import React, { useState, useEffect } from "react";
import "../RoomButtonsPanel/RoomButtonsPanel.css";
import { useSelector } from "react-redux";
import { toggleCamera } from "../../utils/webRTCHandler";
import { PiVideoCameraBold, PiVideoCameraSlashBold } from "react-icons/pi";
const CameraButton = () => {
  const connectOnlyWithAudio = useSelector(
    (state) => state.connectOnlyWithAudio
  );
  const [isCameraOff, setIsCameraOff] = useState(connectOnlyWithAudio);

  // useEffect(() => {
  //   if (connectOnlyWithAudio) {
  //     toggleCamera(true);
  //   }
  // }, []);

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
