import React from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import styles from "./RoomBtnPanel.module.css";
const HideButton = ({ handlePanelDisplayeds, isPanelDisplayed }) => {
  return (
    <div onClick={handlePanelDisplayeds} className={styles.btnContainer}>
      {isPanelDisplayed ? <PiCaretUpBold /> : <PiCaretDownBold />}
    </div>
  );
};

export default HideButton;
