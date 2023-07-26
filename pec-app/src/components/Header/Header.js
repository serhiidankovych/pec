import React from "react";
import "./Header.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import RoomId from "../../shared/RoomId/RoomId";
import UserContext from "../../context/UserContext";
function Header() {
  const roomId = React.useContext(UserContext);
  return (
    <div className="header">
      <div className="logo">
        {/* <ButtonBox title="pec" color="#4F75FB" funct={sayHello} /> */}
        {/* <div>PEC</div> */}
        <RoomId roomId={roomId} />
      </div>
    </div>
  );
}

export default Header;
