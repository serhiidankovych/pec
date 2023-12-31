import React, { useEffect } from "react";
import Draggable from "react-draggable";
import "./OnlyRoomScreen.css";
import ParticipantsIdentity from "../../shared/ParticipantIdentity/ParticipantsIdentity";

import { joinOnlyRoom, createOnlyRoom } from "../../utils/wss";
import { useSelector } from "react-redux";

function OnlyRoomScreen() {
  const isRoomHost = useSelector((state) => state.isRoomHost);
  const roomId = useSelector((state) => state.roomId);
  const identity = useSelector((state) => state.identity);
  const userId = useSelector((state) => state.userId);
  const participants = useSelector((state) => state.participants);

  useEffect(() => {
    if (isRoomHost) {
      createOnlyRoom(identity);
    } else {
      joinOnlyRoom(identity, roomId, userId);
    }
    console.log("ONly room sreen");
  }, []);
  const position = { x: 500, y: 0 };
  const handle = <div className="handle"></div>;
  return (
    <Draggable handle=".handle" defaultPosition={position}>
      <div className="drag-element">
        <div className="room-screen">
          {handle}
          <ParticipantsIdentity participants={participants} />
        </div>
      </div>
    </Draggable>
  );
}

export default OnlyRoomScreen;
