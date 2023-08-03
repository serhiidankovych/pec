import { useSound } from "use-sound";
import soundEffectGalaxyBrain from "./sounds/GalaxyBrain.mp3";
import soundEffectNoGod from "./sounds/NoGod.mp3";
import soundEffectBruuh from "./sounds/Bruuh.mp3";

import soundEffectBenYes from "./sounds/BenYes.mp3";
import soundEffectDone from "./sounds/Done.mp3";
import soundEffectUwu from "./sounds/Uwu.mp3";
import soundEffectWrong from "./sounds/Wrong.mp3";

const Sounds = () => {
  const [playSoundEffectGalaxyBrain] = useSound(soundEffectGalaxyBrain);
  const [playSoundEffectNoGod] = useSound(soundEffectNoGod);
  const [playSoundEffectBruuh] = useSound(soundEffectBruuh);

  const [playSoundEffectBenYes] = useSound(soundEffectBenYes);
  const [playSoundEffectDone] = useSound(soundEffectDone);
  const [playSoundEffectUwu] = useSound(soundEffectUwu);
  const [playSoundEffectWrong] = useSound(soundEffectWrong);

  return {
    playSoundEffectGalaxyBrain,
    playSoundEffectNoGod,
    playSoundEffectBruuh,
    playSoundEffectBenYes,
    playSoundEffectDone,
    playSoundEffectUwu,
    playSoundEffectWrong,
  };
};

export default Sounds;
