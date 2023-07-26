import React from "react";
import styles from "./InfoBar.module.css";
import grp from "../../../assets/icons/group.svg";
import add from "../../../assets/icons/add.svg";
import { useSelector } from "react-redux";
import Timer from "./timer/Timer";

const InfoBar = () => {
  const { participants, roomId } = useSelector((st) => st);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.participants}>
        <div className={styles.noOfParticipants}>
          <img src={grp} alt="group" />
          <span>{participants.length}</span>
        </div>
        <div className={styles.inviteParticipants}>
          <img src={add} alt="" />
          <p>Invite a participant</p>
        </div>
      </div>
      <Timer meetId={roomId} />
    </div>
  );
};

export default InfoBar;
