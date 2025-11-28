export default function drawCorrectShape(shape) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 6;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (shape === "triangle") {
    // 왼쪽 아래 직각삼각형 (예시와 동일한 모양)
    ctx.beginPath();
    ctx.moveTo(0, 300);   // 왼쪽 아래
    ctx.lineTo(0, 0);    // 왼쪽 위
    ctx.lineTo(300, 300);  // 오른쪽 아래
    ctx.closePath();
    ctx.stroke();
  }

  if (shape === "square") {
    ctx.strokeRect(0, 0, 300, 300);
  }

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(150, 150, 140, 0, Math.PI * 2);
    ctx.stroke();
  }

  return canvas;
}
