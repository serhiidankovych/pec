import React from "react";
import "./SmallBox.css";
import ExtraButton from "../ExtraButton/ExtraButton";
import { motion } from "framer-motion";
function SmallBox({ colNum, title, image, func, color, extraImage }) {
  return (
    <motion.div
      className="lending-small-box"
      style={{ gridColumnStart: colNum, backgroundColor: color }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8, rotate: -90, borderRadius: "70px" }}
    >
      <div className="small-box-title-and-image">
        <div className="small-box-title-and-extra-image">
          <div className="small-box-title">{title}</div>
          <img className="small-box-extra-image" src={extraImage}></img>
        </div>

        <img className="small-box-image" src={image}></img>
      </div>

      <ExtraButton title="Start your trip" />
    </motion.div>
  );
}

export default SmallBox;
