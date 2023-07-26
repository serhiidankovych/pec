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

const RoomScreen = () => {
  const position = { x: 100, y: 100 };
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const { roomId, isRoomHost, identity } = useSelector((st) => ({
    roomId: st.roomId,
    isRoomHost: st.isRoomHost,
    identity: st.identity,
  }));
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
    console.log("getLocalPreviewAndInitRoomConnection in RoomScreen");
    console.log(`${isRoomHost} ${identity} ${roomId}`);
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

  return (
    <Draggable defaultPosition={position}>
      <div className="main-container">
        <div className="main-panel-container">
          <div className="meet-id-container">
            <p className="meet-id">
              Meet ID: <b>{roomId ? roomId : " null"}</b>
            </p>
          </div>
          <TitleBar
            openSidePanel={openSidePanel}
            setOpenSidePanel={setOpenSidePanel}
          />
          <InfoBar />
          <div id="videos_container"></div>
          <RoomBtnPanel />
        </div>

        {openSidePanel && (
          <div className="side-panel-container">
            <SidePanel />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default RoomScreen;
