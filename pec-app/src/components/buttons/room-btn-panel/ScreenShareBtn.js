import React, { useState } from "react";
import styles from "./RoomBtnPanel.module.css";
import screenShare from "../../../assets/icons/screenShare.svg";
import LocalScreenSharingPreview from "../../room/screen-share/LocalScreenSharingPreview";
import { toggleScreenShare } from "../../../utils/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareBtn = () => {
  const [isScreenShareActive, setIsScreenShareActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleSSBntPress = async () => {
    if (!isScreenShareActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.error("error in getting screen share stream", error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        toggleScreenShare(isScreenShareActive, stream);
        setIsScreenShareActive(true);
        // switch video track that we are sending
      }
    } else {
      // switch to video track from camera
      toggleScreenShare(isScreenShareActive);
      setIsScreenShareActive(false);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div onClick={handleSSBntPress} className={styles.btnContainer}>
        <img src={screenShare} alt="screen-share" className={styles.btnImg} />
      </div>
      {isScreenShareActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default ScreenShareBtn;
