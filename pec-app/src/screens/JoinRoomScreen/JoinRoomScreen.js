import React, { useState } from "react";
import "./JoinRoomScreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setIsRoomExist,
  setRoomId,
  setConnectOnlyRoom,
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
  const connectOnlyWithAudio = useSelector(
    (state) => state.connectOnlyWithAudio
  );
  const connectOnlyRoom = useSelector((state) => state.connectOnlyRoom);

  const [name, setName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [isHandleJoinRoom, setIsHandleJoinRoom] = useState(false);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  const handleAudioOnly = () => {
    dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
  };
  const handleOnlyRoom = () => {
    dispatch(setConnectOnlyRoom(!connectOnlyRoom));
  };

  const handleJoinRoom = () => {
    let identity = name;

    if (name.length > 0) {
      if (name.length > 15) {
        showToast("⚠️", "Name is too long");
        setErrorMsg("⚠️ Name is too long, up to 15 characters.");
        return; // Exit early if name is too long
      }
    } else {
      showToast("We generate a name for you:", randomName);
      identity = randomName;
      setName(identity);
    }

    dispatch(setIdentity(identity));

    if (isRoomHost) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  const handleContinueJoin = () => {
    dispatch(setRoomId(roomId));
    handlerIsJoinRoomScreen();

    if (!connectOnlyRoom) {
      handleIsOnlyRoomScreen();
    } else {
      handlerIsRoomScreen();
    }

    dispatch(setIsRoomExist(true));
  };

  const joinRoom = async () => {
    if (roomId.length === 0) {
      showToast("Room ID is missing", "");
      return;
    }

    if (roomId.length < 36) {
      showToast("Room ID has invalid format", "");
      return;
    }

    try {
      const { data } = await getRoomExists(roomId);
      const { roomExists, full, roomType } = data;

      if (
        (roomType === "roomOnly" && !connectOnlyRoom) ||
        (roomType === "roomAudioVideo" && connectOnlyRoom)
      ) {
        showToast(
          "⚠️",
          `Host created room ${
            connectOnlyRoom ? "with" : "without"
          } video and audio`
        );
        setErrorMsg(
          `⚠️ Host created room ${connectOnlyRoom ? "with" : "without"} video`
        );
        setIsContinue(true);
      } else {
        if (roomExists) {
          if (full) {
            showToast("⚠️", "Meeting is full!");
            setErrorMsg("⚠️ Meeting is full! Please try again later.");
          } else {
            dispatch(setRoomId(roomId));
            handlerIsJoinRoomScreen();

            if (connectOnlyRoom) {
              handleIsOnlyRoomScreen();
            } else {
              handlerIsRoomScreen();
            }

            dispatch(setIsRoomExist(true));
          }
        } else {
          showToast("⚠️", "Meeting not found!");
          setErrorMsg("⚠️ Meeting not found! Please check your meeting ID.");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      showToast("Error: ", error.message);
      setErrorMsg(error.message);
    }
  };

  const createRoom = () => {
    console.log("Room created");
    handlerIsJoinRoomScreen();
    if (connectOnlyRoom) {
      handleIsOnlyRoomScreen();
    } else {
      handlerIsRoomScreen();
    }
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
                  {!isContinue && (
                    <div>
                      <div className="audioOnlyCheck">
                        <input
                          type="checkbox"
                          name="audioOnly"
                          checked={connectOnlyWithAudio}
                          onChange={handleAudioOnly}
                        />
                        <label htmlFor="audioOnly">join with audio only</label>
                      </div>
                      <div className="audioOnlyCheck">
                        <input
                          type="checkbox"
                          name="roomOnly"
                          checked={connectOnlyRoom}
                          onChange={handleOnlyRoom}
                        />
                        <label htmlFor="roomOnly">
                          join without audio and video
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="errMsgContainer">
                    {errorMsg !== "" && <p className="errMsg">{errorMsg}</p>}
                  </div>
                  {isContinue ? (
                    <div className="join-continue">
                      <div>Do you want to join?</div>
                      <div className="join-continue-buttons">
                        <ExtraButton
                          title="No"
                          func={handleCloseHostOrCreateRoom}
                          style={{ width: "87px" }}
                        />
                        <ExtraButton
                          title="Yes "
                          func={handleContinueJoin}
                          style={{ width: "87px" }}
                        />
                      </div>
                    </div>
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
