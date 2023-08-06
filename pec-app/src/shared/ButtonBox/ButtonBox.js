import React from "react";
import "./ButtonBox.css";
import { motion } from "framer-motion";
function ButtonBox({
  focusButton,
  defaultButton,
  color,
  func,
  disabled,
  title,
}) {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <motion.div
      className="button-box-title"
      whileTap={{ borderRadius: "70px" }}
      onClick={() => func()}
      // whileHover={{
      //   borderRadius: "25px",
      //   backgroundColor: "rgb(232, 238, 251)",
      //   color: "#000000",
      //   border: "3px solid #b1c1e0",
      // }}
    >
      <div
        disabled={disabled}
        className="button-box"
        style={{ backgroundColor: color }}
        animate={isHovered ? "hover" : "initial"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isHovered ? focusButton : defaultButton}
      </div>
      <div>{title}</div>
    </motion.div>
  );
}

export default ButtonBox;
