import React from "react";
import CameraButton from "../RoomButtons/CameraButton";
import LeaveButton from "../RoomButtons/LeaveButton";
import MicButton from "../RoomButtons/MicButton";
import "./RoomButtonsPanel.css";
import ScreenShareButton from "../RoomButtons/ScreenShareButton";
import HideButton from "../RoomButtons/HideButton";

const RoomButtonPanel = ({ handleParticipantsPanel }) => {
  const [isPanelDisplayed, setIsPanelDisplayed] = React.useState(false);

  const handlePanelDisplayeds = () => {
    setIsPanelDisplayed((prev) => !prev);
  };

  return (
    <div className={"mainContainer"}>
      <div className={"btnsContainer"}>
        {isPanelDisplayed && (
          <>
            <MicButton />
            <CameraButton />
            <ScreenShareButton />
            <LeaveButton />
            <button onClick={() => handleParticipantsPanel()}>Pat</button>
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

export default RoomButtonPanel;
