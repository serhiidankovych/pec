import React, { useEffect, useState } from "react";
import "./SoundsPanel.css";
import Sounds from "./Sounds";
import SoundButton from "../../shared/SoundButton/SoundButton";
import NoGodImage from "./sound-cover/sounds-cover-NoGod.jpg";
import { PiXBold } from "react-icons/pi";

const soundData = [
  {
    soundTitle: "No God",
    func: "playSoundEffectNoGod",
    soundImage: NoGodImage,
  },
  {
    soundTitle: "Galaxy Brain",
    func: "playSoundEffectGalaxyBrain",
    soundEmoji: "🧠",
  },
  { soundTitle: "Bruuh", func: "playSoundEffectBruuh", soundEmoji: "👊" },
  { soundTitle: "Done", func: "playSoundEffectDone", soundEmoji: "✅" },
  { soundTitle: "Wrong", func: "playSoundEffectWrong", soundEmoji: "❌" },
  { soundTitle: "Uwu", func: "playSoundEffectUwu", soundEmoji: "😛" },
  { soundTitle: "Yes", func: "playSoundEffectBenYes", soundEmoji: "🐶" },
  // Add more sound data as needed
];

function SoundsPanel({ setIsSoundsPanel, socket, roomId, isSoundsPanel }) {
  const {
    playSoundEffectGalaxyBrain,
    playSoundEffectNoGod,
    playSoundEffectBruuh,
    playSoundEffectBenYes,
    playSoundEffectDone,
    playSoundEffectUwu,
    playSoundEffectWrong,
  } = Sounds();

  const [receivedSound, setReceivedSound] = useState(null);

  useEffect(() => {
    // Add the event listener for "receive-sound" once on mount
    socket.on("receive-sound", handleReceiveSound);

    return () => {
      socket.off("receive-sound", handleReceiveSound);
    };
  }, [socket]);

  useEffect(() => {
    if (receivedSound) {
      playReceivedSound(receivedSound);
      setReceivedSound(null);
    }
  }, [receivedSound]);

  const handleSoundPanel = (func) => {
    const data = { roomId, soundFunc: func };
    playReceivedSound(data.soundFunc);
    socket.emit("send-sound", data);
    console.log("handleSoundPanel");
  };

  const handleReceiveSound = (data) => {
    setReceivedSound(data.soundFunc);
    console.log("Sound received!");
  };

  const playReceivedSound = (soundFunc) => {
    switch (soundFunc) {
      case "playSoundEffectNoGod":
        playSoundEffectNoGod();
        break;
      case "playSoundEffectGalaxyBrain":
        playSoundEffectGalaxyBrain();
        break;
      case "playSoundEffectBruuh":
        playSoundEffectBruuh();
        break;
      case "playSoundEffectDone":
        playSoundEffectDone();
        break;
      case "playSoundEffectWrong":
        playSoundEffectWrong();
        break;
      case "playSoundEffectUwu":
        playSoundEffectUwu();
        break;
      case "playSoundEffectBenYes":
        playSoundEffectBenYes();
        break;
      // Add cases for other sound functions as needed
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="sounds-panel"
        style={{ visibility: isSoundsPanel ? "visible" : "hidden" }}
      >
        <div className="sounds-title">
          <div>Sounds reactions:</div>
          <div onClick={() => setIsSoundsPanel(false)}>
            <PiXBold />
          </div>
        </div>

        <div className="sounds-panel-container">
          {soundData.map(({ soundTitle, func, soundImage, soundEmoji }) => (
            <SoundButton
              key={soundTitle}
              soundTitle={soundTitle}
              func={() => handleSoundPanel(func)}
              soundImage={soundImage}
              soundEmoji={soundEmoji}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SoundsPanel;
