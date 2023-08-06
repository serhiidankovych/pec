import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { setConnectOnlyRoom, setUserId } from "../../redux/actions";
import { newRoomId } from "../../utils/wss";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import {
  PiUserBold,
  PiUserFill,
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
  handlerisJoinRoomScreen,
}) {
  const dispatch = useDispatch();
  const handleJoin = () => {
    handlerisJoinRoomScreen();
  };
  const handleOnlyRoom = () => {
    dispatch(setConnectOnlyRoom(true));
    handlerisIntroScreen();
  };
  const handleRoom = () => {
    dispatch(setConnectOnlyRoom(false));
    handlerisIntroScreen();
  };
  const handleUserId = () => {
    newRoomId();
  };
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ButtonBox
          defaultButton={<PiUserBold />}
          focusButton={<PiUserFill />}
          color="#FBEC4F"
          func={handleUserId}
          disabled={isRoomExist}
          title="generate a new id"
        />
        <ButtonBox
          defaultButton={<PiUsersBold />}
          focusButton={<PiUsersFill />}
          color="#FBEC4F"
          func={handleOnlyRoom}
          disabled={isRoomExist}
          title="create room"
        />
        <ButtonBox
          defaultButton={<PiVideoCameraBold />}
          focusButton={<PiVideoCameraFill />}
          color="#FBEC4F"
          func={handleJoin}
          disabled={isRoomExist}
          title="join room"
        />
        <ButtonBox
          defaultButton={<PiLinkBold />}
          focusButton={<PiLinkBreakBold />}
          color="#FBEC4F"
          func={handleCopyClick}
          title="copy id"
        />
        <ButtonBox
          defaultButton={<PiMusicNotesBold />}
          focusButton={<PiMusicNotesFill />}
          color="#FBEC4F"
          func={handlerisSoundsPanel}
          title="soundboard"
        />
      </div>
    </div>
  );
}

export default Sidebar;
