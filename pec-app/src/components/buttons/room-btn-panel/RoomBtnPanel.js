import React from "react";
import CameraBtn from "./CameraBtn";
import LeaveBtn from "./LeaveBtn";
import MicBtn from "./MicBtn";
import styles from "./RoomBtnPanel.module.css";
import ScreenShareBtn from "./ScreenShareBtn";
import { motion } from "framer-motion";

const RoomBtnPanel = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.btnsContainer}>
        <MicBtn />
        <CameraBtn />
        <ScreenShareBtn />
        <LeaveBtn />
      </div>
    </div>
  );
};

export default RoomBtnPanel;
