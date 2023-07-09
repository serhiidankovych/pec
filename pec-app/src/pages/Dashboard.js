import React from "react";
import "./Dashboard.css";
import socketIO from "socket.io-client";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AppCard from "../shared/AppCard/AppCard";
import appImage from "../pictures/template.png";
import Footer from "../components/Footer/Footer";
import dashboardImage from "../pictures/dashboard-splash.png";
import Whiteboard from "../mini-apps/Whiteboard/Whiteboard";

function Dashboard() {
  const [isMiniApps, setIsMiniApps] = React.useState(true);
  const [currentComponent, setCurrentComponent] = React.useState("");
  const socket = socketIO.connect("http://localhost:5001");
  const componentMappings = {
    Whiteboard: Whiteboard,
  };

  const hangleSwitchMiniApps = (miniAppName) => {
    setIsMiniApps(true);
    setCurrentComponent(miniAppName);
  };

  const ComponentToRender = componentMappings[currentComponent];
  return (
    <>
      <div className="dashboard ">
        <Header />
        <div className="dashboard-container">
          <Sidebar />
          {isMiniApps ? (
            <Whiteboard socket={socket} />
          ) : (
            <div className="app-wrapper">
              <div className="dashboard-title-and-image">
                <h1 className="dashboard-title">Choose activity</h1>
                <img className="dashboard-title-image " src={dashboardImage} />
              </div>
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
              <AppCard
                appImage={appImage}
                title="Whiteboard"
                defenition="for drawing together"
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
