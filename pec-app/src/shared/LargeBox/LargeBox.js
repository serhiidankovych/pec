import React from "react";
import MainButton from "../MainButton/MainButton";
import "./LargeBox.css";

function LargeBox({ image, imageDecoration }) {
  return (
    <>
      <div className="lending-large-box">
        <div className="lending-titles-and-image">
          <div className="lending-titles">
            <div className="lending-main-title">
              Fun supported area for learning English
            </div>
            <div className="lending-extra-title">with co-learn experience</div>
            <MainButton
              title={"Try it out"}
              // func={}
            />
          </div>
          {/* <img className="image-decoration" src={imageDecoration} /> */}
          {/* <div className="circle-decoration-pink"></div>
          <div className="circle-decoration-yellow"></div>  */}
          <img className="lending-image" src={image} />
        </div>
      </div>
    </>
  );
}

export default LargeBox;