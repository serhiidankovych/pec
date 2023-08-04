import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { setConnectOnlyRoom } from "../../redux/actions";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import {
  PiUsersBold,
  PiUsersFill,
  PiVideoCameraBold,
  PiVideoCameraFill,
  PiLinkBold,
  PiLinkBreakBold,
  PiMusicNotesBold,
  PiMusicNotesFill,
} from "react-icons/pi";
function Sidebar({
  handlerisIntroScreen,
  handleCopyClick,
  isRoomExist,
  handlerisSoundsPanel,
}) {
  const dispatch = useDispatch();
  const handleOnlyRoom = () => {
    dispatch(setConnectOnlyRoom(true));
    handlerisIntroScreen();
  };
  const handleRoom = () => {
    dispatch(setConnectOnlyRoom(false));
    handlerisIntroScreen();
  };
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ButtonBox
          defaultButton={<PiUsersBold />}
          focusButton={<PiUsersFill />}
          color="#FBEC4F"
          func={handleOnlyRoom}
          disabled={isRoomExist}
        />
        <ButtonBox
          defaultButton={<PiVideoCameraBold />}
          focusButton={<PiVideoCameraFill />}
          color="#FBEC4F"
          func={handleRoom}
          disabled={isRoomExist}
        />
        <ButtonBox
          defaultButton={<PiLinkBold />}
          focusButton={<PiLinkBreakBold />}
          color="#FBEC4F"
          func={handleCopyClick}
        />
        <ButtonBox
          defaultButton={<PiMusicNotesBold />}
          focusButton={<PiMusicNotesFill />}
          color="#FBEC4F"
          func={handlerisSoundsPanel}
        />
      </div>
    </div>
  );
}

export default Sidebar;
