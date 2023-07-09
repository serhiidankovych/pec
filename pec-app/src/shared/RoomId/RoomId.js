import React from "react";

function RoomId({ roomDetails, setRoomCode, roomCode }) {
  React.useEffect(() => {
    if (roomDetails?.roomId) {
      setRoomCode(roomDetails?.roomId);
      console.log("HELLLL");
    }

    console.log("ROOMID - " + roomDetails?.roomId);
  }, [setRoomCode, roomDetails]);

  const formatId = (id) => {
    return `${id.substring(0, 3)}...${id.substring(id.length - 3)}`;
  };
  return (
    <div style={{ textAlign: "right" }}>
      Co-learn ID -{" "}
      {roomDetails ? formatId(roomDetails?.roomId) : formatId(roomCode)}
    </div>
  );
}

export default RoomId;
