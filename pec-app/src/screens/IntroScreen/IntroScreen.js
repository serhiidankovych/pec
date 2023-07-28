import React from "react";
import "./IntroScreen.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setIsRoomHost } from "../../redux/actions";
import ExtraButton from "../../shared/ExtraButton/ExtraButton";
import introScreenVideo from "../../pictures/intro-screen-video.png";

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
    <div className="intro-screen">
      <div className="intro-container">
        <img
          alt="intro-image"
          className="intro-image"
          src={introScreenVideo}
        ></img>
        <div className="intro-buttons">
          <ExtraButton title="Join a room" func={joinMeetHandler} />
          <div>or</div>
          <ExtraButton title="Host a room" func={hostMeetHandler} />
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
