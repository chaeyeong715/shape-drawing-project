import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";

const DrawingCanvas = forwardRef(
  ({ width = 300, height = 300, strokeColor = "#000", strokeWidth = 4 }, ref) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const isDrawing = useRef(false);

    // 초기화
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = strokeColor;

      ctxRef.current = ctx;
    }, []);

    // 🟢 부모가 사용할 기능 정의
    useImperativeHandle(ref, () => ({
      clear() {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
      exportImage() {
        const canvas = canvasRef.current;
        return canvas.toDataURL("image/png");
      }
    }));

    // 드로잉 관련 함수들
    const startDrawing = (e) => {
      isDrawing.current = true;
      const pos = getPos(e);
      const ctx = ctxRef.current;

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const pos = getPos(e);
      const ctx = ctxRef.current;

      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      ctxRef.current.closePath();
    };

    const getPos = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();

      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      };
    };

    return (
        <div>
            <h4>똑같이 그리기</h4>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{
          border: "2px solid #444",
          borderRadius: 8,
          background: "white",
          touchAction: "none"
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      </div>
    );
  }
);

export default DrawingCanvas;