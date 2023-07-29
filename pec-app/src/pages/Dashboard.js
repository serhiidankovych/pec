import React from "react";
import { socket } from "../socketConfig.js";
import "./Dashboard.css";

import UserContext from "../context/UserContext.js";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AppCard from "../shared/AppCard/AppCard";
import templateCover from "../pictures/template-cover.png";
import soonCover from "../pictures/soon-cover.png";
import whiteboardCover from "../pictures/whiteboard-cover.png";

import dashboardImage from "../pictures/dashboard-splash.png";
import Whiteboard from "../mini-apps/Whiteboard/Whiteboard";
import BackButton from "../shared/BackButton/BackButton";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import JoinRoomScreen from "../screens/JoinRoomScreen/JoinRoomScreen";
import RoomScreen from "../screens/RoomScreen/RoomScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SoudsPanel from "../components/SoundsPanel/SoudsPanel.js";

function Dashboard() {
  const [isMiniApps, setIsMiniApps] = React.useState(false);
  const [currentComponent, setCurrentComponent] = React.useState("");
  const [isIntroScreen, setIsIntroScreen] = React.useState(false);
  const [isJoinRoomScreen, setIsJoinRoomScreen] = React.useState(false);
  const [isRoomScreen, setIsRoomScreen] = React.useState(false);

  const roomId = useSelector((state) => state.roomId);
  const isRoomExist = useSelector((state) => state.isRoomExist);

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

  const handleReturnToDashboard = () => {
    setIsMiniApps(false);
    console.log("Return To Dashboard");
  };
  const handleRoomIsNotCreated = () => {
    toast("Host or join rooom first", {
      position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-message",
      autoClose: 1000,
    });
    console.log("RoomIsNotCreated");

    handlerisIntroScreen();
  };

  const handleCopyClick = async () => {
    if (roomId) {
      try {
        await navigator.clipboard.writeText(roomId);
        // Optional: Show a message indicating successful copy
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
      <div className="dashboard ">
        <SoudsPanel />
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
          <Sidebar
            handlerisIntroScreen={handlerisIntroScreen}
            handleCopyClick={handleCopyClick}
            isRoomExist={isRoomExist}
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
                <img className="dashboard-title-image" src={dashboardImage} />
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
                  title="Lyrics remover "
                  defenition="exersice with your fav songs"
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
      </div>
    </>
  );
}

export default Dashboard;
