import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import styles from "./RoomBtnPanel.module.css";
const LeaveBtn = () => {
  const handleLeaveBntPress = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div onClick={handleLeaveBntPress} className={styles.btnContainer}>
      <PiSignOutBold />
    </div>
  );
};

export default LeaveBtn;
