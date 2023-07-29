import React from "react";
import "./Header.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import RoomId from "../../shared/RoomId/RoomId";
import { useSelector } from "react-redux";

function Header() {
  const userId = useSelector((state) => state.userId);

  return (
    <div className="header">
      <div className="logo">
        <ButtonBox title="pec" color="#4F75FB" />
        <div>PEC</div>
      </div>
      <RoomId userId={userId} />
    </div>
  );
}

export default Header;
