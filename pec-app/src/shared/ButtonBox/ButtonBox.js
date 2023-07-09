import React from "react";
import "./ButtonBox.css";
function ButtonBox({ title, color, func }) {
  return (
    <div
      className="button-box"
      style={{ backgroundColor: color }}
      onClick={() => func()}
    >
      {title}
    </div>
  );
}

export default ButtonBox;
