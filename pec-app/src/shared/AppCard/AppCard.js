import React from "react";
import "./AppCard.css";
import ExtraButton from "../ExtraButton/ExtraButton";
import { motion } from "framer-motion";
function AppCard({ appImage, title, defenition, func }) {
  return (
    <motion.div
      className="app-card"
      onClick={func}
      whileHover={{ boxShadow: "rgb(0, 0, 0) 8px 8px 0px 0px" }}
      whileTap={{}}
    >
      <img className="app-image" src={appImage} />
      <div className="title-and-defenition">
        <div className="title">{title}</div>
        <div className="defenition">{defenition}</div>
      </div>
      {/* <ExtraButton /> */}
    </motion.div>
  );
}

export default AppCard;
