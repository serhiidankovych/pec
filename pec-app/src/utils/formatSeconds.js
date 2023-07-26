export const formatSeconds = (seconds) => {
  if (seconds >= 3600) {
    //TODO: complete this logic
    return "00:00:00";
  } else {
    let minutes =
      Math.floor(seconds / 60) < 10
        ? `0${Math.floor(seconds / 60)}`
        : Math.floor(seconds / 60);
    let second =
      Math.floor(seconds % 60) < 10
        ? `0${Math.floor(seconds % 60)}`
        : Math.floor(seconds % 60);
    return `${minutes}:${second}`;
  }
};
