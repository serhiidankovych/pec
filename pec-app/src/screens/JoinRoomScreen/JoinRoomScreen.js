import React, { useEffect, useState } from "react";
import "./JoinRoomScreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../../redux/actions";
import { getRoomExists } from "../../api";
import joinScreenVideo from "../../pictures/join-screen-video.png";
import ExtraButton from "../../shared/ExtraButton/ExtraButton";
const JoinRoomScreen = ({ handlerisJoinRoomScreen, handlerisRoomScreen }) => {
  const dispatch = useDispatch();

  const isRoomHost = useSelector((state) => state.isRoomHost);
  const connectOnlyWithAudio = useSelector(
    (state) => state.connectOnlyWithAudio
  );

  const [name, setName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAudioOnly = (e) => {
    dispatch(setConnectOnlyWithAudio(true));
  };

  const handleJoinRoom = () => {
    dispatch(setIdentity(name));
    if (isRoomHost) createRoom();
    else joinRoom();
  };

  const joinRoom = async () => {
    try {
      console.log("RoomId: ", roomId);
      const { data } = await getRoomExists(roomId);
      const { roomExists, full } = data;
      console.log("dispatch roomid" + roomExists);
      if (roomExists) {
        if (full) {
          setErrorMsg("Meeting is full! Please try again later.");
        } else {
          //join a room
          dispatch(setRoomId(roomId));
          handlerisJoinRoomScreen();
          handlerisRoomScreen();
        }
      } else {
        setErrorMsg("Meeting not found! Please check your meeting id");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMsg(error.message);
    }
  };

  const createRoom = () => {
    console.log("Room created");
    handlerisJoinRoomScreen();
    handlerisRoomScreen();
  };

  return (
    <div className={"join-screen"}>
      <div className={"join-container"}>
        <div className={"banner"}>
          <img
            alt="join-image"
            className="join-image"
            src={joinScreenVideo}
          ></img>
        </div>
        <div className={"contentPanelConatiner"}>
          <div className={"contentPanel"}>
            <h1 className={"title"}>You {isRoomHost ? `host` : `join`} room</h1>
            <div className={"inputsContainer"}>
              <input
                className="join-input"
                value={name}
                placeholder="Enter your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              {!isRoomHost && (
                <input
                  className="join-input"
                  value={roomId}
                  placeholder="Enter the meeting id"
                  type="text"
                  onChange={(e) => setRoomID(e.target.value)}
                />
              )}
              {/* <div className={"audioOnlyCheck"}>
                <input
                  type="checkbox"
                  name="audioOnly"
                  checked={connectOnlyWithAudio}
                  onChange={(e) => handleAudioOnly(e)}
                />
                <label htmlFor="audioOnly">Join with audio only</label>
              </div> */}
              {/* </div> */}
              <div className={"errMsgContainer"}>
                {errorMsg !== "" && <p className={"errMsg"}>{errorMsg}</p>}
              </div>
              <ExtraButton title=" Join" func={handleJoinRoom} />
              {/* <button onClick={() => handleJoinRoom()} className={"joinBtn"}>
                Join
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomScreen;
