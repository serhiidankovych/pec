import React from "react";
import "./RoomId.css";
import Avatar, { genConfig } from "react-nice-avatar";

function RoomId({ userId }) {
  const formatId = (id) => {
    return `${id.substring(0, 3)}...${id.substring(id.length - 3)}`;
  };

  if (userId === null) {
    return <div className="header-room-id">Co-learn ID - no roomID</div>;
  }

  const config = genConfig(userId);
  return (
    <div className="header-room-id">
      Co-learn ID:
      <div className="header-formatted-id">{formatId(userId)}</div>
      <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
    </div>
  );
}

export default RoomId;
