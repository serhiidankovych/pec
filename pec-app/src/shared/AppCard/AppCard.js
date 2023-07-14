import React from "react";
import "./AppCard.css";
import ExtraButton from "../ExtraButton/ExtraButton";

function AppCard({ appImage, title, defenition, func }) {
  return (
    <div className="app-card" onClick={func}>
      <img className="app-image" src={appImage} />
      <div className="title-and-defenition">
        <div className="title">{title}</div>
        <div className="defenition">{defenition}</div>
      </div>
      {/* <ExtraButton /> */}
    </div>
  );
}

export default AppCard;
