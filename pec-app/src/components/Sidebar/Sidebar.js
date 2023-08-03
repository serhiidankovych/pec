import React from "react";
import "./Sidebar.css";
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
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ButtonBox
          defaultButton={<PiUsersBold />}
          focusButton={<PiUsersFill />}
          color="#FBEC4F"
        />
        <ButtonBox
          defaultButton={<PiVideoCameraBold />}
          focusButton={<PiVideoCameraFill />}
          color="#FBEC4F"
          func={handlerisIntroScreen}
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
