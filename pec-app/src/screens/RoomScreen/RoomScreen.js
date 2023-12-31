import React, { useState, useEffect } from "react";
import "./RoomScreen.css";
import { useSelector } from "react-redux";
import RoomButtonPanel from "../../components/RoomButtonsPanel/RoomButtonsPanel";
import Draggable from "react-draggable";
import * as webRTCHandler from "../../utils/webRTCHandler";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import ParticipantsIdentity from "../../shared/ParticipantIdentity/ParticipantsIdentity";
const RoomScreen = () => {
  const position = { x: 100, y: 100 };

  const [isParticipantsPanelOpen, setIsParticipantsPanelOpen] = useState(false);

  const isRoomHost = useSelector((state) => state.isRoomHost);
  const roomId = useSelector((state) => state.roomId);
  const identity = useSelector((state) => state.identity);
  const userId = useSelector((state) => state.userId);
  const participants = useSelector((state) => state.participants);
  const onlyAudio = useSelector((state) => state.connectOnlyWithAudio);

  const handleParticipantsPanel = () => {
    setIsParticipantsPanelOpen((prev) => !prev);
  };

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    webRTCHandler.roomHandler(isRoomHost, identity, roomId, userId, onlyAudio);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      if (roomId === "not-available") {
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
      }
    }
  }, [roomId]);

  const handle = <div className="handle"></div>;
  return (
    <Draggable handle=".handle" defaultPosition={position}>
      <div className="drag-element">
        <div className="room-screen">
          {handle}
          <div className="video" id="videos_container"></div>
          <RoomButtonPanel
            handleParticipantsPanel={handleParticipantsPanel}
            roomId={roomId}
          />
          {isParticipantsPanelOpen && (
            <ParticipantsIdentity participants={participants} />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default RoomScreen;
