import React from "react";
import "./Dashboard.css";
import socketIO from "socket.io-client";
import UserContext from "../UserContext";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AppCard from "../shared/AppCard/AppCard";
import appImage from "../pictures/template.png";
import Footer from "../components/Footer/Footer";
import dashboardImage from "../pictures/dashboard-splash.png";
import Whiteboard from "../mini-apps/Whiteboard/Whiteboard";
import BackButton from "../shared/BackButton/BackButton";
import VideoCall from "../VideoCall/VideCall";

function Dashboard() {
  const [isMiniApps, setIsMiniApps] = React.useState(false);
  const [currentComponent, setCurrentComponent] = React.useState("");
  const socket = socketIO.connect("http://localhost:5000");
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
        <Header />
        <div className="dashboard-container">
          <Sidebar />
          {isMiniApps ? (
            <div className="mini-app-and-back-button">
              <BackButton func={handleReturnToDashboard} />
              {/* <ComponentToRender socket={socket} /> */}
              <VideoCall socket={socket} />
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
