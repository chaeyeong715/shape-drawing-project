import React, { useState, useRef, useEffect} from "react";
import ExampleShape from "../components/ExampleShape";
import DrawingCanvas from "../components/DrawingCanvas";
import ControlButtons from "../components/ControlButtons";
import FeedbackBox from "../components/FeedbackBox";
import drawCorrectShape from "../utils/drawCorrectShape";
import { compareImages } from "../utils/compareImages";

const shapes = ["triangle", "square", "circle"];

export default function ShapeDrawingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canvasPaths, setCanvasPaths] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("CanvasRef:", canvasRef.current);
}, []);

  const currentShape = shapes[currentIndex];

  const handleNext = () => {
    setFeedback(null);

    if (canvasRef.current?.clear) canvasRef.current.clear();
    setCanvasPaths(null);
    setCurrentIndex((p) => (p + 1) % shapes.length);
  };

  const handleClear = () => {
    if (canvasRef.current?.clear) canvasRef.current.clear();
    setCanvasPaths(null);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (!canvasRef.current) {
        setFeedback("캔버스 기능을 사용할 수 없습니다.");
        return;
  }

    const userImageUrl = canvasRef.current.exportImage();
    const userCanvas = document.createElement("canvas");
    userCanvas.width = 300;
    userCanvas.height = 300;

    const userCtx = userCanvas.getContext("2d");
    const img = new Image();
    img.src = userImageUrl;

    img.onload = () => {
        userCtx.drawImage(img, 0, 0, 300, 300);

        const correctCanvas = drawCorrectShape(currentShape);
        const accuracy = compareImages(correctCanvas, userCanvas);
        setFeedback(`정확도: ${accuracy}%`);
  };
};



  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>아래의 그림을 보고 똑같이 그려주세요.</h2>

      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        <ExampleShape shapeType={currentShape} />
        <DrawingCanvas ref={canvasRef} setCanvasPaths={setCanvasPaths} />
      </div>

      <ControlButtons onClear={handleClear} onNext={handleNext} onSubmit={handleSubmit} />

      {feedback && <FeedbackBox message={feedback} />}
    </div>
  );
}
