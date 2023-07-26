import React, { useEffect, useState } from "react";
import styles from "./JoinRoomScreen.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../../redux/actions";
import { getRoomExists } from "../../api";
import { motion } from "framer-motion";

const JoinRoomScreen = ({ handlerisJoinRoomScreen, handlerisRoomScreen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRoomHost, connectOnlyWithAudio } = useSelector((st) => ({
    isRoomHost: st.isRoomHost,
    connectOnlyWithAudio: st.connectOnlyWithAudio,
  }));

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
          // navigate("/room", { replace: true });
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
    console.log("room created");
    handlerisJoinRoomScreen();
    handlerisRoomScreen();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.banner}>
        <motion.h1 className={styles.logo}>Baat Chit</motion.h1>
        <motion.p className={styles.slogan}>
          Stay connected with all your friends and family with Baat Chit.
        </motion.p>
      </div>
      <div className={styles.contentPanelConatiner}>
        <div className={styles.contentPanel}>
          <h1 className={styles.title}>
            {isRoomHost ? `Host` : `Join`} meeting
          </h1>
          <div className={styles.inputsContainer}>
            <input
              className={styles.textField}
              value={name}
              placeholder="Enter your name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            {!isRoomHost && (
              <input
                className={styles.textField}
                value={roomId}
                placeholder="Enter the meeting id"
                type="text"
                onChange={(e) => setRoomID(e.target.value)}
              />
            )}
            <div className={styles.audioOnlyCheck}>
              <input
                type="checkbox"
                name="audioOnly"
                checked={connectOnlyWithAudio}
                onChange={(e) => handleAudioOnly(e)}
              />
              <label htmlFor="audioOnly">Join with audio only</label>
            </div>
          </div>
          <div className={styles.errMsgContainer}>
            {errorMsg !== "" && <p className={styles.errMsg}>{errorMsg}</p>}
          </div>
          <div className={styles.btnsContainer}>
            <button onClick={handleJoinRoom} className={styles.joinBtn}>
              Join
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomScreen;
