import React from "react";
import "./ButtonBox.css";
import { motion } from "framer-motion";
function ButtonBox({ focusButton, defaultButton, color, func, disabled }) {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <motion.button
      disabled={disabled}
      className="button-box"
      style={{ backgroundColor: color }}
      onClick={() => func()}
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ borderRadius: "70px" }}
    >
      {isHovered ? focusButton : defaultButton}
    </motion.button>
  );
}

export default ButtonBox;
