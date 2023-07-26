import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectingBtn from "../../components/buttons/ConnectingBtn";
import styles from "./IntroScreen.module.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setIsRoomHost } from "../../redux/actions";

const IntroScreen = ({ handlerisJoinRoomScreen, handlerisIntroScreen }) => {
  const dispatch = useDispatch();

  const joinMeetHandler = () => {
    dispatch(setIsRoomHost(false));
    handlerisJoinRoomScreen();
    handlerisIntroScreen();
  };
  const hostMeetHandler = () => {
    dispatch(setIsRoomHost(true));
    handlerisJoinRoomScreen();
    handlerisIntroScreen();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentPanel}>
        <motion.h1 className={styles.logo}>Baat Chit</motion.h1>
        <div className={styles.btnsContainer}>
          <ConnectingBtn
            btnText="Join a meeting"
            clickHandler={joinMeetHandler}
            btnClassName={styles.joinMeetBtn}
            nthChild={1}
          />
          <ConnectingBtn
            isCreateRoom={true}
            btnText="Host a meeting"
            clickHandler={hostMeetHandler}
            btnClassName={styles.hostMeetBtn}
            nthChild={2}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
