import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import "../RoomButtonsPanel/RoomButtonsPanel.css";
import { setIsRoomExist } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { leaveRoom } from "../../utils/webRTCHandler";
const LeaveButton = () => {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.roomId);
  const handleLeaveBntPress = () => {
    leaveRoom(roomId);

    // dispatch(setIsRoomExist(false));
    //close logic
  };

  return (
    <div onClick={handleLeaveBntPress} className={"btnContainer"}>
      <PiSignOutBold />
    </div>
  );
};

export default LeaveButton;
