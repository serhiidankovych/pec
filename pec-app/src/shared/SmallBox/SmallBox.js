import React from "react";
import "./SmallBox.css";
import ExtraButton from "../ExtraButton/ExtraButton";
function SmallBox({ colNum, title, image, func, color, extraImage }) {
  return (
    <div
      className="lending-small-box"
      style={{ gridColumnStart: colNum, backgroundColor: color }}
    >
      <div className="small-box-title-and-image">
        <div className="small-box-title-and-extra-image">
          <div className="small-box-title">{title}</div>
          <img className="small-box-extra-image" src={extraImage}></img>
        </div>

        <img className="small-box-image" src={image}></img>
      </div>

      <ExtraButton title="Start your trip" />
    </div>
  );
}

export default SmallBox;
