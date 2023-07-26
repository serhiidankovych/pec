import React from "react";
import styles from "./ParticipantsList.module.css";
import { useSelector } from "react-redux";

const ParticipantsList = () => {
  const { participants } = useSelector((st) => st);

  return (
    <div className={styles.mainContainer}>
      <ul>
        {participants.map((participant, idx) => {
          return <li key={idx}>{participant.identity}</li>;
        })}
      </ul>
    </div>
  );
};

export default ParticipantsList;
