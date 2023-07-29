import React from "react";
import CameraBtn from "./CameraBtn";
import LeaveBtn from "./LeaveBtn";
import MicBtn from "./MicBtn";
import styles from "./RoomBtnPanel.module.css";
import ScreenShareBtn from "./ScreenShareBtn";
import HideButton from "./HideButton";

const RoomBtnPanel = () => {
  const [isPanelDisplayed, setIsPanelDisplayed] = React.useState(false);

  const handlePanelDisplayeds = () => {
    setIsPanelDisplayed((prev) => !prev);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.btnsContainer}>
        {isPanelDisplayed && (
          <>
            <MicBtn />
            <CameraBtn />
            <ScreenShareBtn />
            <LeaveBtn />
          </>
        )}
        <HideButton
          handlePanelDisplayeds={handlePanelDisplayeds}
          isPanelDisplayed={isPanelDisplayed}
        />
      </div>
    </div>
  );
};

export default RoomBtnPanel;
