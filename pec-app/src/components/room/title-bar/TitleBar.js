import React from "react";
import styles from "./TitleBar.module.css";
import close from "../../../assets/icons/close.svg";
import hamburger from "../../../assets/icons/hamburger.svg";
import { motion } from "framer-motion";

const TitleBar = ({ openSidePanel, setOpenSidePanel }) => {
  return (
    <div className={styles.titleBar}>
      {/* <h1 className={styles.title}>Meeting Title</h1> */}
      <motion.img
        className={styles.sidePanelToggle}
        onClick={() => setOpenSidePanel(!openSidePanel)}
        src={openSidePanel ? close : hamburger}
        alt="spnl-icon"
      />
    </div>
  );
};

export default TitleBar;
