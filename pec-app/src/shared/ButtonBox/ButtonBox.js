import React from "react";
import "./ButtonBox.css";
import { motion } from "framer-motion";
function ButtonBox({ focusBtn, defaultBtn, color, func, disabled }) {
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
      {isHovered ? focusBtn : defaultBtn}
    </motion.button>
  );
}

export default ButtonBox;
