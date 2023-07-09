import React from "react";
import "./MainButton.css";
function MainButton({ title, func }) {
  return (
    <button className="main-button" onClick={() => func()}>
      {title}
    </button>
  );
}

export default MainButton;
