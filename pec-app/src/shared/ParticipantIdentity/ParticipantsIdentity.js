import React from "react";
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
    <div>
      {/* {participants.map((participant) => {
        const config = genConfig(participant.userId);
        console.log("PU ID: " + participant.userId);
        return (
          <div>
            <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
            <div key={participants.userId}>{participant.identity}</div>
          </div>
        );
      })} */}
    </div>
  );
}

export default ParticipantsIdentity;
