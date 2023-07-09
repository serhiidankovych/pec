import React from "react";
import "./ExtraButton.css";
function ExtraButton({ title, func }) {
  return (
    <button className="extra-button" onClick={() => func()}>
      {title}
    </button>
  );
}

export default ExtraButton;
