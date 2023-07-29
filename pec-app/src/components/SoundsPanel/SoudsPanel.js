import React from "react";
import useSound from "use-sound";
import boopSfx from "./sounds/disappointment.mp3";
function SoudsPanel() {
  const [play] = useSound(boopSfx);
  const shareSound = () => {
    play();
  };
  return <button onClick={shareSound}>disappointment</button>;
}

export default SoudsPanel;
