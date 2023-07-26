import React, { useEffect, useState } from "react";
import styles from "../InfoBar.module.css";
import { formatSeconds } from "../../../../utils/formatSeconds";

const Timer = ({ meetId }) => {
  //const meetingTime = localStorage.getItem(`${meetId}-time`) || 0;
  const [time, setTime] = useState(Number(0));

  useEffect(() => {
    localStorage.setItem(`${meetId}-time`, 0);
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        localStorage.setItem(`${meetId}-time`, prevTime + 1);
        return prevTime + 1;
      });
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [meetId]);

  return (
    <div className={styles.timer}>
      <span className={styles.timerDot}></span>
      <span>{formatSeconds(time)}</span>
    </div>
  );
};

export default Timer;
