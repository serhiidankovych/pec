import React, { useState } from "react";
import styles from "./RoomBtnPanel.module.css";

import { toggleMic } from "../../../utils/webRTCHandler";
import { PiMicrophoneBold, PiMicrophoneSlashBold } from "react-icons/pi";
const MicBtn = () => {
  const [isMicOff, setIsMicOff] = useState(false);

  const handleMicBntPress = () => {
    toggleMic(isMicOff);
    setIsMicOff((prev) => !prev);
  };

  return (
    <div onClick={handleMicBntPress} className={styles.btnContainer}>
      {isMicOff ? <PiMicrophoneSlashBold /> : <PiMicrophoneBold />}
    </div>
  );
};

export default MicBtn;
