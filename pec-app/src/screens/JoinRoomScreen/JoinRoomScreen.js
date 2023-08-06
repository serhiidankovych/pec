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
  animals,
} from "unique-names-generator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinRoomScreen = ({
  handlerIsJoinRoomScreen,
  handlerIsRoomScreen,
  handleIsOnlyRoomScreen,
}) => {
  const dispatch = useDispatch();
  const isRoomHost = useSelector((state) => state.isRoomHost);
  const connectOnlyRoom = useSelector((state) => state.connectOnlyRoom);
  const connectOnlyWithAudio = useSelector(
    (state) => state.connectOnlyWithAudio
  );

  const [name, setName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [isHandleJoinRoom, setIsHandleJoinRoom] = useState(false);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  const handleAudioOnly = (e) => {
    dispatch(setConnectOnlyWithAudio(true));
  };

  const handleJoinRoom = () => {
    const identity = name.length > 0 ? name : randomName;
    dispatch(setIdentity(identity));
    if (isRoomHost) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  const handleJoinOnlyRoom = () => {
    const identity = name.length > 0 ? name : randomName;
    dispatch(setIdentity(identity));
    if (isRoomHost) {
      createOnlyRoom();
    } else {
      joinOnlyRoom();
    }
  };

  const joinRoom = async () => {
    if (roomId.length === 0) {
      showToast("Room ID is missed", "");
    } else {
      try {
        const { data } = await getRoomExists(roomId);
        const { roomExists, full, roomType } = data;
        if (roomType === "roomOnly") {
          showToast("Host created room without video and audio", "");
          setIsContinue(true);
          setIsHandleJoinRoom(false);
        } else {
          if (roomExists) {
            if (full) {
              showToast("Meeting is full! Please try again later.", "");
              setErrorMsg("Meeting is full! Please try again later.");
            } else {
              // join a room
              dispatch(setRoomId(roomId));
              handlerIsJoinRoomScreen();
              handlerIsRoomScreen();
              dispatch(setIsRoomExist(true));
            }
          } else {
            showToast("Meeting not found! Please check your meeting id", "");
            setErrorMsg("Meeting not found! Please check your meeting id");
          }
        }
      } catch (error) {
        console.log("Error: ", error);
        showToast("Error: ", error.message);
        setErrorMsg(error.message);
      }
    }
  };

  const joinOnlyRoom = async () => {
    if (roomId.length === 0) {
      showToast("Room ID is missed", "");
    } else {
      try {
        const { data } = await getRoomExists(roomId);
        const { roomExists, full, roomType } = data;
        if (roomType === "roomAudioVideo") {
          showToast("Host created room with video and audio", "");
          setIsContinue(true);
          setIsHandleJoinRoom(false);
        } else {
          if (roomExists) {
            if (full) {
              showToast("Meeting is full! Please try again later.", "");
              setErrorMsg("Meeting is full! Please try again later.");
            } else {
              // join a room
              dispatch(setRoomId(roomId));
              handlerIsJoinRoomScreen();
              handleIsOnlyRoomScreen();
              dispatch(setIsRoomExist(true));
            }
          } else {
            showToast("Meeting not found! Please check your meeting id", "");
            setErrorMsg("Meeting not found! Please check your meeting id");
          }
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
    handlerIsJoinRoomScreen();
    handlerIsRoomScreen();
    dispatch(setIsRoomExist(true));
  };

  const createOnlyRoom = () => {
    console.log("Room only created");
    handlerIsJoinRoomScreen();
    handleIsOnlyRoomScreen();
    dispatch(setIsRoomExist(true));
  };

  const handleCloseHostOrCreateRoom = () => {
    dispatch(setIsRoomHost(false));
    handlerIsJoinRoomScreen();
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
      <div className="join-screen">
        <div className="join-container">
          <div onClick={handleCloseHostOrCreateRoom}>
            <PiXBold />
          </div>
          <div className="join-content">
            <div className="banner">
              <img
                alt="join-image"
                className="join-image"
                src={joinScreenVideo}
              />
            </div>
            <div className="contentPanelConatiner">
              <div className="contentPanel">
                <h1 className="title">
                  You {isRoomHost ? `host` : `join`} room
                </h1>
                <div className="inputsContainer">
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
                  {connectOnlyRoom ? (
                    <div className="audio-video-disabled">
                      ⚠️ You will join without video and audio
                    </div>
                  ) : (
                    <div className="audioOnlyCheck">
                      <input
                        type="checkbox"
                        name="audioOnly"
                        checked={connectOnlyWithAudio}
                        onChange={handleAudioOnly}
                      />
                      <label htmlFor="audioOnly">Join with audio only</label>
                    </div>
                  )}
                  <div className="errMsgContainer">
                    {errorMsg !== "" && <p className="errMsg">{errorMsg}</p>}
                  </div>
                  {isContinue ? (
                    <div>
                      <ExtraButton
                        title="No"
                        func={handleCloseHostOrCreateRoom}
                      />
                      <ExtraButton
                        title="Yes"
                        func={
                          isHandleJoinRoom ? handleJoinRoom : handleJoinOnlyRoom
                        }
                      />
                    </div>
                  ) : connectOnlyRoom ? (
                    <ExtraButton title="Join D" func={handleJoinOnlyRoom} />
                  ) : (
                    <ExtraButton title=" Join " func={handleJoinRoom} />
                  )}
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
