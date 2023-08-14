import React from "react";
import "./ParticipantsIdentity.css";
import Avatar, { genConfig } from "react-nice-avatar";

function ParticipantsIdentity({ participants }) {
  if (participants === null) {
    return <div className="">Co-learn ID - no roomID</div>;
  }

  return (
    <div className="participants">
      {participants?.map((participant) => {
        const config = genConfig(participant.userId);

        return (
          <div key={participant.userId} className="participant-identity">
            <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
            <div>{participant.identity}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ParticipantsIdentity;
