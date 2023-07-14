import React from "react";
import "./BackButton.css";
import { PiArrowLeftBold } from "react-icons/pi";
function BackButton({ func }) {
  return (
    <div className="back-button" onClick={func}>
      <PiArrowLeftBold />
    </div>
  );
}

export default BackButton;
