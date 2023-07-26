import React, { useState } from "react";
import styles from "./SidePanel.module.css";

import ParticipantsList from "../participants/ParticipantsList";
import Chatbox from "../chat/Chatbox";

const SidePanel = () => {
  const [activeTab, setActiveTab] = useState("participants");

  return (
    <div className={styles.sidePanelContainer}>
      <div className={styles.tabsBar}>
        <div onClick={() => setActiveTab("participants")}>
          <p>Participants</p>
        </div>
        <div onClick={() => setActiveTab("chat")}>
          <p>Chat</p>
        </div>
      </div>
      {activeTab === "participants" ? <ParticipantsList /> : <Chatbox />}
    </div>
  );
};

export default SidePanel;
