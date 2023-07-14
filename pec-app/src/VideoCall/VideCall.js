import React, { useEffect, useRef, useState } from "react";

import Peer from "simple-peer";

const VideoCall = ({ socket }) => {
  const [userId, setUserId] = useState(null);
  const [peers, setPeers] = useState([]);
  const videoRef = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to signaling server");
    });

    socket.on("userId", (userId) => {
      console.log("Received user ID:", userId);
      setUserId(userId);
    });

    socket.on("signal", ({ senderId, signalingData }) => {
      console.log("Received signaling data from:", senderId);
      handleSignalData(senderId, signalingData);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      // Request media access (video and audio)
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;

          // Initialize the peer connections
          const peers = [];
          const initiatorPeer = createPeer(null, true, stream);
          peers.push(initiatorPeer);

          setPeers(peers);
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  }, [userId]);

  const createPeer = (recipientId, initiator, stream) => {
    const peer = new Peer({
      initiator,
      trickle: false,
      stream,
    });

    peer.on("signal", (signalingData) => {
      socket.emit("signal", { senderId: userId, recipientId, signalingData });
    });

    peer.on("stream", (stream) => {
      console.log("Received stream from peer:", recipientId);
      // Handle the incoming stream
    });

    return peer;
  };

  const handleSignalData = (senderId, signalingData) => {
    const peer = createPeer(senderId, false, null);
    peer.signal(signalingData);

    const updatedPeers = [...peers, peer];
    setPeers(updatedPeers);
  };

  return (
    <div>
      <h1>Video Chat Application</h1>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default VideoCall;
