import React, { useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./Whiteboard.css";
import RoomId from "../../shared/RoomId/RoomId";
import UserContext from "../../context/UserContext";

const Whiteboard = ({ socket }) => {
  const roomCode = React.useContext(UserContext);

  useEffect(() => {
    console.log(roomCode);
    if (roomCode) {
      socket.emit("joinRoom", roomCode);
      console.log(roomCode);
    }
  }, [roomCode]);

  const canvasRef = useRef(null);
  const [color, setColor] = React.useState("#000000");
  const [drawing, setDrawing] = React.useState(false);
  const [prevX, setPrevX] = React.useState(0);
  const [prevY, setPrevY] = React.useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 2;
    context.strokeStyle = color;

    // Event listener for drawing events
    socket.on("draw", (data) => {
      const { x, y, type, color } = data;

      if (type === "down") {
        context.beginPath();
        context.moveTo(x, y);
        context.strokeStyle = color;
      } else if (type === "move") {
        context.lineTo(x, y);
        context.stroke();
      }
    });
  }, [color]);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    setPrevX(offsetX);
    setPrevY(offsetY);
    socket.emit(
      "draw",
      { x: offsetX, y: offsetY, type: "down", color },
      roomCode
    );
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    socket.emit(
      "draw",
      { x: offsetX, y: offsetY, type: "move", color },
      roomCode
    );

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(offsetX, offsetY);
    context.stroke();

    setPrevX(offsetX);
    setPrevY(offsetY);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="whiteboard">
      <div className="whiteboard-panel">
        <input
          className="color-picker"
          type="color"
          value={color}
          onChange={handleColorChange}
        />
        <RoomId roomCode={roomCode} />
      </div>

      <canvas
        className="whiteboard-canvas"
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default Whiteboard;
