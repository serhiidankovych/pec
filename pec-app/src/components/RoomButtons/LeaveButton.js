import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import "../RoomButtonsPanel/RoomButtonsPanel.css";
import { setIsRoomExist } from "../../redux/actions";
import { useDispatch } from "react-redux";
const LeaveButton = () => {
  const dispatch = useDispatch();

  const handleLeaveBntPress = () => {
    dispatch(setIsRoomExist(false));
    //close logic
  };

  return (
    <div onClick={handleLeaveBntPress} className={"btnContainer"}>
      <PiSignOutBold />
    </div>
  );
};

export default LeaveButton;
