import React from "react";
import { motion } from "framer-motion";

const ConnectingBtn = ({
  btnText = "",
  clickHandler = () => {},
  isCreateRoom = false,
  btnClassName,
  nthChild = 1,
}) => {
  return (
    <motion.button
      exit={{
        opacity: 0,
        y: "75%",
        transition: {
          ease: "linear",
          duration: 0.15,
        },
      }}
      className={btnClassName}
      onClick={clickHandler}
    >
      {btnText}
    </motion.button>
  );
};

export default ConnectingBtn;
