import React, { useEffect, useState } from "react";
import "./JoinRoomScreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setIsRoomExist,
  setRoomId,
} from "../../redux/actions";
import { getRoomExists } from "../../api";
import joinScreenVideo from "../../pictures/join-screen-video.png";
import ExtraButton from "../../shared/ExtraButton/ExtraButton";
import { PiXBold } from "react-icons/pi";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinRoomScreen = ({ handlerisJoinRoomScreen, handlerisRoomScreen }) => {
  const dispatch = useDispatch();

  const isRoomHost = useSelector((state) => state.isRoomHost);

  const connectOnlyWithAudio = useSelector(
    (state) => state.connectOnlyWithAudio
  );

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  const [name, setName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAudioOnly = (e) => {
    dispatch(setConnectOnlyWithAudio(true));
  };

  const handleJoinRoom = () => {
    if (name.length == 0) {
      dispatch(setIdentity(randomName));
      showToast("We generated it name you", randomName);
    } else {
      dispatch(setIdentity(name));
    }
    if (isRoomHost) createRoom();
    else joinRoom();
  };

  const joinRoom = async () => {
    if (roomId.length == 0) {
      showToast("Room ID is missed", "");
    } else {
      try {
        console.log("RoomId: ", roomId);
        const { data } = await getRoomExists(roomId);
        const { roomExists, full } = data;
        console.log("dispatch roomid" + roomExists);

        if (roomExists) {
          if (full) {
            showToast("Meeting is full! Please try again later.", "");
            setErrorMsg("Meeting is full! Please try again later.");
          } else {
            //join a room
            dispatch(setRoomId(roomId));
            handlerisJoinRoomScreen();
            handlerisRoomScreen();
            dispatch(setIsRoomExist(true));
          }
        } else {
          showToast("Meeting not found! Please check your meeting id", "");
          setErrorMsg("Meeting not found! Please check your meeting id");
        }
      } catch (error) {
        console.log("Error: ", error);
        showToast("Error: ", error.message);
        setErrorMsg(error.message);
      }
    }
  };

  const createRoom = () => {
    console.log("Room created");
    handlerisJoinRoomScreen();
    handlerisRoomScreen();
    dispatch(setIsRoomExist(true));
  };

  const handleCloseHostOrCreateRoom = () => {
    dispatch(setIsRoomHost(false));
    handlerisJoinRoomScreen();
  };
  const showToast = (text, randomName) => {
    toast(`${text} ${randomName}`, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className={"join-screen"}>
        <div className={"join-container"}>
          <div onClick={() => handleCloseHostOrCreateRoom()}>
            <PiXBold />
          </div>
          <div className="join-content">
            <div className={"banner"}>
              <img
                alt="join-image"
                className="join-image"
                src={joinScreenVideo}
              ></img>
            </div>
            <div className={"contentPanelConatiner"}>
              <div className={"contentPanel"}>
                <h1 className={"title"}>
                  You {isRoomHost ? `host` : `join`} room
                </h1>
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
                  <div className={"audioOnlyCheck"}>
                    <input
                      type="checkbox"
                      name="audioOnly"
                      checked={connectOnlyWithAudio}
                      onChange={(e) => handleAudioOnly(e)}
                    />
                    <label htmlFor="audioOnly">Join with audio only</label>
                  </div>

                  <div className={"errMsgContainer"}>
                    {errorMsg !== "" && <p className={"errMsg"}>{errorMsg}</p>}
                  </div>
                  <ExtraButton title=" Join" func={handleJoinRoom} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinRoomScreen;
