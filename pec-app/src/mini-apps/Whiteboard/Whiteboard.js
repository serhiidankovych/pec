import React, { useRef, useEffect } from "react";
import "./Whiteboard.css";
import ExtraButton from "../../shared/ExtraButton/ExtraButton";

const Whiteboard = ({ socket, roomId }) => {
  useEffect(() => {
    console.log("whiteboard id:" + roomId);
    if (roomId) {
      socket.emit("joinWhiteBoard", roomId);
      console.log(roomId);
    }
  }, [roomId]);

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
      roomId
    );
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    socket.emit(
      "draw",
      { x: offsetX, y: offsetY, type: "move", color },
      roomId
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

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
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
        <a
          id="download_image_link"
          href="download_link"
          onClick={saveImageToLocal}
        >
          Download
        </a>
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
