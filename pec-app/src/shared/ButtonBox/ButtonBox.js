import React from "react";
import "./ButtonBox.css";
import { motion } from "framer-motion";
function ButtonBox({ focusBtn, defaultBtn, color, func }) {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <motion.button
      className="button-box"
      style={{ backgroundColor: color }}
      onClick={() => func()}
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isHovered ? focusBtn : defaultBtn}
    </motion.button>
  );
}

export default ButtonBox;
