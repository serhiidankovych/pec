import React from "react";
import "./Header.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
import RoomId from "../../shared/RoomId/RoomId";
import { v4 as uuid } from "uuid";
function Header() {
  const unique_id = uuid();

  const [roomCode, setRoomCode] = React.useState(unique_id);
  return (
    <div className="header">
      <div className="logo">
        {/* <ButtonBox title="pec" color="#4F75FB" funct={sayHello} /> */}
        {/* <div>PEC</div> */}
        <RoomId setRoomCode={setRoomCode} roomCode={roomCode} />
      </div>
    </div>
  );
}

export default Header;
