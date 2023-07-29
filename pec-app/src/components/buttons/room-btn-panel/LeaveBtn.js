import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import styles from "./RoomBtnPanel.module.css";
import { setIsRoomExist } from "../../../redux/actions";
import { useDispatch } from "react-redux";
const LeaveBtn = () => {
  const dispatch = useDispatch();

  const handleLeaveBntPress = () => {
    dispatch(setIsRoomExist(false));
    //close logic
  };

  return (
    <div onClick={handleLeaveBntPress} className={styles.btnContainer}>
      <PiSignOutBold />
    </div>
  );
};

export default LeaveBtn;
