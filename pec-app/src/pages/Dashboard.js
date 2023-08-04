import React, { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../socketConfig.js";
import { ToastContainer, toast } from "react-toastify";

import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AppCard from "../shared/AppCard/AppCard";
import BackButton from "../shared/BackButton/BackButton";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import JoinRoomScreen from "../screens/JoinRoomScreen/JoinRoomScreen";
import RoomScreen from "../screens/RoomScreen/RoomScreen";
import OnlyRoomScreen from "../screens/OnlyRoomScreen/OnlyRoomScreen.js";
import SoundsPanel from "../components/SoundsPanel/SoundsPanel.js";

import soonCover from "../pictures/soon-cover.png";
import whiteboardCover from "../pictures/whiteboard-cover.png";
import dashboardImage from "../pictures/dashboard-splash.png";

import Whiteboard from "../mini-apps/Whiteboard/Whiteboard";

function Dashboard() {
  const [isMiniApps, setIsMiniApps] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("");
  const [isIntroScreen, setIsIntroScreen] = useState(false);
  const [isJoinRoomScreen, setIsJoinRoomScreen] = useState(false);
  const [isRoomScreen, setIsRoomScreen] = useState(false);
  const [isRoomOnlyRoom, setIsOnlyRoomScreen] = useState(false);
  const [isSoundsPanel, setIsSoundsPanel] = useState(false);

  const roomId = useSelector((state) => state.roomId);
  const isRoomExist = useSelector((state) => state.isRoomExist);

  const componentMappings = {
    Whiteboard: Whiteboard,
  };

  const toggleState = (setter) => {
    setter((element) => !element);
  };

  const handleSwitchMiniApps = (event, miniAppName) => {
    setIsMiniApps(true);
    setCurrentComponent(miniAppName);
    console.log("mini app " + miniAppName);
  };

  const handleReturnToDashboard = () => {
    setIsMiniApps(false);
    console.log("Return To Dashboard");
  };

  const handleRoomIsNotCreated = () => {
    toast("Host or join room first", {
      position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-message",
      autoClose: 1000,
    });
    console.log("RoomIsNotCreated");
    toggleState(setIsIntroScreen);
  };

  const handleCopyClick = async () => {
    if (roomId) {
      try {
        await navigator.clipboard.writeText(roomId);
        console.log("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const ComponentToRender = componentMappings[currentComponent];

  return (
    <>
      <ToastContainer />
      <div className="dashboard">
        {isIntroScreen && (
          <IntroScreen
            handlerIsJoinRoomScreen={() => toggleState(setIsJoinRoomScreen)}
            handlerisIntroScreen={() => toggleState(setIsIntroScreen)}
          />
        )}
        {isJoinRoomScreen && (
          <JoinRoomScreen
            handlerIsJoinRoomScreen={() => toggleState(setIsJoinRoomScreen)}
            handlerIsRoomScreen={() => toggleState(setIsRoomScreen)}
            handleIsOnlyRoomScreen={() => toggleState(setIsOnlyRoomScreen)}
          />
        )}
        {isRoomScreen && <RoomScreen />}
        {isRoomOnlyRoom && <OnlyRoomScreen />}
        <Header />
        <div className="dashboard-container">
          <Sidebar
            handlerisIntroScreen={() => toggleState(setIsIntroScreen)}
            handleCopyClick={handleCopyClick}
            isRoomExist={isRoomExist}
            handlerisSoundsPanel={() => toggleState(setIsSoundsPanel)}
          />
          {isMiniApps ? (
            <div className="mini-app-and-back-button">
              <BackButton func={handleReturnToDashboard} />
              <ComponentToRender socket={socket} roomId={roomId} />
            </div>
          ) : (
            <div className="app-wrapper">
              <div className="dashboard-title-and-image">
                <h1 className="dashboard-title">Choose an activity</h1>
                <img
                  className="dashboard-title-image"
                  src={dashboardImage}
                  alt="Dashboard"
                />
              </div>

              <div className="dashboard-apps">
                <AppCard
                  appImage={whiteboardCover}
                  title="Whiteboard"
                  defenition="for drawing together"
                  func={(event) => {
                    isRoomExist
                      ? handleSwitchMiniApps(event, "Whiteboard")
                      : handleRoomIsNotCreated();
                  }}
                />
                <AppCard
                  appImage={soonCover}
                  title="Explain & Draw"
                  defenition="find out how good you could explain image to your friends"
                  func={(event) => {
                    isRoomExist
                      ? handleSwitchMiniApps(event, "Whiteboard")
                      : handleRoomIsNotCreated();
                  }}
                />
                <AppCard
                  appImage={soonCover}
                  title="Lyrics remover"
                  defenition="exercise with your favorite songs"
                  func={(event) => {
                    isRoomExist
                      ? handleSwitchMiniApps(event, "Whiteboard")
                      : handleRoomIsNotCreated();
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {isSoundsPanel && (
          <SoundsPanel
            setIsSoundsPanel={setIsSoundsPanel}
            socket={socket}
            roomId={roomId}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
