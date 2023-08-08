import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { setConnectOnlyRoom, setIsRoomHost } from "../../redux/actions";
import { newRoomId } from "../../utils/wss";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  handlerisRoomScreen,
}) {
  const dispatch = useDispatch();

  const handleJoin = () => {
    handlerisJoinRoomScreen();
  };
  const handleCreate = () => {
    dispatch(setIsRoomHost(true));
    dispatch(setConnectOnlyRoom(false));
    handlerisJoinRoomScreen();
  };

  const showToast = (title, text) => {
    toast(`${title} ${text}`, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };
  // const handleOnlyRoom = () => {
  //   dispatch(setConnectOnlyRoom(true));
  //   handlerisIntroScreen();
  // };
  // const handleRoom = () => {
  //   dispatch(setConnectOnlyRoom(false));
  //   handlerisIntroScreen();
  // };
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
          showToast={showToast}
        />
        <ButtonBox
          defaultButton={<PiUsersBold />}
          focusButton={<PiUsersFill />}
          color="#FBEC4F"
          func={handleCreate}
          disabled={isRoomExist}
          title="create room"
          showToast={showToast}
        />
        <ButtonBox
          defaultButton={<PiVideoCameraBold />}
          focusButton={<PiVideoCameraFill />}
          color="#FBEC4F"
          func={handleJoin}
          disabled={isRoomExist}
          title="join room"
          showToast={showToast}
        />
        <ButtonBox
          defaultButton={<PiLinkBold />}
          focusButton={<PiLinkBreakBold />}
          color="#FBEC4F"
          func={handleCopyClick}
          title="copy id"
          showToast={showToast}
        />
        <ButtonBox
          defaultButton={<PiMusicNotesBold />}
          focusButton={<PiMusicNotesFill />}
          color="#FBEC4F"
          func={handlerisSoundsPanel}
          title="soundboard"
          showToast={showToast}
        />
        <div className="sidebar-footer"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
