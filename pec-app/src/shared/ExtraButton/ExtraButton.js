import React from "react";
import "./ExtraButton.css";
import { motion } from "framer-motion";
function ExtraButton({ title, func }) {
  return (
    <motion.button
      className="extra-button"
      onClick={() => func()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
    >
      {title}
    </motion.button>
  );
}

export default ExtraButton;
