import React, { useEffect } from "react";

import "./SoundsPanel.css";

import Sounds from "./Sounds";
import SoundButtom from "../../shared/SoundButton/SoundButtom";

import NoGodImage from "./sound-cover/sounds-cover-NoGod.jpg";

import { PiXBold } from "react-icons/pi";

function SoundsPanel({ setIsSoundsPanel, socket, roomId }) {
  const {
    playSoundEffectGalaxyBrain,
    playSoundEffectNoGod,
    playSoundEffectBruuh,
    playSoundEffectBenYes,
    playSoundEffectDone,
    playSoundEffectUwu,
    playSoundEffectWrong,
  } = Sounds();

  // React.useEffect(() => {
  //   console.log("SoundsPanel id:" + roomId);
  // }, [roomId]);

  // const handleSoundPanel = () => {
  //   const data = { roomId };
  //   playSoundEffectBruuh();
  //   socket.emit("send-sound", data);
  //   console.log("handleSoundPanel");
  // };

  // socket.on("receive-sound", ({ roomId }) => {
  //   playSoundEffectBruuh();
  //   console.log("Received-sound from:" + roomId);
  // });

  // useEffect(() => {
  //   console.log("SoundsPanel id:" + roomId);

  //   // Clean up the event listener on unmount
  //   return () => {
  //     socket.off("receive-sound");
  //   };
  // }, [roomId, socket]);

  const handleSoundPanel = () => {
    const data = { roomId };
    playSoundEffectBruuh();
    socket.emit("send-sound", data);
    console.log("handleSoundPanel");
  };

  const handleReceiveSound = ({ roomId }) => {
    setTimeout(() => {
      playSoundEffectBruuh();
      console.log("Received-sound from:" + roomId);
    }, 5000);
  };

  useEffect(() => {
    // Add the event listener for "receive-sound" once on mount
    socket.on("receive-sound", handleReceiveSound);
  }, [socket]);

  return (
    <>
      <div className="sounds-panel">
        <div className="sounds-title">
          <div>Sounds reactions:</div>
          <div onClick={() => setIsSoundsPanel(false)}>
            <PiXBold />
          </div>
        </div>

        <div className="sounds-panel-container">
          <SoundButtom
            soundTitle={"No God"}
            func={playSoundEffectNoGod}
            soundImage={NoGodImage}
          />
          <SoundButtom
            soundTitle={"Galaxy Brain"}
            func={playSoundEffectGalaxyBrain}
            soundEmoji={"🧠"}
          />
          <SoundButtom
            soundTitle={"Bruuh"}
            func={handleSoundPanel}
            soundEmoji={"👊"}
          />

          <SoundButtom
            soundTitle={"Done"}
            func={playSoundEffectDone}
            soundEmoji={"✅"}
          />
          <SoundButtom
            soundTitle={"Wrong"}
            func={playSoundEffectWrong}
            soundEmoji={"❌"}
          />
          <SoundButtom
            soundTitle={"Uwu"}
            func={playSoundEffectUwu}
            soundEmoji={"😛"}
          />
          <SoundButtom soundTitle={"Yes"} func={playSoundEffectBenYes} />
          <SoundButtom
            soundTitle={"Galaxy Brain"}
            func={playSoundEffectGalaxyBrain}
          />
          <SoundButtom soundTitle={"No God"} func={playSoundEffectNoGod} />
          <SoundButtom
            soundTitle={"Galaxy Brain"}
            func={playSoundEffectGalaxyBrain}
          />
        </div>
      </div>
    </>
  );
}

export default SoundsPanel;
