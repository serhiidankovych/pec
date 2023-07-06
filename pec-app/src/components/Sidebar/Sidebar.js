import React from "react";
import "./Sidebar.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import {
  PiPhoneCallBold,
  PiSquaresFourBold,
  PiVideoCameraBold,
} from "react-icons/pi";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ButtonBox title={<PiSquaresFourBold />} color="#FBEC4F" />
        <ButtonBox title={<PiPhoneCallBold />} color="#FBEC4F" />
        <ButtonBox title={<PiVideoCameraBold />} color="#FBEC4F" />
      </div>
    </div>
  );
}

export default Sidebar;
