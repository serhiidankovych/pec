import React, { useState, useEffect } from "react";
import "./RoomScreen.css";
import SidePanel from "../../components/room/sidepanel/SidePanel";
import TitleBar from "../../components/room/title-bar/TitleBar";
import { useSelector } from "react-redux";
import InfoBar from "../../components/room/info-bar/InfoBar";
import RoomBtnPanel from "../../components/buttons/room-btn-panel/RoomBtnPanel";
import Draggable from "react-draggable";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { motion } from "framer-motion";

const RoomScreen = () => {
  const position = { x: 100, y: 100 };
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const isRoomHost = useSelector((state) => state.isRoomHost);
  const roomId = useSelector((state) => state.roomId);
  const identity = useSelector((state) => state.identity);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
    console.log("getLocalPreviewAndInitRoomConnection in RoomScreen");
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      if (roomId === "not-available") {
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
      }
    }
  }, [roomId]);

  const mainPanelVariants = {};

  const sideBarVariants = {};
  const handle = <div className="handle"></div>;
  return (
    <Draggable handle=".handle" defaultPosition={position}>
      <div className="drag-element">
        <div className="room-screen">
          {handle}
          <div className="video" id="videos_container"></div>
          <RoomBtnPanel />
        </div>
      </div>
    </Draggable>
  );
};

export default RoomScreen;
