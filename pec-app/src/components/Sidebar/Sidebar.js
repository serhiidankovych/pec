import React from "react";
import "./Sidebar.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import {
  PiPhoneCallBold,
  PiSquaresFourBold,
  PiVideoCameraBold,
  PiVideoCameraFill,
  PiPhoneCallFill,
  PiSquaresFourFill,
  PiLinkBold,
  PiLinkBreakBold,
} from "react-icons/pi";
function Sidebar({ handlerisIntroScreen, handleCopyClick, isRoomExist }) {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ButtonBox
          defaultBtn={<PiSquaresFourBold />}
          focusBtn={<PiSquaresFourFill />}
          color="#FBEC4F"
        />
        <ButtonBox
          defaultBtn={<PiPhoneCallBold />}
          focusBtn={<PiPhoneCallFill />}
          color="#FBEC4F"
        />
        <ButtonBox
          defaultBtn={<PiVideoCameraBold />}
          focusBtn={<PiVideoCameraFill />}
          color="#FBEC4F"
          func={handlerisIntroScreen}
          disabled={isRoomExist}
        />
        <ButtonBox
          defaultBtn={<PiLinkBold />}
          focusBtn={<PiLinkBreakBold />}
          color="#FBEC4F"
          func={handleCopyClick}
        />
      </div>
    </div>
  );
}

export default Sidebar;
