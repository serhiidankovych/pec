import React, { useState } from "react";
import "../RoomButtonsPanel/RoomButtonsPanel.css";

import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import { toggleScreenShare } from "../../utils/webRTCHandler";
import { PiScreencastBold } from "react-icons/pi";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = () => {
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
      <div onClick={handleSSBntPress} className={"btnContainer"}>
        <PiScreencastBold />
      </div>
      {isScreenShareActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default ScreenShareButton;
