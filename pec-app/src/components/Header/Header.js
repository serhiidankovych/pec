import React from "react";
import "./Header.css";
import pecLogo from "../../pictures/pec-logo.png";
import pecLogoDark from "../../pictures/pec-logo-dark.png";
import RoomId from "../../shared/RoomId/RoomId";
import { useSelector } from "react-redux";

function Header() {
  const userId = useSelector((state) => state.userId);

  return (
    <div className="header">
      <div className="logo">
        <img className="header-logo" src={pecLogo}></img>
        <div>Private English Club</div>
      </div>
      <RoomId userId={userId} />
    </div>
  );
}

export default Header;
