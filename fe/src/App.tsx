import React, { useEffect, useRef, useState } from "react";
import { Pencil, Eraser } from "lucide-react";
import axios from "axios";

interface Point {
  x: number;
  y: number;
}

type Tool = "draw" | "erase";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool>("draw");

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const gridSize = 20;
    ctx.strokeStyle = "#2d3748";
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);

      // Reset drawing style
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
    };

    // Initial setup
    updateCanvasSize();

    // Handle window resize
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setLastPoint(getCanvasPoint(e));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const currentPoint = getCanvasPoint(e);

    if (currentTool === "erase") {
      // Clear a circular area
      ctx.save();
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 20, 0, Math.PI * 2);
      ctx.clip();
      ctx.clearRect(currentPoint.x - 20, currentPoint.y - 20, 40, 40);
      ctx.restore();

      // Redraw grid in the erased area
      ctx.save();
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 20, 0, Math.PI * 2);
      ctx.clip();
      drawGrid(ctx, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    }

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
    screenshotCanvasAndPost();
  };

  const screenshotCanvasAndPost = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const formData = new FormData();
      if (!blob) {
        console.error("Failed to convert canvas to Blob");
        return;
      }
      formData.append("image", blob, "canvas.png");

      axios
        .post("http://localhost:8080/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Upload success:", response.data);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
    }, "image/png");
  };

  return (
    <div className="fixed inset-0 bg-gray-900">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gray-950 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        // onMouseOut={stopDrawing}
      />

      {/* Toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setCurrentTool("draw")}
          className={`p-2 rounded ${
            currentTool === "draw"
              ? "bg-gray-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          title="Draw"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => setCurrentTool("erase")}
          className={`p-2 rounded ${
            currentTool === "erase"
              ? "bg-gray-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          title="Erase"
        >
          <Eraser size={20} />
        </button>
      </div>

      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-400">
        {currentTool === "draw"
          ? "Click and drag to draw"
          : "Click and drag to erase"}
      </p>
    </div>
  );
}

export default App;
