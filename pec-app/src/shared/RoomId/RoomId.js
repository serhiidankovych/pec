import React from "react";

function RoomId({ roomId }) {
  const formatId = (id) => {
    return `${id.substring(0, 3)}...${id.substring(id.length - 3)}`;
  };
  return (
    <div style={{ textAlign: "right" }}>Co-learn ID - {formatId(roomId)}</div>
  );
}

export default RoomId;
