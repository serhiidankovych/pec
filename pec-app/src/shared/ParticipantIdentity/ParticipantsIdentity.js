import React from "react";
import "./ParticipantsIdentity.css";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
function ParticipantsIdentity() {
  const { participants } = useSelector((state) => state);
  console.log("participants");
  console.log(participants);
  if (participants === null) {
    return <div className="">Co-learn ID - no roomID</div>;
  }

  return (
    <div className="participants">
      {participants.map((participant) => {
        const config = genConfig(participant.userId);
        console.log("PU ID: " + participant.userId);
        return (
          <div key={config} className="participant-identity">
            <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
            <div>{participant.identity}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ParticipantsIdentity;
