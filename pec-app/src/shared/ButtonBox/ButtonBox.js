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
  showToast,
}) {
  const [isHovered, setHovered] = React.useState(false);

  const handleFunc = () => {
    if (disabled) {
      showToast("You can not", title + " while existing room");
    } else {
      func();
    }
  };

  return (
    <motion.div
      className="button-box-title"
      initial={{ padding: "8px", borderRadius: "15px" }}
      whileTap={{ borderRadius: "70px" }}
      onClick={handleFunc}
      disabled={disabled}
      whileHover={{
        borderRadius: "25px",
        backgroundColor: "#fbec4f",
        color: "#000000",
        border: "3px solid #b1c1e0",
        padding: "8px",
      }}
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="button-box" style={{ backgroundColor: color }}>
        {isHovered ? focusButton : defaultButton}
      </div>
      <div>{title}</div>
    </motion.div>
  );
}

export default ButtonBox;
