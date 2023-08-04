import React from "react";
import "./IntroScreen.css";

import { useDispatch } from "react-redux";
import { setIsRoomHost } from "../../redux/actions";
import ExtraButton from "../../shared/ExtraButton/ExtraButton";
import introScreenVideo from "../../pictures/intro-screen-video.png";
import { PiXBold } from "react-icons/pi";

const IntroScreen = ({ handlerIsJoinRoomScreen, handlerisIntroScreen }) => {
  const dispatch = useDispatch();

  const joinMeetHandler = () => {
    dispatch(setIsRoomHost(false));
    handlerIsJoinRoomScreen();
    handlerisIntroScreen();
  };
  const hostMeetHandler = () => {
    dispatch(setIsRoomHost(true));
    handlerIsJoinRoomScreen();
    handlerisIntroScreen();
  };

  return (
    <div className="intro-screen">
      <div className="intro-container">
        <div onClick={() => handlerisIntroScreen()}>
          <PiXBold />
        </div>
        <div className="intro-content">
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
    </div>
  );
};

export default IntroScreen;
