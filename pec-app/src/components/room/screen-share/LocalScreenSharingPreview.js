import React, { useRef, useEffect } from "react";

const LocalScreenSharingPreview = ({ stream }) => {
  const localPreviewRef = useRef();

  useEffect(() => {
    const video = localPreviewRef.current;
    video.srcObject = stream;
    video.onloadmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className="localScreenSharePreview">
      <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  );
};

export default LocalScreenSharingPreview;
