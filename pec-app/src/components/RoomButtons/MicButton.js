import React, { useState } from "react";
import "../RoomButtonsPanel/RoomButtonsPanel.css";

import { toggleMic } from "../../utils/webRTCHandler";
import { PiMicrophoneBold, PiMicrophoneSlashBold } from "react-icons/pi";
const MicButton = () => {
  const [isMicOff, setIsMicOff] = useState(false);

  const handleMicBntPress = () => {
    toggleMic(isMicOff);
    setIsMicOff((prev) => !prev);
  };

  return (
    <div onClick={handleMicBntPress} className={"btnContainer"}>
      {isMicOff ? <PiMicrophoneSlashBold /> : <PiMicrophoneBold />}
    </div>
  );
};

export default MicButton;
