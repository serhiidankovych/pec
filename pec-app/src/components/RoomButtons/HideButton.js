import React from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import "../RoomButtonsPanel/RoomButtonsPanel.css";
const HideButton = ({ handlePanelDisplayeds, isPanelDisplayed }) => {
  return (
    <div onClick={handlePanelDisplayeds} className={"btnContainer"}>
      {isPanelDisplayed ? <PiCaretUpBold /> : <PiCaretDownBold />}
    </div>
  );
};

export default HideButton;
