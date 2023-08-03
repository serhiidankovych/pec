import React from "react";

import "./SoundButtom.css";

import { motion } from "framer-motion";

function SoundButtom({ func, soundTitle, soundImage, soundEmoji }) {
  const buttonVariants = {
    initial: {
      scale: 1,
      // boxShadow: "10px 10px 0px 0px #000",
      // y: 0,
    },
    hover: {
      scale: 1.05,
      // boxShadow: "1px 2px 0px 0px #000",
      // y: 5,
    },
    tap: {
      scale: 0.9,
    },
  };
  return (
    <motion.div
      className="sound-button"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={() => func()}
    >
      {soundImage && (
        <img className="sound-image" src={soundImage} alt={soundTitle}></img>
      )}
      {soundEmoji && <div className="sound-emoji">{soundEmoji}</div>}
      <div>{soundTitle}</div>
    </motion.div>
  );
}

export default SoundButtom;
