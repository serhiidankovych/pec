import React from "react";
import { socket } from "../socketConfig.js";
import "./Dashboard.css";

import UserContext from "../context/UserContext.js";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AppCard from "../shared/AppCard/AppCard";
import appImage from "../pictures/template.png";
import Footer from "../components/Footer/Footer";
import dashboardImage from "../pictures/dashboard-splash.png";
import Whiteboard from "../mini-apps/Whiteboard/Whiteboard";
import BackButton from "../shared/BackButton/BackButton";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import JoinRoomScreen from "../screens/JoinRoomScreen/JoinRoomScreen";
import RoomScreen from "../screens/RoomScreen/RoomScreen";

function Dashboard() {
  const [isMiniApps, setIsMiniApps] = React.useState(false);
  const [currentComponent, setCurrentComponent] = React.useState("");

  const [isIntroScreen, setIsIntroScreen] = React.useState(false);
  const [isJoinRoomScreen, setIsJoinRoomScreen] = React.useState(false);
  const [isRoomScreen, setIsRoomScreen] = React.useState(false);

  const handlerisIntroScreen = () => {
    setIsIntroScreen((element) => !element);
    console.log("element");
  };

  const handlerisJoinRoomScreen = () => {
    setIsJoinRoomScreen((element) => !element);
    console.log("element");
  };
  const handlerisRoomScreen = () => {
    setIsRoomScreen((element) => !element);
    console.log("element");
  };

  const componentMappings = {
    Whiteboard: Whiteboard,
  };

  const handleSwitchMiniApps = (event, miniAppName) => {
    setIsMiniApps(true);
    setCurrentComponent(miniAppName);
    console.log("mini app " + miniAppName);
  };
  // const handleSwitchMiniApps = (miniAppName) => {
  //   return () => {
  //     setIsMiniApps(true);
  //     setCurrentComponent(miniAppName);
  //     console.log("mini app " + miniAppName);
  //   };
  // };

  const handleReturnToDashboard = () => {
    setIsMiniApps(false);
    console.log("Return To Dashboard");
  };

  const ComponentToRender = componentMappings[currentComponent];

  return (
    <>
      <div className="dashboard ">
        {isIntroScreen && (
          <IntroScreen
            handlerisJoinRoomScreen={handlerisJoinRoomScreen}
            handlerisIntroScreen={handlerisIntroScreen}
          />
        )}
        {isJoinRoomScreen && (
          <JoinRoomScreen
            handlerisJoinRoomScreen={handlerisJoinRoomScreen}
            handlerisRoomScreen={handlerisRoomScreen}
          />
        )}
        {isRoomScreen && <RoomScreen />}
        <Header />
        <div className="dashboard-container">
          <Sidebar handlerisIntroScreen={handlerisIntroScreen} />
          {isMiniApps ? (
            <div className="mini-app-and-back-button">
              <BackButton func={handleReturnToDashboard} />
              {/* <ComponentToRender socket={socket} /> */}
              {/* <VideoRoom socket={socket} /> */}
            </div>
          ) : (
            <div className="app-wrapper">
              <div className="dashboard-title-and-image">
                <h1 className="dashboard-title">Choose activity</h1>
                <img className="dashboard-title-image" src={dashboardImage} />
              </div>
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
                func={(event) => handleSwitchMiniApps(event, "Whiteboard")}
              />
              {/* Other AppCard components */}
            </div>
          )}

          {/* <button onClick={handlerisIntroScreen}>handlerisIntroScreen</button>
          <button onClick={handlerisJoinRoomScreen}>
            handlerisJoinRoomScreen
          </button>
          <button onClick={handlerisRoomScreen}>isRoomScreen</button> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
