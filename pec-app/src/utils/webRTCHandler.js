import * as wss from "./wss";
import Peer from "simple-peer";

let localStream;

export const getLocalStream = async (onlyAudio) => {
  try {
    // Stop the existing tracks in localStream

    removeVideoContainer();

    const constraints = {
      audio: true,
      video: onlyAudio
        ? false
        : {
            width: 176,
            height: 144,
          },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    console.log("WEBRTC: Successfully received local stream");

    localStream = stream;

    if (onlyAudio) {
      disableVideoTracks(localStream);
    }
    showLocalVideoPreview(localStream);
  } catch (err) {
    handleLocalStreamError(err);
  }
};
export const roomHandler = (
  isRoomHost,
  identity,
  roomId,
  userId,
  onlyAudio
) => {
  showLocalVideoPreview(localStream);
  if (isRoomHost) {
    wss.createNewRoom(identity, onlyAudio);
  } else {
    wss.joinRoom(identity, roomId, userId, onlyAudio);
  }
};

const disableVideoTracks = (stream) => {
  stream.getVideoTracks().forEach((track) => {
    track.enabled = false;
  });
};

const handleLocalStreamError = (error) => {
  console.log(
    "An error occurred when trying to get access to the local stream:",
    error
  );
};

// Peers' connection logic

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("WEBRTC: New stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

export const removeVideoContainer = () => {
  try {
    const videoContainer = document.querySelectorAll(`.video_track_container`);
    const videoElement = document.getElementById(`my-video`);
    const tracks = videoElement?.srcObject?.getTracks() || [];

    tracks.forEach((t) => t.stop());
    videoContainer.forEach((t) => t.remove());

    console.log("WEBRTC: tracks stopped and video element removed.");
  } catch (error) {
    console.error("WEBRTC: error while removing video container:", error);
  }
};

//  Video preview logic

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_container");
  videosContainer.classList.add("videos_container_styles");

  const videoContainer = createVideoContainer();
  const videoElement = createVideoElement(stream);

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

const createVideoContainer = (connUserSocketId) => {
  const videoContainer = document.createElement("div");
  if (connUserSocketId) videoContainer.id = connUserSocketId;
  videoContainer.classList.add("video_track_container");
  return videoContainer;
};
const createVideoElement = (stream, connUserSocketId) => {
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;

  // If connUserSocketId is provided, set the id
  if (connUserSocketId) {
    videoElement.id = `${connUserSocketId}-video`;
    videoElement.className = "video";
  } else {
    // If no connUserSocketId, it's the local video
    videoElement.muted = true;
    videoElement.className = "video";
    videoElement.id = `my-video`;
  }

  // Set the source object and handle metadata load event
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  return videoElement;
};

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_container");

  const videoContainer = createVideoContainer(connUserSocketId);

  const videoElement = createVideoElement(stream, connUserSocketId);

  videoContainer.appendChild(videoElement);

  videosContainer.appendChild(videoContainer);
};

//  Room buttons' logics

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  if (localStream) {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !isDisabled;
    });
  }
};
const screenShareStream = null;
export const toggleScreenShare = (isScreenShareActive) => {
  if (isScreenShareActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenShareStream);
  }
};

export const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

export const leaveRoom = (roomId) => {
  console.log("WEBRTC: Leave Room");

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }

  if (screenShareStream) {
    screenShareStream.getTracks().forEach((track) => track.stop());
  }

  closeAllConnections();

  wss.leaveRoom({ roomId });

  // store.dispatch(setRoomDetails(null));
  // store.dispatch(setOpenRoom(false, false));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      console.log(
        "WEBRTC: Closed connection with socket id " + connUserSocketId
      );
      console.log(peers);
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { socketId } = data;

  if (peers[socketId]) {
    peers[socketId].destroy();
    delete peers[socketId];
  }

  console.log("WEBRTC: Participant left room with socket id " + socketId);
};
