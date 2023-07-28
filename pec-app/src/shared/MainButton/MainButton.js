import React from "react";
import "./MainButton.css";
import { motion } from "framer-motion";
function MainButton({ title, func }) {
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "10px 10px 0px 0px #000",
      y: 0,
    },
    hover: {
      scale: 1.1,
      boxShadow: "1px 2px 0px 0px #000",
      y: 5,
    },
    tap: {
      scale: 0.9,
    },
  };
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="main-button"
      onClick={() => func()}
    >
      Try it
    </motion.button>
  );
}
// <button className="main-button" onClick={() => func()}>
//   {title}
// </button>

export default MainButton;
